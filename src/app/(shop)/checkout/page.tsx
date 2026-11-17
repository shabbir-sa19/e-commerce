"use client"

import { useAppSelector } from "@/hooks/hooks"
import { formatPrice } from "@/lib/utils"
import { ArrowLeft, LockKeyhole } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items)
  const subtotal = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
        <LockKeyhole className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Add something to your bag before heading to checkout.</p>
        <Link href="/products" className={`${buttonVariants()} mt-7`}>
          Explore the collection
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to bag
      </Link>
      <header className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Almost yours</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Checkout</h1>
      </header>
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <LockKeyhole className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Secure checkout is coming soon</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Your bag is ready, but payment and order placement have not been connected yet. You won’t be charged at this time.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-dashed p-5">
            <p className="font-medium">Your items are ready to review.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You can keep browsing or return to your bag to make changes.
            </p>
            <Link href="/products" className={`${buttonVariants({ variant: "outline" })} mt-5`}>
              Continue shopping
            </Link>
          </div>
        </section>
        <aside className="h-fit rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="mt-5 divide-y">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between gap-4 py-4 text-sm">
                <span className="text-muted-foreground">{item.name} <span className="text-xs">× {item.quantity}</span></span>
                <span className="shrink-0 font-medium">{formatPrice(item.priceMinor * item.quantity, item.currency)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t pt-4 font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, items[0].currency)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Shipping and taxes are calculated when checkout is enabled.</p>
        </aside>
      </div>
    </main>
  )
}