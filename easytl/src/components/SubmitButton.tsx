// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Button } from '@/components/ui/button'

interface SubmitButtonProps 
{
  onClick: () => void;
  isLoading: boolean;
}

export default function SubmitButton({ onClick, isLoading }: SubmitButtonProps) 
{
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

