"use client"

import { useSelectedIndex } from "codehike/utils/selection"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

export const InitialPage = ({
  stepsCount,
  defaultPage = 0,
  paramName = "page",
}: {
  stepsCount: number
  defaultPage?: number
  paramName?: string
}) => {
  const searchParams = useSearchParams()
  const [_, setSelectedIndex] = useSelectedIndex()

  const initialPage = useMemo<number>(() => {
    const page = searchParams.get(paramName)
    if (page) {
      const pageNumber = parseInt(page)
      if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber < stepsCount) {
        return pageNumber
      }
    }
    return defaultPage
  }, [searchParams, stepsCount, defaultPage, paramName])

  useEffect(() => {
    if (
      initialPage !== undefined &&
      initialPage >= 0 &&
      initialPage < stepsCount
    ) {
      setSelectedIndex(initialPage)
    }
  }, [initialPage, stepsCount])

  return null
}
