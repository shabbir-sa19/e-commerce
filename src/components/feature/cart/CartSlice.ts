import { RootState } from "@/lib/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem } from "@/types/types"

export interface CartState {
  items: CartItem[]
}

type UpdateQuantityPayload = {
  slug: string
  quantity: number
}

const initialState: CartState = { items: [] }

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.slug === action.payload.slug)
      if (existingItem) {
        const quantity = existingItem.quantity + action.payload.quantity
        existingItem.quantity = action.payload.stock === undefined
          ? quantity
          : Math.min(quantity, action.payload.stock)
      } else {
        const item = { ...action.payload }
        if (item.stock !== undefined) {
          item.quantity = Math.min(item.quantity, item.stock)
        }
        state.items.push(item)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.slug !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const item = state.items.find((cartItem) => cartItem.slug === action.payload.slug)
      if (item) {
        const quantity = Math.max(1, action.payload.quantity)
        item.quantity = item.stock === undefined
          ? quantity
          : Math.min(quantity, item.stock)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = CartSlice.actions
export const SelectCart = (state: RootState) => state.cart
export default CartSlice.reducer