import { z } from "zod"
import { Block, parseRoot } from "codehike/blocks"
import { Selection, SelectionProvider } from "codehike/utils/selection"
import { Controls } from "@/components/controls"
import { CodeWithTabs, TabsSchema } from "@/components/code-tabs"
import { CodeEditorWindow } from "@/components/editor"
import Content from "./content.mdx"

export const Schema = Block.extend({
  steps: z.array(TabsSchema),
})

export default function Page() {
  const { steps } = parseRoot(Content, Schema)
  console.log(steps)

  return (
    <SelectionProvider>
      <CodeEditorWindow steps={steps}>
        <Selection
          from={steps.map((step) => (
            <CodeWithTabs tabs={step.tabs} />
          ))}
        />
      </CodeEditorWindow>
      <div className="mt-4">
        <Controls length={steps.length} />
      </div>
      <div className="px-4">
        <Selection from={steps.map((step) => step.children)} />
      </div>
    </SelectionProvider>
  )
}
