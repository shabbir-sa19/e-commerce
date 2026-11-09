import { RootState } from "@/lib/store"
import { createSlice } from "@reduxjs/toolkit"

export interface CartState { }
const initialState: CartState = {}
export const CartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
  }
})

export const { } = CartSlice.actions
export const SelectCart = (state: RootState) => state.cart
export default CartSlice.reducer