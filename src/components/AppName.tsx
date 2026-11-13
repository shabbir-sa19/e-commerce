import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AppName = () => {
  return (
    <Link href={"/"} className="flex px-2 py-1 title-font font-medium items-center tracking-tight md:mb-0 text-primary focus-visible:ring-2 focus-visible:ring-ring/50 rounded-lg">
      <ShoppingBag />
      <span className="ml-3 text-2xl">E Commerce</span>
    </Link>
  )
}

export default AppName