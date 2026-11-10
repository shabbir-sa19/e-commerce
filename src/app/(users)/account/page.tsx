import AccountProfile from '@/components/AccountProfile'

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your details</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Account settings</h1>
        <p className="mt-3 text-muted-foreground">Manage your profile and account preferences.</p>
      </header>
      <div className="overflow-hidden rounded-2xl border bg-card p-2 sm:p-4">
        <AccountProfile />
      </div>
    </main>
  )
}