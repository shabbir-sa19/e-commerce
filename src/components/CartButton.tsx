"use client"
import { Button, buttonVariants } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export const CartButton = () => {
  return (
    <Link href={"/cart"} className={buttonVariants({ variant: 'outline', size: 'icon', className: "transition ease-in-out" })}>
      <ShoppingCart className="h-[1.75rem] w-[1.75rem]" />
    </Link>
  )
}