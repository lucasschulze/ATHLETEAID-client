import { LayoutDashboard } from 'lucide-react'

export type SideNavItem = {
  id: number
  title: string
  path: string
  icon?: JSX.Element
  submenu?: boolean
  subMenuItems?: SideNavItem[]
}

export const SIDEBAR_ITEMS: SideNavItem[] = [
  {
    id: 1,
    title: 'Campanhas',
    path: '/campanhas',
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: 3,
    title: 'Tabela Doações',
    path: '/tabela-doacoes',
    icon: <LayoutDashboard size={20} />,
  },
]
