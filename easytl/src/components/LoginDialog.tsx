import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
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
  const [email, setEmail] = useState('')
  const [loginCode, setLoginCode] = useState('')
  const [isLoginStep, setIsLoginStep] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleEmailSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address"
      })
      return
    }

    setIsLoading(true)
    try {
      const checkUserResponse = await fetch(getURL('/auth/check-email-registration'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      })

      if (checkUserResponse.ok) {
        const userData = await checkUserResponse.json()
        if (!userData.registered && !isSignUp) {
          toast({
            variant: "destructive",
            title: "Account not found",
            description: "No account found with this email. Please sign up first."
          })
          return
        }
        if (userData.registered && isSignUp) {
          toast({
            variant: "destructive",
            title: "Account exists",
            description: "An account with this email already exists. Please login instead."
          })
          return
        }

        setIsLoginStep(true)
        const response = await fetch(getURL('/auth/send-verification-email'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }),
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to send verification code')
        }
        
        toast({
          title: "Verification code sent",
          description: "Please check your email for the verification code"
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process request. Please try again."
      })
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async () => {
    if (!loginCode) {
      toast({
        variant: "destructive",
        title: "Missing code",
        description: "Please enter the verification code"
      })
      return
    }

    setIsLoading(true)
    try {
      const endpoint = isSignUp ? '/auth/signup' : '/auth/login'
      const response = await fetch(getURL(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, verification_code: loginCode }),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.access_token) {
          await login(data.access_token)
          onOpenChange(false)
          toast({
            title: isSignUp ? "Account created" : "Welcome back!",
            description: isSignUp ? "Your account has been created successfully" : "You have been logged in successfully"
          })
        }
      } else {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "The verification code is invalid or has expired"
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify code. Please try again."
      })
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-foreground">
            {isSignUp ? 'Sign Up' : 'Login'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isLoginStep
              ? 'Enter the verification code sent to your email'
              : 'Enter your email to continue'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-3">
          {isLoginStep ? (
            <div>
              <div className="text-sm text-muted-foreground mb-2">{email}</div>
              <Input
                placeholder="Verification code"
                value={loginCode}
                onChange={(e) => setLoginCode(e.target.value)}
                className="bg-background text-foreground border-input"
              />
            </div>
          ) : (
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background text-foreground border-input"
            />
          )}
        </div>

        <DialogFooter className="flex flex-col items-center gap-2">
          <Button
            onClick={isLoginStep ? handleVerificationSubmit : handleEmailSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoginStep ? 'Verify' : 'Continue'}
          </Button>
          
          <div className="relative w-full text-center my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative px-2 text-xs bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="flex justify-center w-full mb-2">
            <div className="dark:invert scale-90">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.error('Google login failed')}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setIsLoginStep(false)
              setEmail('')
              setLoginCode('')
            }}
            className="text-sm hover:bg-transparent hover:underline"
          >
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 