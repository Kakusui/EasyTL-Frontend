// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { getURL } from '@/utils';

interface AuthContextType 
{
    isLoggedIn: boolean;
    userEmail: string | null;
    isPrivilegedUser: boolean;
    credits: number;
    login: (access_token: string) => void;
    logout: () => void;
    checkLoginStatus: (forceFullCheck?: boolean) => Promise<void>;
    isLoading: boolean;
    updateCredits: (newCredits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isPrivilegedUser, setIsPrivilegedUser] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const lastFullCheckRef = useRef<number>(0);

    const checkTokenExpiration = (): boolean =>
    {
        const token = localStorage.getItem('access_token');
        if(token) 
        {
            try 
            {
                const encodedPayload = token.split('.')[1];
                if(!encodedPayload) return false;

                const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
                const paddedPayload = normalizedPayload.padEnd(
                    normalizedPayload.length + (4 - normalizedPayload.length % 4) % 4,
                    '='
                );
                const payload = JSON.parse(atob(paddedPayload));
                return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();
            } 
            catch (error) 
            {
                console.error('Error checking token expiration:', error);
                return false;
            }
        }
        return false;
    };

    const clearAuthState = (): void =>
    {
        setIsLoggedIn(false);
        setUserEmail(null);
        setIsPrivilegedUser(false);
        setCredits(0);
        lastFullCheckRef.current = 0;
    };

    const refreshAccessToken = async (): Promise<boolean> =>
    {
        try
        {
            const response = await fetch(getURL('/auth/refresh-access-token'),
            {
                method: 'POST',
                credentials: 'include',
            });

            if(!response.ok) return false;

            const data = await response.json();
            if(typeof data.access_token !== 'string' || !data.access_token) return false;

            localStorage.setItem('access_token', data.access_token);
            return true;
        }
        catch
        {
            return false;
        }
    };

    const performFullCheck = async (): Promise<void> =>
    {
        let accessToken = localStorage.getItem('access_token');
        if(!accessToken || !checkTokenExpiration())
        {
            if(!await refreshAccessToken())
            {
                clearAuthState();
                return;
            }
            accessToken = localStorage.getItem('access_token');
        }

        if(!accessToken)
        {
            clearAuthState();
            return;
        }

        try 
        {
            const getUserInfo = (token: string) => fetch(getURL('/user/info'),
            {
                headers: 
                {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });

            let response = await getUserInfo(accessToken);
            if(response.status === 401 && await refreshAccessToken())
            {
                accessToken = localStorage.getItem('access_token');
                if(accessToken) response = await getUserInfo(accessToken);
            }

            if(response.ok) 
            {
                const data = await response.json();
                setIsLoggedIn(true);
                setUserEmail(data.email);
                setCredits(data.credits);
                setIsPrivilegedUser(data.isPrivilegedUser);
                lastFullCheckRef.current = Date.now();
            } 
            else 
            {
                throw new Error('Failed to fetch user info');
            }
        } 
        catch (error) 
        {
            console.error('Error fetching user info:', error);
            clearAuthState();
        }
    };

    const checkLoginStatus = useCallback(async (forceFullCheck = false): Promise<void> => 
    {
        const currentTime = Date.now();
        const thirtyMinutes = 30 * 60 * 1000;

        setIsLoading(true);
        try 
        {
            if(forceFullCheck || currentTime - lastFullCheckRef.current > thirtyMinutes) 
            {
                await performFullCheck();
            } 
            else if(!isLoggedIn && checkTokenExpiration()) 
            {
                await performFullCheck();
            } 
            else if(isLoggedIn && !checkTokenExpiration()) 
            {
                logout();
            }
        } 
        finally 
        {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => 
    {
        checkLoginStatus(true);
    }, []);

    const login = async (access_token: string): Promise<void> =>
    {
        localStorage.setItem('access_token', access_token);
        await checkLoginStatus(true);
    };

    const logout = (): void =>
    {
        void fetch(getURL('/auth/logout'),
        {
            method: 'POST',
            credentials: 'include',
        }).catch(() => undefined);
        localStorage.removeItem('access_token');
        clearAuthState();
    };

    const updateCredits = (newCredits: number): void =>
    {
        setCredits(newCredits);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userEmail,
            isPrivilegedUser,
            credits,
            login,
            logout,
            checkLoginStatus,
            isLoading,
            updateCredits
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
{
    const context = useContext(AuthContext);
    if(context === undefined) 
    {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
