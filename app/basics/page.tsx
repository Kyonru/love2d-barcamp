import { Block, CodeBlock, parseRoot } from "codehike/blocks"
import { z } from "zod"
import { Pre, RawCode, highlight } from "codehike/code"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import Content from "./content.mdx"
import Link from "next/link"
import { tokenTransitions } from "@/components/annotations/token-transitions"

const Schema = Block.extend({
  intro: Block,
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export default function Page() {
  const { intro, steps } = parseRoot(Content, Schema)
  return (
    <main>
      <h1 className="mt-8">{intro.title}</h1>
      {intro.children}
      <SelectionProvider className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="prose prose-invert ml-2 flex-1 md:mb-[90vh]">
          {steps.map((step, i) => (
            <div className="mb-8 md:h-[50vh]" key={i}>
              <Selectable
                key={i}
                index={i}
                selectOn={["click", "scroll"]}
                className="rounded border-l-4 border-zinc-700 bg-zinc-900 px-5 py-2 data-[selected=true]:border-blue-400 md:mt-24"
              >
                <h2 className="mt-4 text-xl">{step.title}</h2>
                <div>{step.children}</div>
              </Selectable>
            </div>
          ))}
        </div>
        <div className="sticky top-0 z-50 max-h-60 max-w-xl overflow-auto bg-zinc-900 md:max-h-max md:w-[40vw]">
          <div className="overflow-auto md:top-4">
            <Selection
              from={steps.map((step) => (
                <Code codeblock={step.code} />
              ))}
            />
          </div>
        </div>
      </SelectionProvider>

      <div className="flex flex-row justify-between md:my-4">
        <Link href="/">{"< Home"}</Link>
        <Link href="/slides">{"Slides >"}</Link>
      </div>
    </main>
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      handlers={[tokenTransitions]}
      className="mt-2 bg-transparent pt-0 md:mt-4 md:min-h-[40rem]"
    />
  )
}
