import { Block, CodeBlock, ImageBlock, parseRoot } from "codehike/blocks"
import Content from "./content.mdx"
import { z } from "zod"
import { Selection, SelectionProvider } from "codehike/utils/selection"
// From token-transitions example
import { Controls } from "../components/controls"
import { Code } from "../components/code"

const Schema = Block.extend({
  steps: z.array(
    Block.extend({ code: CodeBlock, cover: z.optional(ImageBlock) }),
  ),
})

export const CodeEditorWindow = ({
  children,
  title,
}: {
  title?: string
  children: React.ReactNode
}) => {
  return (
    <div className={"h-fit w-[40vw]"}>
      <div className="overflow-hidden rounded-lg">
        <div className="flex flex-row gap-3 rounded-t-lg bg-emerald-900 p-4">
          <span className="size-4 rounded-full bg-red-400 hover:bg-red-500 active:bg-red-600" />
          <span className="size-4 rounded-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600" />
          <span className="size-4 rounded-full bg-green-400 hover:bg-green-500 active:bg-green-600" />
          {title && (
            <span className="size-4 rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-600">
              {title}
            </span>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default function Page() {
  const { steps } = parseRoot(Content, Schema)
  return (
    <SelectionProvider>
      <CodeEditorWindow>
        <Selection
          from={steps.map((step) => (
            <Code codeblock={step.code} />
          ))}
        />
      </CodeEditorWindow>
      <Controls length={steps.length} />
      <div className="px-4">
        <Selection from={steps.map((step) => step.children)} />
      </div>
    </SelectionProvider>
  )
}
