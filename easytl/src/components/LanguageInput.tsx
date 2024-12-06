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

  // Use custom language if dropdown is not selected
  useEffect(() => 
  {
    if(!detectedLanguage && customLanguage) 
    {
      setDetectedLanguage(customLanguage)
    }
  }, [customLanguage, detectedLanguage, setDetectedLanguage])

  const handleLanguageSelect = (value: string) => 
  {
    if(value) 
    {
      setDetectedLanguage(value)
      setCustomLanguage('')
    }
  }

  const handleCustomLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    const value = e.target.value
    setCustomLanguage(value)
    if(value) 
    {
      setDetectedLanguage(value)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Select value={detectedLanguage} onValueChange={handleLanguageSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Mandarin Chinese">Mandarin Chinese</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="Standard Arabic">Standard Arabic</SelectItem>
            <SelectItem value="Bengali">Bengali</SelectItem>
            <SelectItem value="Portuguese">Portuguese</SelectItem>
            <SelectItem value="Russian">Russian</SelectItem>
            <SelectItem value="Urdu">Urdu</SelectItem>
            <SelectItem value="Indonesian">Indonesian</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Japanese">Japanese</SelectItem>
            <SelectItem value="Nigerian Pidgin">Nigerian Pidgin</SelectItem>
            <SelectItem value="Marathi">Marathi</SelectItem>
            <SelectItem value="Telugu">Telugu</SelectItem>
            <SelectItem value="Turkish">Turkish</SelectItem>
            <SelectItem value="Tamil">Tamil</SelectItem>
            <SelectItem value="Cantonese">Cantonese</SelectItem>
            <SelectItem value="Vietnamese">Vietnamese</SelectItem>
            <SelectItem value="Wu Chinese">Wu Chinese</SelectItem>
            <SelectItem value="Tagalog">Tagalog</SelectItem>
            <SelectItem value="Korean">Korean</SelectItem>
            <SelectItem value="Farsi">Farsi</SelectItem>
            <SelectItem value="Hausa">Hausa</SelectItem>
            <SelectItem value="Egyptian Arabic">Egyptian Arabic</SelectItem>
            <SelectItem value="Swahili">Swahili</SelectItem>
            <SelectItem value="Javanese">Javanese</SelectItem>
            <SelectItem value="Italian">Italian</SelectItem>
            <SelectItem value="Western Punjabi">Western Punjabi</SelectItem>
            <SelectItem value="Kannada">Kannada</SelectItem>
            <SelectItem value="Gujarati">Gujarati</SelectItem>
            <SelectItem value="Thai">Thai</SelectItem>
            <SelectItem value="Amharic">Amharic</SelectItem>
            <SelectItem value="Burmese">Burmese</SelectItem>
            <SelectItem value="Yoruba">Yoruba</SelectItem>
            <SelectItem value="Polish">Polish</SelectItem>
            <SelectItem value="Ukrainian">Ukrainian</SelectItem>
            <SelectItem value="Malayalam">Malayalam</SelectItem>
            <SelectItem value="Cebuano">Cebuano</SelectItem>
            <SelectItem value="Dutch">Dutch</SelectItem>
            <SelectItem value="Oromo">Oromo</SelectItem>
            <SelectItem value="Kurdish">Kurdish</SelectItem>
            <SelectItem value="Somali">Somali</SelectItem>
            <SelectItem value="Serbo-Croatian">Serbo-Croatian</SelectItem>
            <SelectItem value="Sinhalese">Sinhalese</SelectItem>
            <SelectItem value="Khmer">Khmer</SelectItem>
            <SelectItem value="Nepali">Nepali</SelectItem>
            <SelectItem value="Chittagonian">Chittagonian</SelectItem>
            <SelectItem value="Zulu">Zulu</SelectItem>
            <SelectItem value="Quechua">Quechua</SelectItem>
            <SelectItem value="Pashto">Pashto</SelectItem>
            <SelectItem value="Malagasy">Malagasy</SelectItem>
            <SelectItem value="Xhosa">Xhosa</SelectItem>
            <SelectItem value="Belarusian">Belarusian</SelectItem>
            <SelectItem value="Uzbek">Uzbek</SelectItem>
            <SelectItem value="Kazakh">Kazakh</SelectItem>
            <SelectItem value="Azerbaijani">Azerbaijani</SelectItem>
            <SelectItem value="Hungarian">Hungarian</SelectItem>
            <SelectItem value="Kinyarwanda">Kinyarwanda</SelectItem>
            <SelectItem value="Bosnian">Bosnian</SelectItem>
            <SelectItem value="Albanian">Albanian</SelectItem>
            <SelectItem value="Armenian">Armenian</SelectItem>
            <SelectItem value="Georgian">Georgian</SelectItem>
            <SelectItem value="Mongolian">Mongolian</SelectItem>
            <SelectItem value="Tigrinya">Tigrinya</SelectItem>
            <SelectItem value="Lao">Lao</SelectItem>
            <SelectItem value="Khmer">Khmer</SelectItem>
            <SelectItem value="Hebrew">Hebrew</SelectItem>
            <SelectItem value="Slovak">Slovak</SelectItem>
            <SelectItem value="Danish">Danish</SelectItem>
            <SelectItem value="Finnish">Finnish</SelectItem>
            <SelectItem value="Norwegian">Norwegian</SelectItem>
            <SelectItem value="Bulgarian">Bulgarian</SelectItem>
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
        onChange={handleCustomLanguageChange}
        className="w-full"
      />
    </div>
  )
}
