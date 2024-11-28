// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Input } from '@/components/ui/input'

export default function ToneSettings() 
{
  return (
    <div>
      <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tone Settings</label>
      <Input id="tone" placeholder="Formal; Polite" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
    </div>
  )
}

