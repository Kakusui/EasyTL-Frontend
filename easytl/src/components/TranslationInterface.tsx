// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageInput from './LanguageInput'
import TextInput from './TextInput'
import ToneSettings from './ToneSettings'
import LLMSettings from './LLMSettings'
import PaymentMethod from './PaymentMethod'
import AdvancedSettings from './AdvancedSettings'
import SubmitButton from './SubmitButton'
import TranslatedOutput from './TranslatedOutput'
import { useAuth } from '@/contexts/AuthContext'
import { LoginDialog } from './LoginDialog'

export default function TranslationInterface()
{

  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState('')
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const { isLoggedIn } = useAuth()
  const { theme, setTheme } = useTheme()

  const handleSubmit = async () => 
  {
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setOutputText('This is a simulated translation output.')
    setIsLoading(false)
  }

  const handleSwap = () => 
  {
    setInputText(outputText)
    setOutputText(inputText)
  }

  const handleCloseOutput = () => 
  {
    setOutputText('')
  }

  return (
    <div className="max-w-5xl mx-auto bg-background shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">EasyTL</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="text-foreground hover:bg-accent"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 text-foreground hover:bg-accent"
            onClick={() => setLoginDialogOpen(true)}
          >
            <UserIcon className="h-5 w-5" />
            <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <LanguageInput 
              detectedLanguage={detectedLanguage} 
              setDetectedLanguage={setDetectedLanguage} 
            />
            <TextInput 
              value={inputText} 
              onChange={setInputText} 
            />
            <ToneSettings />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <LLMSettings />
            <PaymentMethod />
            <AdvancedSettings />
            <SubmitButton 
              onClick={handleSubmit} 
              isLoading={isLoading} 
            />
          </div>
        </div>

        {/* Output Section */}
        {outputText && (
          <div className="mt-6">
            <TranslatedOutput 
              text={outputText} 
              onSwap={handleSwap} 
              onClose={handleCloseOutput} 
            />
          </div>
        )}
      </div>

      {/* Login Dialog */}
      <LoginDialog 
        open={loginDialogOpen} 
        onOpenChange={setLoginDialogOpen}
      />
    </div>
  )
}

