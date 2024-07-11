import { SideNavItem } from '@/constants'

import { Navlink } from './nav-link'

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
        <Navlink to={item.path}>
          {item.icon}
          {!toggleCollapse && (
            <span className="ml-3 font-semibold leading-6">{item.title}</span>
          )}
        </Navlink>
      )}
    </>
  )
}
