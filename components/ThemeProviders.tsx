"use client";

import { ThemeProvider } from "next-themes";

/** App-wide theme provider (lives in the root layout). Dark-first. */
export default function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
