import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import TranslationInterface from '@/components/TranslationInterface'
import { AuthProvider } from '@/contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <GoogleOAuthProvider clientId="951070461527-dhsteb0ro97qrq4d2e7cq2mr9ehichol.apps.googleusercontent.com">
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <main className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
            <div className="w-[800px] max-w-[90vw] p-6">
              <TranslationInterface />
            </div>
          </main>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

