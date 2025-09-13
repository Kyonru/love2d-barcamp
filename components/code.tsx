import { use } from "react"
import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "@/components/annotations/callout"
import { tokenTransitions } from "@/components/annotations/token-transitions"
import { mark } from "./annotations/mark"
import { focus } from "./annotations/focus"

export function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = use(highlight(codeblock, "github-dark"))

  return (
    <Pre
      code={highlighted}
      handlers={[callout, mark, focus, tokenTransitions]}
      className="mt-0 min-h-[15rem] rounded-none !bg-zinc-900 p-2 pt-4"
    />
  )
}
