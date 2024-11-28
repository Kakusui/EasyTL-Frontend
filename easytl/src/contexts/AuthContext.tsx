import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { getURL } from '@/utils';

interface AuthContextType {
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isPrivilegedUser, setIsPrivilegedUser] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const lastFullCheckRef = useRef<number>(0);

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.exp * 1000 > Date.now();
            } catch (error) {
                console.error('Error checking token expiration:', error);
                return false;
            }
        }
        return false;
    };

    const performFullCheck = async () => {
        if (!checkTokenExpiration()) {
            setIsLoggedIn(false);
            setUserEmail(null);
            setIsPrivilegedUser(false);
            setCredits(0);
            return;
        }

        const access_token = localStorage.getItem('access_token');
        try {
            const response = await fetch(getURL('/user/info'), {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUserEmail(data.email);
                setCredits(data.credits);
                setIsPrivilegedUser(data.isPrivilegedUser);
                lastFullCheckRef.current = Date.now();
            } else {
                throw new Error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            logout();
        }
    };

    const checkLoginStatus = useCallback(async (forceFullCheck = false) => {
        const currentTime = Date.now();
        const thirtyMinutes = 30 * 60 * 1000;

        setIsLoading(true);
        try {
            if (forceFullCheck || currentTime - lastFullCheckRef.current > thirtyMinutes) {
                await performFullCheck();
            } else if (!isLoggedIn && checkTokenExpiration()) {
                // If we have a valid token but aren't logged in, do a full check
                await performFullCheck();
            } else if (isLoggedIn && !checkTokenExpiration()) {
                // If we're logged in but token is expired, log out
                logout();
            }
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        checkLoginStatus(true);
    }, []);

    const login = async (access_token: string) => {
        localStorage.setItem('access_token', access_token);
        await checkLoginStatus(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        setUserEmail(null);
        setIsPrivilegedUser(false);
        setCredits(0);
        lastFullCheckRef.current = 0;
    };

    const updateCredits = (newCredits: number) => {
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 