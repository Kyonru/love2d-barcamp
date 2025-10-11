import { z } from "zod"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import { Block, CodeBlock, ImageBlock, parseRoot } from "codehike/blocks"
import Content from "./content.mdx"
// From token-transitions example
import { Code } from "@/components/code"
import Link from "next/link"

const Schema = Block.extend({
  steps: z.array(
    Block.extend({
      code: z.optional(CodeBlock),
      content: z.optional(Block),
      image: z.optional(ImageBlock),
    }),
  ),
})

const BlockContent = ({ content }: { content?: React.ReactNode }) => {
  return (
    <div className="prose prose-invert ml-2 mt-4 flex-1 prose-h2:mt-4">
      {content}
    </div>
  )
}

export default function Page() {
  const { steps } = parseRoot(Content, Schema)
  return (
    <>
      <SelectionProvider className="flex">
        <div className="prose prose-invert ml-2 mt-4 flex-1 prose-h2:mt-4">
          {steps.map((step, i) => (
            <Selectable
              key={i}
              index={i}
              selectOn={["click"]}
              className="mb-4 cursor-pointer rounded border border-zinc-700 bg-zinc-900 px-5 py-2 transition-colors duration-200 ease-in-out hover:bg-zinc-800 data-[selected=true]:border-blue-400"
            >
              <h2 className="text-xl">{step.title}</h2>
              <div>{step.children}</div>
            </Selectable>
          ))}
        </div>
        <div className="w-[40vw] max-w-xl">
          <div className="sticky top-16 h-full overflow-auto p-4">
            <Selection
              from={steps.map((step, i) => (
                <div key={i}>
                  {step.code && <Code codeblock={step.code} />}
                  {step.content && (
                    <BlockContent content={step.content.children} />
                  )}
                </div>
              ))}
            />
          </div>
        </div>
      </SelectionProvider>
      <div className="flex flex-row justify-between">
        <Link href="/slides">{"< Slides"}</Link>
        <Link href="/credits">{"Credits >"}</Link>
      </div>
    </>
  )
}
