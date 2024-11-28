// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Textarea } from '@/components/ui/textarea'

export default function AdditionalInstructions() 
{
  return (
    <div>
      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions (Optional)</label>
      <Textarea id="instructions" placeholder="Enter any additional translation requirements" />
    </div>
  )
}
