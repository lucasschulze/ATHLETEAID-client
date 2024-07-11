import classNames from 'classnames'
import { LogOut, Menu, User } from 'lucide-react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { SideBarMenuItem } from '@/components/sidebar-menu-item'
import { ThemeToggle } from '@/components/theme/theme-toggle'
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
import { SIDEBAR_ITEMS } from '@/constants'
import { useAuth } from '../Context/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getUserAtleta } from '@/api/get-user-atleta'
import { getUserDoador } from '@/api/get-user-doador'

export function AppLayout() {
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const sideBarToggle = () => {
    setToggleCollapse(!toggleCollapse)
  }

  const { logout } = useAuth();

  function handleLogout() {
    try {
      logout()
    } catch (error) {
      console.error('Falha ao sair:', error);
    }
  }

  const { data: resultAthlete} = useQuery({
    queryKey: ['user'],
    queryFn: getUserAtleta
  })
  const { data: resultDoador} = useQuery({
    queryKey: ['user'],
    queryFn: getUserDoador
  })

  const user = useAuth()

  const navigate = useNavigate()

  const asideStyle = classNames(
    'ease-in-out fixed z-50 h-full w-[20rem] text-black dark:text-white p-6 text-xl text-white shadow-lg shadow-muted-foreground/10 transition duration-300',
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
        <header className="fixed z-0 w-full px-4 pl-[20rem] shadow-sm shadow-slate-500/40">
          <div className="flex h-16 items-center justify-between">
            <Button
              onClick={sideBarToggle}
              className="rounder-md ml-3 flex h-[30px] items-center justify-center bg-foreground transition duration-300 ease-in-out hover:bg-muted-foreground/20"
            >
              <Menu />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center gap-2">
              <ThemeToggle />

              <span className="text-sm font-semibold ">
                {user.tipo === 'atleta' ? (
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-10 w-10 rounded-full bg-muted-foreground/60 hover:bg-muted-foreground/70">
                      {resultAthlete?.nome}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate(`/user/${resultAthlete?.id}`)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Usuário</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleLogout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                ): (
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-10 w-10 rounded-full bg-muted-foreground/60 hover:bg-muted-foreground/70">
                      {resultDoador?.nome}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate(`/user-donor/${resultDoador?.id}`)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Usuário</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleLogout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                )}
                
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

