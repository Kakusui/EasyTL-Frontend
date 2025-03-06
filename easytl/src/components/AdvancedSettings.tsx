// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface AdvancedSettingsProps {
  customFormat: string;
  setCustomFormat: (format: string) => void;
  additionalInstructions: string;
  setAdditionalInstructions: (instructions: string) => void;
}

export default function AdvancedSettings({
  customFormat,
  setCustomFormat,
  additionalInstructions,
  setAdditionalInstructions
}: AdvancedSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const defaultFormat = `You are a professional translator, please translate the text given to you following the below instructions. Do not use quotations or say anything else aside from the translation in your response.
Language: {{language}}
Tone: {{tone}}
{{#if additional_instructions}}
Additional instructions:
{{additional_instructions}}
{{/if}}`

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between"
      >
        Advanced Settings
        {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
      </Button>
      {isExpanded && (
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">Custom Instruction Format</label>
            <Textarea
              value={customFormat || defaultFormat}
              onChange={(e) => setCustomFormat(e.target.value)}
              placeholder="Enter custom format (use {{language}} and {{tone}} placeholders)"
              className="mt-1"
              rows={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Additional Instructions</label>
            <Textarea
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              placeholder="Enter any additional translation requirements"
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
      )}
    </div>
  )
}
