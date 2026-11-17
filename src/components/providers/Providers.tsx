"use client"
import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import QueryProvider from './QueryProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ClerkProvider appearance={{ theme: shadcn }}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}
