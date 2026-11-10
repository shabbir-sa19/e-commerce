"use client"

import { SignInButton, UserProfile, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function AccountProfile() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <div className="h-56 animate-pulse rounded-xl bg-muted" aria-busy="true" />
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-8">
        <h2 className="text-xl font-semibold">Sign in to manage your account</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Access your profile details and account preferences in one place.
        </p>
        <SignInButton mode="redirect">
          <Button className="mt-6">Sign in</Button>
        </SignInButton>
      </div>
    )
  }

  return <UserProfile />
}
