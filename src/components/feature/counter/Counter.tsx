import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { decrement, increment } from './CounterSlice'
import { RootState } from '@/lib/store'

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <div>
      <div>
        <Button onClick={() => dispatch(increment())} >
          Increment
        </Button>
        <span>{count}</span>
        <Button onClick={() => dispatch(decrement())} >
          Decrement
        </Button>
      </div>
    </div>
  )
}
