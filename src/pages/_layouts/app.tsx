import classNames from 'classnames'
import { LogOut, Menu, User } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { SIDEBAR_ITEMS, SideBarMenuItem } from '@/components/sidebar-menu-item'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AppLayout() {
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const sideBarToggle = () => {
    setToggleCollapse(!toggleCollapse)
  }

  const asideStyle = classNames(
    'ease-in-out fixed z-50 h-full w-[20rem] bg-primary p-6 text-xl text-white shadow-lg shadow-muted-foreground/10 transition duration-300',
    {
      'w-[5.4rem]': toggleCollapse,
      'w-[20rem]': toggleCollapse,
    },
  )
  return (
    <>
      <div className="flex min-h-screen">
        <aside className={asideStyle}>
          <div className="relative flex items-center px-3.5 py-1 text-xl">
            ATHLETED
            <strong className=" font-bold text-red-500">AID</strong>
          </div>
          <nav className="flex flex-col gap-2 transition duration-300">
            {SIDEBAR_ITEMS.map((item) => (
              <SideBarMenuItem
                key={item.id}
                toggleCollapse={toggleCollapse}
                item={item}
              />
            ))}
          </nav>
        </aside>
        <header className="fixed z-0 w-full bg-primary px-4 pl-[20rem] shadow-sm shadow-slate-500/40">
          <div className="flex h-16 items-center justify-between">
            <Button
              onClick={sideBarToggle}
              className="rounder-md ml-3 flex h-[30px] items-center justify-center bg-primary transition duration-300 ease-in-out hover:bg-white/10"
            >
              <Menu />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center ">
              <span className="text-sm font-semibold ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-10 w-10 rounded-full bg-muted-foreground/60 hover:bg-muted-foreground/70">
                      DR
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Usuário</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </div>
          </div>
        </header>
        <main className="mt-16 flex-grow p-2 pl-[20.4rem]">
          <Outlet />
        </main>
      </div>
    </>
  )
}
// https://www.youtube.com/watch?v=p7BpLDeJflw
