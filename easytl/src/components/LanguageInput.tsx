// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface LanguageInputProps 
{
  detectedLanguage: string;
  setDetectedLanguage: (language: string) => void;
}

export default function LanguageInput({ detectedLanguage, setDetectedLanguage }: LanguageInputProps) 
{
  const [isDetecting, setIsDetecting] = useState(false)
  const [customLanguage, setCustomLanguage] = useState('')

  const handleDetect = () => 
  {
    setIsDetecting(true)
    // Simulating language detection
    setTimeout(() => 
    {
      setDetectedLanguage('')
      setCustomLanguage('Custom Language')
      setIsDetecting(false)
    }, 1000)
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
