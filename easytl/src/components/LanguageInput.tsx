// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getURL } from '@/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

interface LanguageInputProps 
{
  detectedLanguage: string;
  setDetectedLanguage: (language: string) => void;
  selectedLLM: string;
  selectedModel: string;
  useCredits: boolean;
  apiKey: string;
  inputText: string;
}

export default function LanguageInput({ 
  detectedLanguage, 
  setDetectedLanguage,
  selectedLLM,
  selectedModel,
  useCredits,
  apiKey,
  inputText
}: LanguageInputProps) 
{
  const [isDetecting, setIsDetecting] = useState(false)
  const [customLanguage, setCustomLanguage] = useState('')
  const toast = useToast()
  const { isLoggedIn } = useAuth()
  const access_token = localStorage.getItem('access_token')

  const handleDetect = async () => 
  {
    // Get text from parent component's input
    if(!inputText.trim()) 
    {
      toast.toast({
        title: "No Text",
        description: "Please enter some text in the translation box first",
        variant: "destructive"
      })
      return
    }

    if(!selectedLLM || !selectedModel) 
    {
      toast.toast({
        title: "Missing Settings",
        description: "Please select an AI provider and model first",
        variant: "destructive"
      })
      return
    }

    if(useCredits && !isLoggedIn) 
    {
      toast.toast({
        title: "Login Required",
        description: "Please login to use credits or switch to API key",
        variant: "destructive"
      })
      return
    }

    setIsDetecting(true)

    try 
    {
      const response = await fetch(getURL("/proxy/easytl/detect-language"), 
      {
        method: "POST",
        headers: 
        { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}` 
        },
        body: JSON.stringify({
          text: inputText,
          llmType: selectedLLM.toLowerCase(),
          userAPIKey: useCredits ? "" : apiKey,
          model: selectedModel,
          using_credits: useCredits
        }),
      })

      if(!response.ok) 
      {
        throw new Error(`Failed to detect language: ${await response.text()}`)
      }

      const result = await response.json()
      setCustomLanguage(result.detectedLanguage)
      setDetectedLanguage('')  // Clear the dropdown selection
    } 
    catch (error) 
    {
      toast.toast({
        title: "Detection Failed",
        description: (error as Error).message || "Failed to detect language",
        variant: "destructive"
      })
    } 
    finally 
    {
      setIsDetecting(false)
    }
  }

  const handleLanguageSelect = (value: string) => 
  {
    setDetectedLanguage(value)
    setCustomLanguage('')
  }

  useEffect(() => 
  {
    if(customLanguage) 
    {
      setDetectedLanguage('')
    }
  }, [customLanguage, setDetectedLanguage])

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Select value={detectedLanguage} onValueChange={handleLanguageSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            {/* Add more languages as needed */}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleDetect} disabled={isDetecting}>
          {isDetecting ? 'Detecting...' : 'Detect'}
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Or type a language"
        value={customLanguage}
        onChange={(e) => setCustomLanguage(e.target.value)}
        className="w-full"
      />
    </div>
  )
}
