// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TranslationInterface from '@/components/TranslationInterface'
import { AuthProvider } from '@/contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Footer from '@/components/Footer'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import About from '@/pages/About'
const MainLayout = () =>
{
  return (
    <main className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
      <div className="w-[800px] max-w-[90vw] p-6">
        <TranslationInterface />
      </div>
      <Footer />
    </main>
  );
}

export default function App()
{
  const [mounted, setMounted] = useState(false)

  useEffect(() => 
  {
    setMounted(true)
  }, [])

  if (!mounted) 
  {
    return null
  }

  return (
    <GoogleOAuthProvider clientId="951070461527-dhsteb0ro97qrq4d2e7cq2mr9ehichol.apps.googleusercontent.com">
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
