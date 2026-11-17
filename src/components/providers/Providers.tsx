"use client"

import React, { Suspense } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import QueryProvider from './QueryProvider'
import StoreProvider from './StoreProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ClerkProvider appearance={{ theme: shadcn }}>
          <QueryProvider>
            <Suspense fallback={<div className="h-14" />}>
              {children}
            </Suspense>
          </QueryProvider>
        </ClerkProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}
