import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "./annotations/callout"
import { mark } from "./annotations/mark"
import { tokenTransitions } from "./annotations/token-transitions"

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      handlers={[callout, mark, tokenTransitions]}
      className="mt-0 min-h-[15rem] rounded-none rounded-b-lg !bg-zinc-900 p-2 pt-4"
    />
  )
}
