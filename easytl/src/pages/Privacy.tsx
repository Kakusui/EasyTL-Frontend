// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Privacy = () => 
{
  const navigate = useNavigate()

  useEffect(() => 
  {
    document.title = 'EasyTL | Privacy Policy'
  }, [])

  return (
    <div className="min-h-screen w-screen bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-2 left-2 md:top-4 md:left-4 h-10 w-10 md:h-12 md:w-12 z-10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
      </Button>
      <div className="max-w-3xl mx-auto prose dark:prose-invert p-4 pt-16 md:p-8">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy for EasyTL</h1>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          This Privacy Policy outlines how we handle your data when using EasyTL. Your privacy is important to us, and we are committed to protecting your personal information.
          The following applies to EasyTL on our website{' '}
          <Link to="https://easytl-frontend.pages.dev" className="text-primary hover:underline">
            easytl-frontend.pages.dev
          </Link>{' '}
          (production URL to be determined) and its API endpoints at{' '}
          <Link to="https://api.kakusui.org/v1/easytl" className="text-primary hover:underline">
            api.kakusui.org/v1/easytl
          </Link>{' '}
          and{' '}
          <Link to="https://api.kakusui.org/v1/easytl/stream" className="text-primary hover:underline">
            api.kakusui.org/v1/easytl/stream
          </Link>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Data Collection</h2>
        <p className="mb-4">
          EasyTL itself, the library, collects zero data. However, EasyTL utilizes several third-party APIs that must be considered. By using EasyTL, you agree to the data practices of these third-party services: Google's Gemini, Anthropic's Claude, and OpenAI's GPT. These services have their own privacy policies, and you are advised to review them before using EasyTL.
          These services may change their privacy policies at any time, and EasyTL is not responsible for any changes made by these services. Services may be added or removed from EasyTL at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Usage</h2>
        <p className="mb-4">
          The EasyTL endpoint and its page on our website collect no data nor logs outside of standard endpoint interactions, which contain no info aside from HTTP error codes. Data is limited to what is used for functionality only, and no data is shared ever. We do store some data locally on the user's browser, such as API keys for the services and values from old submissions, but these never leave the user's computer outside of usage requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Encryption</h2>
        <p className="mb-4">
          All data handled by EasyTL on our website and endpoint is encrypted via HTTPS to ensure its security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Consent</h2>
        <p className="mb-4">
          By using EasyTL on our website or endpoint, you agree to this privacy policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
        <p className="mb-4">
          EasyTL reserves the right to update this Privacy Policy at any time, with or without notice. Changes will be posted on our website, and you are advised to review this policy periodically for any updates.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
        <p className="mb-4">
          If you have any questions regarding this Privacy Policy or the data practices of EasyTL, please contact us at{' '}
          <Link to="mailto:contact@kakusui.org" className="text-primary hover:underline">
            contact@kakusui.org
          </Link>
          .
        </p>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Last updated: January 10, 2024</p>
          <p className="mt-4">Changelog:</p>
          <p>January 10, 2024: Initial version.</p>
        </div>

        <hr className="my-8 border-border" />
      </div>
    </div>
  )
}

export default Privacy 