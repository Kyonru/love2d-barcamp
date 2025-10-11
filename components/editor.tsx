"use client"
import { useTypewriter } from "@/hooks/useTypewriter"
import { useSelectedIndex } from "codehike/utils/selection"
import { Suspense, useMemo } from "react"
import { ConsolePrompt } from "./console"

export const CodeEditorWindow = ({
  children,
  steps,
}: {
  children: React.ReactNode
  steps: ({ title: string } & any)[]
}) => {
  const [selectedIndex] = useSelectedIndex()

  const title = useMemo(
    () => steps[selectedIndex]?.title,
    [selectedIndex, steps],
  )

  const animatedTitle = useTypewriter(title || "", 40)
  const command = useMemo(
    () => steps[selectedIndex]?.console?.value || "",
    [selectedIndex, steps],
  )

  return (
    <div className={"h-fit"}>
      <div className="overflow-hidden rounded-lg">
        <div className="flex flex-row items-center gap-3 rounded-t-lg bg-emerald-900 p-4">
          <span className="size-4 rounded-full bg-red-400 hover:bg-red-500 active:bg-red-600" />
          <span className="size-4 rounded-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600" />
          <span className="size-4 rounded-full bg-green-400 hover:bg-green-500 active:bg-green-600" />
          <div className="flex flex-1 flex-row items-center">
            {title && (
              <p className="text-md m-0 -mt-1 h-5 p-0">{animatedTitle}</p>
            )}
          </div>
        </div>
        <div>
          <Suspense>{children}</Suspense>
          <ConsolePrompt
            sourceControl="Philly"
            folder="BARCAMP"
            branch="2025"
            status={true}
            command={command}
            typeWriter={true}
            speed={15}
            delay={1000}
          />
        </div>
      </div>
    </div>
  )
}
