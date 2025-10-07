"use client"
import { useSelectedIndex } from "codehike/utils/selection"
import { useCallback } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"

export function Controls({ length }: { length: number }) {
  const [selectedIndex, setSelectedIndex] = useSelectedIndex()

  const onBack = useCallback(
    () => setSelectedIndex(Math.max(0, selectedIndex - 1)),
    [selectedIndex],
  )
  const onNext = useCallback(
    () => setSelectedIndex(Math.min(length - 1, selectedIndex + 1)),
    [selectedIndex, length],
  )
  const onSelect = useCallback((i: number) => setSelectedIndex(i), [])

  useHotkeys("arrowleft", onBack, [onBack])
  useHotkeys("arrowright", onNext, [onNext])

  return (
    <div className="flex items-center justify-center">
      <button className="mr-4" onClick={onBack}>
        <ChevronLeftIcon className="size-10 active:animate-ping" />
      </button>
      {[...Array(length)].map((_, i) => (
        <button
          key={i}
          className={`rounded-full mx-1 cursor-pointer ${
            selectedIndex === i ? "bg-white size-3" : "bg-gray-600 size-2"
          } transition duration-500`}
          onClick={() => onSelect(i)}
        />
      ))}
      <button className="ml-4" onClick={onNext}>
        <ChevronRightIcon className="size-10 active:animate-ping" />
      </button>
    </div>
  )
}
