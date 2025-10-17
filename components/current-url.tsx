"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function CurrentUrl() {
  const pathname = usePathname()
  const [url, setUrl] = useState("")

  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    setUrl(host + pathname)
  }, [pathname])

  return <p>{url}</p>
}
