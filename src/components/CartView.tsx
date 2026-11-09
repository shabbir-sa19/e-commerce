"use client"

import { CartItem } from "@/types/types"
import Link from "next/link"
import { useState } from "react"
import { buttonVariants } from "./ui/button"

type Props = {}

export default function CartView({ }: Props) {
  const [items, setItems] = useState<CartItem[]>([])
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="border">

      </div>
      <aside className="border py-16 px-8">
        <h2 className="text-xl">Order summary</h2>
        <div className="flex gap-4">
          <span>Subtotal</span>
          <strong>{10}</strong>
        </div>
        <p className="">
          Shipping and applicable taxes are confirmed before payment.
        </p>
        <Link className={buttonVariants({ variant: "secondary" })} href="/checkout">
          Continue to checkout
        </Link>
        <p className="">
          Secure payment provider integration is not configured in this Project.
        </p>
      </aside>
    </section>
  )
}