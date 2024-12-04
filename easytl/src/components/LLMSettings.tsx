// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface LLMSettingsProps {
  selectedLLM: string;
  setSelectedLLM: (llm: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export default function LLMSettings({ 
  selectedLLM, 
  setSelectedLLM,
  selectedModel,
  setSelectedModel 
}: LLMSettingsProps) 
{
  const getModelOptions = (llm: string) => 
  {
    switch(llm)
    {
      case "OpenAI":
        return ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo", "gpt-4o", "gpt-4o-mini"]
      case "Gemini":
        return ["gemini-1.0-pro", "gemini-1.5-pro", "gemini-1.5-flash"];
      case "Anthropic":
        return ["claude-3-haiku-20240307", "claude-3-sonnet-20240229", "claude-3-opus-20240229", "claude-3-5-sonnet-20240620"]
      default:
        return [];
    }
  }

  return (
    <div className="space-y-2">
      <Select value={selectedLLM} onValueChange={setSelectedLLM}>
        <SelectTrigger>
          <SelectValue placeholder="Select LLM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OpenAI">OpenAI</SelectItem>
          <SelectItem value="Gemini">Gemini</SelectItem>
          <SelectItem value="Anthropic">Anthropic</SelectItem>
        </SelectContent>
      </Select>
      <Select 
        disabled={!selectedLLM}
        value={selectedModel}
        onValueChange={setSelectedModel}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          {getModelOptions(selectedLLM).map((model) => (
            <SelectItem key={model} value={model}>{model}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
