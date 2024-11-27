import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export default function SubmitButton({ onClick, isLoading }: SubmitButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
    >
      {isLoading ? 'Translating...' : 'Translate'}
    </Button>
  )
}

