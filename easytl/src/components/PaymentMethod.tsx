'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('credits')
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</h3>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credits" id="credits" />
          <Label htmlFor="credits">Credits (requires login)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="api-key" id="api-key" />
          <Label htmlFor="api-key">API Key</Label>
        </div>
      </RadioGroup>
      {paymentMethod === 'api-key' && (
        <div className="flex space-x-2 mt-2">
          <Input
            type={showApiKey ? 'text' : 'password'}
            placeholder="Enter your API key"
            className="flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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

