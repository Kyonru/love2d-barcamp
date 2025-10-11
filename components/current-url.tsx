"use client"

import { usePathname } from "next/navigation"

export function CurrentUrl() {
  const pathname = usePathname()
  const host = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  const url = host + pathname

  return <p>{url}</p>
}
