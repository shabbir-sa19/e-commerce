"use client"
import AccountProfile from '@/components/AccountProfile'
import { UserProfile } from '@clerk/nextjs';

export default function AccountPage() {
  const handler = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/account", {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <section className="flex flex-col w-full items-center py-16 px-8">
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your details</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Account settings</h1>
          <p className="mt-3 text-muted-foreground">Manage your profile and account preferences.</p>
        </header>
        <div className="overflow-hidden rounded-2xl border bg-card p-2 sm:p-4">
          <AccountProfile />
        </div>
        <div className="">
          <UserProfile />
        </div>
      </main>
    </section>
  )
}