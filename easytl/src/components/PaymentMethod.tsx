// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface PaymentMethodProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  useCredits: boolean;
  setUseCredits: (useCredits: boolean) => void;
}

export default function PaymentMethod({ 
  apiKey, 
  setApiKey, 
  useCredits, 
  setUseCredits 
}: PaymentMethodProps) 
{
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
            checked={useCredits}
            onChange={() => setUseCredits(true)}
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
            checked={!useCredits}
            onChange={() => setUseCredits(false)}
            className="w-4 h-4"
          />
          <Label htmlFor="api-key">API Key</Label>
        </div>
      </div>
      {!useCredits && (
        <div className="flex space-x-2 mt-2">
          <Input
            type={showApiKey ? 'text' : 'password'}
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
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
