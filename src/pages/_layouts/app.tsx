import { HelpingHand } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-slate-900 p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <HelpingHand className="h-10 w-10 text-muted" />
          <span className="font-semibold text-muted">athleteaid</span>
        </div>
        <footer className="text-sm text-muted">
          Painel de parceiro &copy; athleteaid - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
