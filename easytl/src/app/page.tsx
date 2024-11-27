import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import TranslationInterface from '@/components/TranslationInterface'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-4xl w-full">
          <TranslationInterface />
        </div>
      </main>
    </ThemeProvider>
  )
}

