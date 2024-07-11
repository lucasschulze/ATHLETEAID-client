import { ReactNode } from 'react'

interface CardRootProps {
  children: ReactNode
}

export function CardRoot({ children }: CardRootProps) {
  return (
    <div className="rounded-lg  border bg-card text-card-foreground shadow-xl">
      {children}
    </div>
  )
}
