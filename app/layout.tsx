import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Target, Calculator, Database } from "lucide-react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Purdue Meal Planning",
  description: "Professional meal optimization and nutritional analysis platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <div className="mr-4 flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <BarChart3 className="h-6 w-6" />
                <span className="font-serif text-xl font-semibold">Purdue Meal Planning</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/optimizer" className="transition-colors hover:text-foreground/80 text-foreground/60">
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>Optimizer</span>
                </div>
              </Link>
              <Link href="/comparison" className="transition-colors hover:text-foreground/80 text-foreground/60">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Compare</span>
                </div>
              </Link>
              <Link href="/analysis" className="transition-colors hover:text-foreground/80 text-foreground/60">
                <div className="flex items-center space-x-1">
                  <Calculator className="h-4 w-4" />
                  <span>Analysis</span>
                </div>
              </Link>
              <Link href="/scraper" className="transition-colors hover:text-foreground/80 text-foreground/60">
                <div className="flex items-center space-x-1">
                  <Database className="h-4 w-4" />
                  <span>Data</span>
                </div>
              </Link>
            </nav>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </header>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
