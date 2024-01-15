import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Electrolize } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "sonner"
import { NextAuthProvider } from "@/components/Providers"

const electrolize = Electrolize({
  weight: ["400"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full-dark dark" suppressHydrationWarning>
      <NextAuthProvider>
        <body
          className={cn("relative h-full antialiased", electrolize.className)}
        >
          <Navbar />
          <ThemeProvider defaultTheme="dark">
            <main className="relative flex flex-col min-h-screen">
              <div className="flex-grow flex-1">{children}</div>
            </main>
          </ThemeProvider>
          <Toaster theme="dark" position="top-center" />
        </body>
      </NextAuthProvider>
    </html>
  )
}
