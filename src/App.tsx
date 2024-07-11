import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { AuthProvider } from './pages/Context/auth-context'
import { Router } from './routes'

export function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider storageKey="athleteaid-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | athleteaid" />
          <Toaster richColors />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  )
}
