import { SignUp } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function SignUpPage() {
  return (
    <section className="flex min-h-full w-full items-center justify-center py-8">
      <Suspense>
        <SignUp />
      </Suspense>
    </section>
  )
}
