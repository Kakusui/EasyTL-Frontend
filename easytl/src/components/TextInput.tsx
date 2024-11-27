import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  const handlePaste = async () => {
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

