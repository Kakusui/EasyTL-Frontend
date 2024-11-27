'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('credits')
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium leading-none mb-3">Payment Method</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input 
            type="radio" 
            id="credits" 
            name="payment" 
            value="credits"
            checked={paymentMethod === 'credits'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <Label htmlFor="credits">Credits (requires login)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="radio" 
            id="api-key" 
            name="payment" 
            value="api-key"
            checked={paymentMethod === 'api-key'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <Label htmlFor="api-key">API Key</Label>
        </div>
      </div>
      {paymentMethod === 'api-key' && (
        <div className="flex space-x-2 mt-2">
          <Input
            type={showApiKey ? 'text' : 'password'}
            placeholder="Enter your API key"
            className="flex-grow"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}

