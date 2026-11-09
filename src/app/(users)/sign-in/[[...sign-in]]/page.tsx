import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function SignInPage() {
  return (
    <section className="flex min-h-full w-full items-center justify-center py-8">
      <Suspense>
        <SignIn />
      </Suspense>
    </section>
  )
}
