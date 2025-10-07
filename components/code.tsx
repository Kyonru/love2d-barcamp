import { use } from "react"
import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "@/components/annotations/callout"
import { tokenTransitions } from "@/components/annotations/token-transitions"
import { mark } from "./annotations/mark"
import { focus } from "./annotations/focus"
import { lineNumbers } from "./annotations/line-numbers"
import { wordWrap } from "./annotations/word-wrap"
import { diff } from "./annotations/diff"

export function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = use(highlight(codeblock, "github-dark"))

  return (
    <Pre
      code={highlighted}
      handlers={[
        callout,
        mark,
        focus,
        lineNumbers,
        wordWrap,
        diff,
        tokenTransitions,
      ]}
      className="no-scrollbar mt-0 rounded-none !bg-zinc-900 p-2 pt-4"
    />
  )
}
