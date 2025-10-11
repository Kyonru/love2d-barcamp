"use client"

import { Selectable, useSelectedIndex } from "codehike/utils/selection"

interface Props {
  i: number
  step: { title?: string; children?: React.ReactNode }
}

interface TabsProps {
  steps: { title?: string; children?: React.ReactNode }[]
}

export const ResourceTabDetails = ({ steps }: TabsProps) => {
  const [selectedIndex] = useSelectedIndex()

  const step = steps[selectedIndex]

  return (
    <span className="md:hidden">
      <div className="block md:hidden">{step.children}</div>
    </span>
  )
}

export const ResourcesTab = ({ i, step }: Props) => {
  return (
    <div>
      <Selectable
        index={i}
        selectOn={["click"]}
        className="flex h-full cursor-pointer flex-col justify-center rounded border border-zinc-700 bg-zinc-900 p-2 transition-colors duration-200 ease-in-out hover:bg-zinc-800 data-[selected=true]:border-blue-400 md:mb-4 md:h-fit md:px-5 md:py-2 md:pt-4"
      >
        <h3 className="m-0 mt-0 p-4 text-base md:p-0 md:text-2xl">
          {step.title}
        </h3>
        <div className="hidden md:block">{step.children}</div>
      </Selectable>
    </div>
  )
}
