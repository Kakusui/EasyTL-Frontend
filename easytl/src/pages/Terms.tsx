// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Terms = () => 
{
  const navigate = useNavigate()

  useEffect(() => 
  {
    document.title = 'EasyTL | Terms of Service'
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
        <h1 className="text-4xl font-bold mb-6">EasyTL Terms of Service</h1>

        <p className="mb-4">
          Welcome to EasyTL. By using our services, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using EasyTL's services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
        <p className="mb-4">
          EasyTL is an AI-powered language translation tool that leverages various language models to provide translation services. The service can be used with either Kakusui credits or your own API keys for supported AI providers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
        <p className="mb-4">
          3.1. To access certain features of our services, you must sign in using Google Authentication. We do not offer separate registration - all account management is handled through Google's secure authentication system.
        </p>
        <p className="mb-4">
          3.2. When you sign in with Google, you agree to allow us to access basic profile information such as your name and email address. We do not receive or store your Google password. We only store session information necessary to maintain your login state.
        </p>
        <p className="mb-4">
          3.3. You are responsible for maintaining the security of your Google account as it provides access to EasyTL. Any activities that occur under your account are your responsibility.
        </p>
        <p className="mb-4">
          3.4. We reserve the right to suspend or terminate your access to our services for any reason, including if you breach these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Credits and API Keys</h2>
        <p className="mb-4">
          4.1. Our services can be used either through our credit system or by providing your own API keys.
        </p>
        <p className="mb-4">
          4.2. When using our credit system, credit purchases are final and non-refundable. Credits have no cash value and cannot be exchanged for cash.
        </p>
        <p className="mb-4">
          4.3. We use Stripe for payment processing. By making a purchase, you agree to Stripe's terms of service.
        </p>
        <p className="mb-4">
          4.4. We reserve the right to change the pricing of credits at any time without prior notice.
        </p>
        <p className="mb-4">
          4.5. You may choose to use your own API keys for Gemini, Anthropic, or OpenAI services. When using your own API keys, you are responsible for any charges incurred through these services and must comply with their respective terms of service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Use of Service</h2>
        <p className="mb-4">
          5.1. You agree to use our services only for lawful purposes and in accordance with these Terms of Service.
        </p>
        <p className="mb-4">
          5.2. You are responsible for all content you submit to our services. You agree not to use our services to transmit any unlawful, infringing, threatening, harassing, defamatory, vulgar, obscene, or otherwise objectionable material.
        </p>
        <p className="mb-4">
          5.3. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
        </p>
        <p className="mb-4">
          5.4. You are entitled to use the results of our services (including translations and other outputs) as you see fit, subject to any applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
        <p className="mb-4">
          6.1. The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to our services are protected under applicable copyrights, trademarks, and other proprietary rights.
        </p>
        <p className="mb-4">
          6.2. The copying, redistribution, use, or publication by you of any such matters or any part of our services, except as allowed by Section 7, is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limited License</h2>
        <p className="mb-4">
          7.1. We grant you a limited, revocable, and nonexclusive license to access and make personal use of our services.
        </p>
        <p className="mb-4">
          7.2. This license does not include any resale or commercial use of our services or their contents; any collection and use of any product listings, descriptions, or prices; any derivative use of our services or their contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer of Warranties and Limitation of Liability</h2>
        <p className="mb-4">
          8.1. Our services are provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of our services or the information, content, materials, or products included on our services.
        </p>
        <p className="mb-4">
          8.2. To the full extent permissible by applicable law, we disclaim all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
        </p>
        <p className="mb-4">
          8.3. We will not be liable for any damages of any kind arising from the use of our services, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify, defend, and hold harmless Kakusui, its officers, directors, employees, agents, licensors and suppliers from and against all losses, expenses, damages and costs, including reasonable attorneys' fees, resulting from any violation of these Terms of Service or any activity related to your account (including negligent or wrongful conduct) by you or any other person accessing our services using your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Third-Party Links</h2>
        <p className="mb-4">
          Our services may contain links to third-party websites. These links are provided solely as a convenience to you and not as an endorsement by us of the contents on such third-party websites. We are not responsible for the content of linked third-party sites and do not make any representations regarding the content or accuracy of materials on such third-party websites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Termination</h2>
        <p className="mb-4">
          We reserve the right, in our sole discretion, to terminate your access to all or part of our services, with or without notice, for any reason, including, without limitation, breach of these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Governing Law</h2>
        <p className="mb-4">
          These Terms of Service and your use of our services are governed by and construed in accordance with the laws of the jurisdiction in which Kakusui is registered, without giving effect to any principles of conflicts of law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us at{' '}
          <Link to="mailto:contact@kakusui.org" className="text-primary hover:underline">
            contact@kakusui.org
          </Link>
          .
        </p>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Last updated: 2024-11-28</p>
          <p className="mt-4">Changelog:</p>
          <p>2024-11-28: Initial release.</p>
        </div>

        <hr className="my-8 border-border" />
      </div>
    </div>
  )
}

export default Terms 