import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AppName = () => {
  return (
    <Link href={"/"} className="flex title-font font-medium items-center tracking-tight md:mb-0">
      <ShoppingBag />
      <span className="ml-3 text-2xl">E Commerce</span>
    </Link>
  )
}

export default AppName