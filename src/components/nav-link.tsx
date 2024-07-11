import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function Navlink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex h-full min-h-[40px] items-center rounded-md px-4 py-2 text-muted-foreground/100 transition duration-200 data-[current=true]:text-foreground"
      {...props}
    />
  )
}
