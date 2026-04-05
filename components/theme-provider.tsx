"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="oshini-portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  )
}