// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TextInputProps 
{
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) 
{
  const handlePaste = async () => 
  {
    const text = await navigator.clipboard.readText()
    onChange(text)
  }

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Enter text to translate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <Button variant="outline" onClick={handlePaste}>Paste</Button>
    </div>
  )
}

