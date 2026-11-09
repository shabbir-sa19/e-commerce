import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from "@/components/feature/counter/CounterSlice"
import { CartSlice } from '@/components/feature/cart/CartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      cart: CartSlice.reducer
    }
  })
}

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itstelf
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

