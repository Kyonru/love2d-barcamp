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
import { ResourcesTab, ResourceTabDetails } from "./tab"

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
      <SelectionProvider className="flex flex-col md:flex-row">
        <div className="prose prose-invert sticky top-4 z-50 flex flex-1 flex-row gap-2 prose-h2:mt-4 md:ml-2 md:mt-4 md:flex-col md:gap-0">
          {steps.map((step, i) => (
            <ResourcesTab key={i} i={i} step={step} />
          ))}
        </div>
        <ResourceTabDetails steps={steps} />
        <div className="max-w-xl md:w-[40vw]">
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
