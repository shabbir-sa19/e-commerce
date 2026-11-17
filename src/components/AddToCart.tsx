"use client"

import { addToCart } from '@/components/feature/cart/CartSlice'
import { useAppDispatch } from '@/hooks/hooks'
import { Product } from '@/types/types'
import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

type Props = {
  product: Pick<Product, 'slug' | 'name' | 'image' | 'priceMinor' | 'currency' | 'stock'>
}

export const AddToCart = ({ product }: Props) => {
  const dispatch = useAppDispatch()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      priceMinor: product.priceMinor,
      currency: product.currency,
      quantity: 1,
      stock: product.stock,
    }))
    setAdded(true)
  }

  return (
    <div className="space-y-3">
      <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={product.stock < 1}>
        {product.stock < 1 ? (
          "Sold out"
        ) : added ? (
          <><Check aria-hidden="true" /> Added to your bag</>
        ) : (
          <><ShoppingBag aria-hidden="true" /> Add to bag</>
        )}
      </Button>
      {added && (
        <Link href="/cart" className="block text-center text-sm font-medium text-primary underline-offset-4 hover:underline">
          View your bag
        </Link>
      )}
    </div>
  )
}