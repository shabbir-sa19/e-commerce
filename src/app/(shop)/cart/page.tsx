import CartView from "@/components/CartView"

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Shopping bag</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Your bag</h1>
      </header>
      <CartView />
    </main>
  )
}