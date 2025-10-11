"use client"
import { useSelectedIndex } from "codehike/utils/selection"
import { useCallback, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import { TabsSchema } from "@/components/code-tabs"
import { z } from "zod"
import { useIsMobile } from "@/hooks/useIsMobile"

interface Props {
  steps: z.infer<typeof TabsSchema>[]
}

const Dot = ({
  onClick,
  selected,
  title,
}: {
  onClick: () => void
  selected: boolean
  title?: string
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        title={title}
        className={`rounded-full mx-1 cursor-pointer ${
          selected ? "bg-white size-3" : "bg-gray-600 size-2"
        } transition duration-500`}
        onClick={onClick}
      />
      {showTooltip && (
        <p className="absolute left-9 top-0 whitespace-nowrap rounded-lg bg-secondary p-1 text-sm text-white">
          {title}
        </p>
      )}
    </div>
  )
}

export function Controls({ steps }: Props) {
  const [selectedIndex, setSelectedIndex] = useSelectedIndex()
  const length = steps.length

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

  const isMobile = useIsMobile()

  return (
    <div className="flex items-center justify-center">
      <button className="mr-4" onClick={onBack}>
        <ChevronLeftIcon className="size-10 active:animate-ping" />
      </button>
      {isMobile ? (
        <div className="text-sm text-white">
          {selectedIndex + 1} / {length}
        </div>
      ) : (
        <div className="flex items-center">
          {steps.map((step, i) => (
            <Dot
              key={i}
              title={step.title}
              onClick={() => onSelect(i)}
              selected={selectedIndex === i}
            />
          ))}
        </div>
      )}
      <button className="ml-4" onClick={onNext}>
        <ChevronRightIcon className="size-10 active:animate-ping" />
      </button>
    </div>
  )
}
