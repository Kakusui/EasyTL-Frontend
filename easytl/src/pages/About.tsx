// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Github, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const About = () => 
{
  const navigate = useNavigate()

  useEffect(() => 
  {
    document.title = 'EasyTL | About'
  }, [])

  return (
    <div className="min-h-screen w-screen bg-background p-8">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 h-12 w-12"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-8 w-8" />
      </Button>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About EasyTL</h1>
            <p className="text-lg text-muted-foreground">Easy Translator - Simple, yet powerful</p>
          </div>

          <div className="space-y-6 text-lg">
            <p>
              Hi there! Welcome to EasyTL (Easy Translator), a tool I've designed primarily for my own use and as a learning opportunity.
            </p>

            <p>
              At its core, EasyTL is a sophisticated AI-powered translator that leverages the capabilities of the top three LLM providers:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Anthropic's Claude</li>
              <li>Google's Gemini</li>
              <li>OpenAI's ChatGPT</li>
            </ul>

            <p>
              While it's packed with features, EasyTL was designed with simplicity in mind - easy to use, yet customizable and powerful when you need it to be.
            </p>

            <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Quick Start Guide</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Select your model and provider (I recommend OpenAI's GPT-4-Turbo)</li>
                <li>Choose your desired tone</li>
                <li>Select your language via dropdown, type it in, or let EasyTL detect it</li>
                <li>For advanced features, expand the Advanced Settings section</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Open Source</h2>
              <p>
                Like all my projects, EasyTL is open source. The codebase is split across three repositories:
              </p>
              <div className="space-y-2">
                <a 
                  href="https://github.com/Bikatr7/EasyTL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="h-5 w-5" />
                  Python Library
                </a>
                <a 
                  href="https://github.com/kakusui/kakusui.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="h-5 w-5" />
                  Backend
                </a>
                <a 
                  href="https://github.com/kakusui/easytl-frontend" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="h-5 w-5" />
                  Frontend (This Website)
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Usage Options</h2>
              <p>
                You can use EasyTL in two ways:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Use your own API keys from the supported providers</li>
                <li>Purchase credits directly through our platform</li>
              </ul>
            </div>

            <div className="pt-8 text-center">
              <p className="text-lg">Hope you enjoy using EasyTL!</p>
              <a 
                href="mailto:kbilyeu@kakusui.org"
                className="inline-flex items-center gap-2 text-primary hover:underline mt-2"
              >
                <Mail className="h-5 w-5" />
                kbilyeu@kakusui.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About