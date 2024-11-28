// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUpDownIcon, DownloadIcon, CopyIcon, XIcon, CheckIcon } from 'lucide-react'

interface TranslatedOutputProps 
{
  text: string;
  onSwap: () => void;
  onClose: () => void;
}

export default function TranslatedOutput({ text, onSwap, onClose }: TranslatedOutputProps) 
{
  const [copyIcon, setCopyIcon] = useState(<CopyIcon className="h-4 w-4" />)
  const [downloadIcon, setDownloadIcon] = useState(<DownloadIcon className="h-4 w-4" />)

  const handleCopy = () => 
  {
    navigator.clipboard.writeText(text)
    setCopyIcon(<CheckIcon className="h-4 w-4" />)
    setTimeout(() => setCopyIcon(<CopyIcon className="h-4 w-4" />), 1000)
  }

  const handleDownload = () => 
  {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'translated_text.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setDownloadIcon(<CheckIcon className="h-4 w-4" />)
    setTimeout(() => setDownloadIcon(<DownloadIcon className="h-4 w-4" />), 1000)
  }

  return (
    <div className="p-6 border-t">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold">Translated Text</h3>
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={handleCopy}>
            {copyIcon}
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            {downloadIcon}
          </Button>
          <Button variant="outline" size="icon" onClick={onSwap}>
            <ArrowUpDownIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Textarea 
        value={text} 
        readOnly 
        className="min-h-[200px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
      />
    </div>
  )
}
