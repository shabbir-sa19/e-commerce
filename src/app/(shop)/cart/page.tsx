import CartView from "@/components/CartView"

type Props = {}

export default function CartPage({ }: Props) {
  return (
    <section className="w-full items-center py-16 px-8">
      <h1 className="text-2xl font-heading">Your bag</h1>
      <CartView />
    </section>
  )
}