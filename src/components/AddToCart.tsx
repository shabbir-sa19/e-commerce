"use client"
import { useState } from 'react'
import { Button } from './ui/button'

type Props = {
  productID: string,
  stock: Number,
}

const AddToCart = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button className={""} onClick={() => { }} disabled={isLoading}>
      {isLoading ? "loading..." : "Add to Cart"}
    </Button>
  )
}