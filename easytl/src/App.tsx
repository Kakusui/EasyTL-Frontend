import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import TranslationInterface from '@/components/TranslationInterface'

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <main className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-[800px] max-w-[90vw] p-6">
          <TranslationInterface />
        </div>
      </main>
    </ThemeProvider>
  )
}

