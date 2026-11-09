"use client"
import { Counter } from '@/components/feature/counter/Counter'
import { Separator } from '@/components/ui/separator'

export default function DebugPage() {
  return (
    <section className="flex grow w-full flex-col items-center py-8">
      <div className="mx-auto">
        <div className="bg-background">background</div>
        <div className="bg-muted">muted</div>
        <div className="bg-secondary">secondary</div>
        <div className="bg-primary">primary</div>
        <div className="bg-accent">accent</div>
        Debug Page
      </div>
      <Separator className={"my-4"} />
      <Counter />
    </section>
  )
}
