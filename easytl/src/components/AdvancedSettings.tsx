import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export default function AdvancedSettings() {
  const [isExpanded, setIsExpanded] = useState(false)

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
            <label htmlFor="custom-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Instruction Format</label>
            <Textarea
              id="custom-format"
              placeholder="Enter custom format (use {{language}} and {{tone}} placeholders)"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="additional-instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Instructions</label>
            <Textarea
              id="additional-instructions"
              placeholder="Enter any additional translation requirements"
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  )
}

