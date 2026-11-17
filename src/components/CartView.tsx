"use client"

import { removeFromCart, updateQuantity } from "@/components/feature/cart/CartSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { formatPrice } from "@/lib/utils"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"

export default function CartView() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const subtotal = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-dashed bg-card px-6 py-16 text-center">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
        <h2 className="mt-5 text-xl font-semibold">Your bag is waiting</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Find something thoughtful for your home and it will show up here.
        </p>
        <Link href="/products" className={`${buttonVariants()} mt-6`}>
          Explore the collection
        </Link>
      </div>
    )
  }

  return (
    <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="divide-y rounded-2xl border bg-card px-4 sm:px-6">
        {items.map((item) => (
          <article key={item.slug} className="flex gap-4 py-5 sm:gap-6">
            <Link href={`/products/${item.slug}`} className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-32">
              <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <Link href={`/products/${item.slug}`} className="font-medium hover:text-primary">{item.name}</Link>
                <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.priceMinor, item.currency)} each</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Decrease ${item.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() => dispatch(updateQuantity({ slug: item.slug, quantity: item.quantity - 1 }))}
                  >
                    <Minus aria-hidden="true" />
                  </Button>
                  <span className="w-8 text-center text-sm tabular-nums" aria-label="Quantity">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Increase ${item.name} quantity`}
                    disabled={item.stock !== undefined && item.quantity >= item.stock}
                    onClick={() => dispatch(updateQuantity({ slug: item.slug, quantity: item.quantity + 1 }))}
                  >
                    <Plus aria-hidden="true" />
                  </Button>
                </div>
                <p className="w-20 text-right text-sm font-medium">{formatPrice(item.priceMinor * item.quantity, item.currency)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${item.name} from bag`}
                  onClick={() => dispatch(removeFromCart(item.slug))}
                >
                  <Trash2 aria-hidden="true" className="text-muted-foreground" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="rounded-2xl border bg-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-6 flex items-center justify-between border-b pb-4 text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal, items[0].currency)}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Shipping and applicable taxes are confirmed before payment.
        </p>
        <Link href="/checkout" className={`${buttonVariants()} mt-6 w-full`}>
          Continue to checkout
        </Link>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Secure payment integration is not configured yet.
        </p>
      </aside>
    </section>
  )
}