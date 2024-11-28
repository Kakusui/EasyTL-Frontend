import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/contexts/AuthContext'
import { GoogleLogin } from '@react-oauth/google'
import { getURL } from '@/utils'
import { useToast } from '@/hooks/use-toast'

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { login } = useAuth()
  const { toast } = useToast()

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const response = await fetch(getURL('/auth/google-login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.access_token) {
          await login(data.access_token)
          onOpenChange(false)
          toast({
            title: "Welcome!",
            description: "You have been logged in successfully"
          })
        }
      } else {
        toast({
          variant: "destructive",
          title: "Google login failed",
          description: "Unable to login with Google. Please try again."
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login with Google. Please try again."
      })
      console.error('Error:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-[400px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Login with Google
          </DialogTitle>
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