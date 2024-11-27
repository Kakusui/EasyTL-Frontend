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

export default function TranslationInterface() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState('')

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setOutputText('This is a simulated translation output.')
    setIsLoading(false)
  }

  const handleSwap = () => {
    setInputText(outputText)
    setOutputText(inputText)
  }

  const handleCloseOutput = () => {
    setOutputText('')
  }

  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-full">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">EasyTL</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5" />
            <span>Login</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="space-y-4">
          <LanguageInput detectedLanguage={detectedLanguage} setDetectedLanguage={setDetectedLanguage} />
          <TextInput value={inputText} onChange={setInputText} />
          <ToneSettings />
        </div>
        <div className="space-y-4">
          <LLMSettings />
          <PaymentMethod />
          <AdvancedSettings />
          <SubmitButton onClick={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
      {outputText && (
        <TranslatedOutput text={outputText} onSwap={handleSwap} onClose={handleCloseOutput} />
      )}
    </div>
  )
}

