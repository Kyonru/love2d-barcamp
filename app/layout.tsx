import type { Metadata } from "next"
import { Inconsolata } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./globals.css"

const inconsolata = Inconsolata({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creating games with Löve",
  description: "Quickstart guide to Löve2D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="no-scrollbar dark prose prose-invert mx-auto max-w-5xl bg-zinc-950 px-4 py-4"
    >
      <head>
        <link
          rel="icon"
          href="/icon.png?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inconsolata.className}>{children}</body>
    </html>
  )
}
