import React from "react"

export function If({
  when,
  children,
}: {
  when: boolean
  children: React.ReactNode
}) {
  return when ? <>{children}</> : null
}
