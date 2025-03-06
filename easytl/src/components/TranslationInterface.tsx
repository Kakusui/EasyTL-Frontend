// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

'use client'

import { useState, useEffect } from 'react'
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
import { useToast } from '@/hooks/use-toast'
import { getURL } from '@/utils'
import Cookies from 'js-cookie'

interface ResponseValues {
  translatedText: string;
  credits?: number;
}

export default function TranslationInterface() {

  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState('')
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const { isLoggedIn, credits, updateCredits } = useAuth()
  const { theme, setTheme } = useTheme()
  const [showOutput, setShowOutput] = useState(false)
  const [_, setResponse] = useState<ResponseValues | null>(null)
  const toast = useToast()
  const access_token = localStorage.getItem('access_token')
  const [selectedLLM, setSelectedLLM] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [useCredits, setUseCredits] = useState(true)
  const [streamingResponse, setStreamingResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [tone, setTone] = useState('Formal; Polite')
  const [customFormat, setCustomFormat] = useState('')
  const [additionalInstructions, setAdditionalInstructions] = useState('')

  // Load saved preferences on component mount
  useEffect(() => {
    const savedLLM = localStorage.getItem('easytl_llm')
    const savedModel = localStorage.getItem('easytl_model')
    const savedLanguage = localStorage.getItem('easytl_language')
    const savedUseCredits = localStorage.getItem('easytl_use_credits')
    const savedApiKey = Cookies.get(`easytl_${savedLLM?.toLowerCase()}_apiKey`)
    const savedTone = localStorage.getItem('easytl_tone')
    const savedCustomFormat = localStorage.getItem('easytl_custom_format')
    const savedAdditionalInstructions = localStorage.getItem('easytl_additional_instructions')

    if (savedLLM) setSelectedLLM(savedLLM)
    if (savedModel) setSelectedModel(savedModel)
    if (savedLanguage) setDetectedLanguage(savedLanguage)
    if (savedUseCredits) setUseCredits(savedUseCredits === 'true')
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedTone) setTone(savedTone)
    if (savedCustomFormat) setCustomFormat(savedCustomFormat)
    if (savedAdditionalInstructions) setAdditionalInstructions(savedAdditionalInstructions)
  }, [])

  // Save preferences when they change
  useEffect(() => {
    if (selectedLLM) localStorage.setItem('easytl_llm', selectedLLM)
    if (selectedModel) localStorage.setItem('easytl_model', selectedModel)
    if (detectedLanguage) localStorage.setItem('easytl_language', detectedLanguage)
    localStorage.setItem('easytl_use_credits', useCredits.toString())
    if (apiKey) {
      Cookies.set(`easytl_${selectedLLM.toLowerCase()}_apiKey`, apiKey, {
        secure: true,
        sameSite: 'strict'
      })
    }
    localStorage.setItem('easytl_tone', tone)
    if (customFormat) localStorage.setItem('easytl_custom_format', customFormat)
    if (additionalInstructions) localStorage.setItem('easytl_additional_instructions', additionalInstructions)
  }, [selectedLLM, selectedModel, detectedLanguage, useCredits, apiKey, tone, customFormat, additionalInstructions])

  // Generate translation instructions based on format, language, tone, and additional instructions
  const generateTranslationInstructions = () => {
    // Use custom format if available, otherwise use default
    const format = customFormat || `You are a professional translator, please translate the text given to you following the below instructions. Do not use quotations or say anything else aside from the translation in your response.
Language: {{language}}
Tone: {{tone}}
{{#if additional_instructions}}
Additional instructions:
{{additional_instructions}}
{{/if}}`;

    // Replace placeholders with actual values
    let instructions = format
      .replace('{{language}}', detectedLanguage)
      .replace('{{tone}}', tone);

    // Handle conditional additional instructions
    if (additionalInstructions) {
      instructions = instructions.replace('{{#if additional_instructions}}', '')
        .replace('{{/if}}', '')
        .replace('{{additional_instructions}}', additionalInstructions);
    }
    else {
      // Remove the conditional block entirely if there are no additional instructions
      instructions = instructions.replace(/{{#if additional_instructions}}[\s\S]*?{{\/if}}/m, '');
    }

    return instructions;
  }

  const handleSubmit = async () => {
    if (!selectedLLM) {
      toast.toast({
        title: "Missing Provider",
        description: "Please select an AI provider (OpenAI, Anthropic, etc.)",
        variant: "destructive"
      })
      return
    }

    if (!selectedModel) {
      toast.toast({
        title: "Missing Model",
        description: "Please select a model for the chosen provider",
        variant: "destructive"
      })
      return
    }

    if (!inputText.trim()) {
      toast.toast({
        title: "Missing Text",
        description: "Please enter some text to translate",
        variant: "destructive"
      })
      return
    }

    if (!detectedLanguage) {
      toast.toast({
        title: "Missing Language",
        description: "Please select a target language for translation",
        variant: "destructive"
      })
      return
    }

    if (useCredits && !isLoggedIn) {
      toast.toast({
        title: "Login Required",
        description: "Please login to use credits or switch to API key",
        variant: "destructive"
      })
      return
    }

    if (useCredits) {
      try {
        const costResponse = await fetch(getURL("/proxy/calculate-token-cost"),
          {
            method: "POST",
            headers:
            {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify({
              text_to_translate: inputText,
              translation_instructions: generateTranslationInstructions(),
              model: selectedModel
            }),
          })

        if (!costResponse.ok) {
          throw new Error('Failed to calculate token cost')
        }

        const { cost } = await costResponse.json()
        if (cost > credits) {
          toast.toast({
            title: "Insufficient Credits",
            description: `This translation requires ${cost} credits, but you only have ${credits} credits`,
            variant: "destructive"
          })
          return
        }
      }
      catch (error) {
        toast.toast({
          title: "Error",
          description: "Failed to calculate translation cost",
          variant: "destructive"
        })
        return
      }
    }

    setIsLoading(true)
    setShowOutput(true)
    setOutputText('Translating...')
    setStreamingResponse('') // Clear previous streaming response
    setIsStreaming(true)

    try {
      const requestBody =
      {
        textToTranslate: inputText,
        translationInstructions: generateTranslationInstructions(),
        llmType: selectedLLM.toLowerCase(),
        userAPIKey: useCredits ? "" : apiKey,
        model: selectedModel,
        using_credits: useCredits
      }

      const response = await fetch(getURL("/proxy/easytl/stream"),
        {
          method: "POST",
          headers:
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
          },
          body: JSON.stringify(requestBody),
        })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status} ${errorText}`)
      }

      let fullText = ""
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("Failed to get response reader")
      }

      try {
        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6)
              if (jsonStr === '[DONE]') continue

              try {
                const data = JSON.parse(jsonStr)
                if (data.text) {
                  fullText += data.text
                  setStreamingResponse(fullText)
                }
                else if (data.credits) {
                  updateCredits(data.credits)
                }
              }
              catch (e) {
                console.error('Failed to parse JSON:', e)
              }
            }
          }
        }
      }
      finally {
        reader.releaseLock()
      }

      // Set the final response after streaming is complete
      setResponse({ translatedText: fullText })
      setOutputText(fullText)
    }
    catch (error) {
      toast.toast({
        title: "An error occurred",
        description: (error as Error).message || "Failed to translate text",
        variant: "destructive"
      })
      setOutputText('Translation failed. Please try again.')
    }
    finally {
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  const handleSwap = () => {
    setInputText(outputText)
    setOutputText(inputText)
  }

  const handleCloseOutput = () => {
    setShowOutput(false)
    setOutputText('')
  }

  return (
    <div className="max-w-5xl mx-auto bg-background shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">EasyTL</h1>
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginDialogOpen(true)}
              className="text-foreground hover:bg-accent"
            >
              {credits} Credits
            </Button>
          )}
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
              selectedLLM={selectedLLM}
              selectedModel={selectedModel}
              useCredits={useCredits}
              apiKey={apiKey}
              inputText={inputText}
            />
            <TextInput
              value={inputText}
              onChange={setInputText}
            />
            <ToneSettings
              tone={tone}
              setTone={setTone}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <LLMSettings
              selectedLLM={selectedLLM}
              setSelectedLLM={setSelectedLLM}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            <PaymentMethod
              apiKey={apiKey}
              setApiKey={setApiKey}
              useCredits={useCredits}
              setUseCredits={setUseCredits}
            />
            <AdvancedSettings
              customFormat={customFormat}
              setCustomFormat={setCustomFormat}
              additionalInstructions={additionalInstructions}
              setAdditionalInstructions={setAdditionalInstructions}
            />
            <SubmitButton
              onClick={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Output Section */}
        {showOutput && (
          <div className="mt-6">
            <TranslatedOutput
              text={isStreaming ? streamingResponse : outputText}
              onSwap={handleSwap}
              onClose={handleCloseOutput}
              isStreaming={isStreaming}
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

