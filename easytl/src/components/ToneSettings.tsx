import { Input } from '@/components/ui/input'

export default function ToneSettings() {
  return (
    <div>
      <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tone Settings</label>
      <Input id="tone" placeholder="Formal; Polite" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
    </div>
  )
}

