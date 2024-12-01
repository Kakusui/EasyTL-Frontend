// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/contexts/AuthContext'
import { GoogleLogin } from '@react-oauth/google'
import { getURL } from '@/utils'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) 
{
  const { login, logout, isLoggedIn, userEmail, credits } = useAuth()
  const { toast } = useToast()

  const handleGoogleLogin = async (credentialResponse:any) => 
  {
    try 
    {
      const response = await fetch(getURL('/auth/google-login'), 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: 'include'
      })

      if(response.ok) 
      {
        const data = await response.json()
        if(data.access_token) 
        {
          await login(data.access_token)
          onOpenChange(false)
          toast(
          {
            title: "Welcome!",
            description: "You have been logged in successfully"
          })
        }
      } 
      else 
      {
        toast(
        {
          variant: "destructive",
          title: "Google login failed",
          description: "Unable to login with Google. Please try again."
        })
      }
    } 
    catch (error) 
    {
      toast(
      {
        variant: "destructive",
        title: "Error",
        description: "Failed to login with Google. Please try again."
      })
      console.error('Error:', error)
    }
  }

  if(isLoggedIn) 
  {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90vw] max-w-[400px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Profile</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">{userEmail}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Credits</label>
              <p className="text-foreground">{credits}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">User ID</label>
              <p className="text-sm text-muted-foreground">{localStorage.getItem('user_id')}</p>
            </div>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => 
              {
                logout()
                onOpenChange(false)
                toast(
                {
                  title: "Logged out",
                  description: "You have been logged out successfully"
                })
              }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-[400px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Login with Google</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center w-full py-4">
          <div className="dark:invert">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error('Google login failed')}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 