// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function LLMSettings() 
{
  const [selectedLLM, setSelectedLLM] = useState('')

  return (
    <div className="space-y-2">
      <Select onValueChange={setSelectedLLM}>
        <SelectTrigger>
          <SelectValue placeholder="Select LLM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai">OpenAI</SelectItem>
          <SelectItem value="gemini">Gemini</SelectItem>
          <SelectItem value="anthropic">Anthropic</SelectItem>
        </SelectContent>
      </Select>
      <Select disabled={!selectedLLM}>
        <SelectTrigger>
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          {selectedLLM === 'openai' && (
            <>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
            </>
          )}
          {selectedLLM === 'gemini' && (
            <>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              <SelectItem value="gemini-ultra">Gemini Ultra</SelectItem>
            </>
          )}
          {selectedLLM === 'anthropic' && (
            <>
              <SelectItem value="claude-2">Claude 2</SelectItem>
              <SelectItem value="claude-instant">Claude Instant</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
