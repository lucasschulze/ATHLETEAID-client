import { ReactNode } from 'react'

import { useAuth } from './useAuth'

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const auth = useAuth()

  if (!auth.email) {
    return <h1>Você não tem acesso</h1>
  }

  return children
}
