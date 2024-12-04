// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getURL, getPublishableStripeKey } from '@/utils'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect } from 'react'
import { CheckIcon, XIcon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const stripePromise = loadStripe(getPublishableStripeKey())

interface PurchaseCreditsDialogProps 
{
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PurchaseCreditsDialog({ open, onOpenChange }: PurchaseCreditsDialogProps) 
{
  const [isProcessing, setIsProcessing] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
  const { toast } = useToast()
  const { checkLoginStatus } = useAuth()

  useEffect(() => 
  {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('verify_session_id')
    
    if(sessionId) 
    {
      verifyPayment(sessionId)
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const verifyPayment = async (sessionId: string) => 
  {
    setVerificationStatus('verifying')
    try 
    {
      const response = await fetch(getURL('/stripe/verify-payment'), 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ session_id: sessionId })
      })

      const data = await response.json()

      if(response.ok && data.success) 
      {
        setVerificationStatus('success')
        await checkLoginStatus(true)
        toast({
          title: "Success!",
          description: "Credits have been added to your account",
        })
      } 
      else 
      {
        setVerificationStatus('error')
        throw new Error('Payment verification failed')
      }
    } 
    catch(error) 
    {
      setVerificationStatus('error')
      toast({
        title: "Verification Failed",
        description: "Please contact support if you believe this is an error",
        variant: "destructive"
      })
    }
  }

  const handlePurchase = async () => 
  {
    setIsProcessing(true)
    try 
    {
      const stripe = await stripePromise
      if(!stripe) 
      {
        throw new Error('Stripe failed to load')
      }

      const response = await fetch(getURL('/stripe/create-checkout-session'), 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          is_home_page: false,
          success_url: window.location.origin + '?verify_session_id={CHECKOUT_SESSION_ID}',
          cancel_url: window.location.origin
        })
      })

      if(!response.ok) 
      {
        throw new Error('Failed to create checkout session')
      }

      const session = await response.json()
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })

      if(result.error) 
      {
        throw new Error(result.error.message)
      }
    } 
    catch(error) 
    {
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive"
      })
    } 
    finally 
    {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-[400px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {verificationStatus === 'verifying' ? 'Verifying Payment...' :
             verificationStatus === 'success' ? 'Payment Successful!' :
             verificationStatus === 'error' ? 'Verification Failed' :
             'Purchase Credits'}
          </DialogTitle>
        </DialogHeader>
        
        {verificationStatus === 'verifying' ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            <p>Verifying your payment...</p>
          </div>
        ) : verificationStatus === 'success' ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <CheckIcon className="h-8 w-8 text-green-500" />
            <p>Credits have been added to your account!</p>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : verificationStatus === 'error' ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <XIcon className="h-8 w-8 text-red-500" />
            <p>Failed to verify payment. Please contact support if you believe this is an error.</p>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <div className="py-4 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground">$5 for 50,000 credits</h3>
            </div>

            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>LLM-agnostic (use with all LLMs)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>No hassle of dealing with API keys</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Custom LLMs (planned)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Priority support</span>
              </li>
            </ul>

            <Button 
              onClick={handlePurchase}
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Purchase Credits'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 