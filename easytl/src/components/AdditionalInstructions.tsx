import { Textarea } from '@/components/ui/textarea'

export default function AdditionalInstructions() {
  return (
    <div>
      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions (Optional)</label>
      <Textarea id="instructions" placeholder="Enter any additional translation requirements" />
    </div>
  )
}

