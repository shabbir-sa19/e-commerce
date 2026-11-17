"use client"
import Link from 'next/link'
import ThemeButton from './ThemeButton'
import AppName from './AppName'
import { Button } from './ui/button'
import { LogIn, Menu } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'
import { CartButton } from './CartButton'

type HeaderProp = {
  pathname: string | null,
  closeNav: () => void
}

const navlinks = [
  { label: "Products", href: "/products" },
  { label: "Debug", href: "/debug" },
  { label: "Login", href: "/sign-in" },
  { label: "Cart", href: "/cart" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeNav = () => setIsMenuOpen(false);
  const pathname = usePathname();
  return (
    <header className="body-font z-50 border-b">
      <div className="flex px-8 py-2 items-center justify-between">
        {/** Logo */}
        <AppName />
        {/** Menu Button */}
        <Button className={`flex md:hidden focus:bg-primary focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50`} variant={'outline'} onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
          <Menu className="" />
        </Button>
        {/** Navigation Menu */}
        <div className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-[50px] p-0 w-full backdrop-blur-xl items-center md:hidden`}>
          <div className={"flex flex-col md:flex-row w-full gap-2"}>
            <HeaderNavLinks pathname={pathname} closeNav={closeNav} />
          </div>
        </div>
        {/* Sign Up Button */}
        <div className="hidden md:flex gap-4 items-center">
          <ThemeButton />
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <Button variant="default" size={"lg"} className={`flex px-4 py-2 focus:bg-primary focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50`}>
                <LogIn />
                <span className="">Log In</span>
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <CartButton />
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  )
}
function HeaderNavLinks({ pathname, closeNav }: HeaderProp) {
  return (
    <>
      {navlinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`inline-flex m-0.5 px-4 border-b md:border-0 md:px-2 py-1 rounded-md font-medium transition-all focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 ${pathname === link.href ? "bg-accent text-muted-foreground" : "hover:bg-accent hover:text-accent-foreground"}`}
          onClick={closeNav}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
export default Header
