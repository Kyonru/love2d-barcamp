"use client"

import { useTypewriter } from "@/hooks/useTypewriter"

type ConsolePromptProps = {
  folder: string
  branch: string
  status?: boolean
  command?: string
  typeWriter?: boolean
  speed?: number
  delay?: number
}

export function ConsolePrompt({
  folder,
  branch,
  status = false,
  command = "",
  typeWriter = true,
  speed = 40,
  delay = 0,
}: ConsolePromptProps) {
  const animatedCommand = useTypewriter(command, speed, delay)

  return (
    <div className="rounded-none bg-[#0b1220] px-4 py-3 font-mono text-sm text-gray-200">
      <div className="flex items-center gap-1 whitespace-nowrap">
        {/* Arrow */}
        <span className="font-bold text-green-400">➜</span>

        {/* Folder */}
        <span className="font-semibold text-blue-400">{folder}</span>

        {/* Git branch */}
        <span className="text-blue-700">
          git:(<span className="font-bold text-red-400">{branch}</span>)
        </span>

        {/* Status */}
        {status && <span className="font-bold text-yellow-500">✗</span>}

        {/* Command */}
        {command && (
          <span className="ml-2 text-gray-400">
            {typeWriter ? animatedCommand : command}
            <span className="ml-1 inline-block h-4 w-[6px] animate-pulse bg-gray-300 align-middle" />
          </span>
        )}
      </div>
    </div>
  )
}
