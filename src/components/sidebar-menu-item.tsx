import { LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

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
]

export const SideBarMenuItem = ({
  item,
  toggleCollapse,
}: {
  item: SideNavItem
  toggleCollapse: boolean
}) => {
  return (
    <>
      {item.submenu ? (
        <div className="min-w-[18px] rounded-md">
          <a>{item.icon}</a>
        </div>
      ) : (
        <Link
          to={item.path}
          className="flex h-full min-h-[40px] items-center rounded-md px-4 py-2 text-muted-foreground/100 transition duration-200 hover:text-white"
        >
          {item.icon}
          {!toggleCollapse && (
            <span className="ml-3 font-semibold leading-6">{item.title}</span>
          )}
        </Link>
      )}
    </>
  )
}
