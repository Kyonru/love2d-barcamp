import { z } from "zod"
import { Block, parseRoot } from "codehike/blocks"
import {
  Selection,
  SelectionProvider,
  useSelectedIndex,
} from "codehike/utils/selection"
import { Controls } from "@/components/controls"
import { CodeWithTabs, TabsSchema } from "@/components/code-tabs"
import { CodeEditorWindow } from "@/components/editor"
import Content from "./content.mdx"
import Link from "next/link"
import { SlideContent } from "./slide-content"

export const Schema = Block.extend({
  steps: z.array(TabsSchema),
})

export default function Page() {
  const { steps } = parseRoot(Content, Schema)
  console.log(steps)

  return (
    <>
      <SelectionProvider>
        <div className="mb-8 flex flex-1 flex-col justify-between">
          <div className="mb-2">
            <Controls length={steps.length} />
          </div>
          <CodeEditorWindow steps={steps}>
            <Selection
              from={steps.map((step) => (
                <CodeWithTabs tabs={step.tabs} />
              ))}
            />
          </CodeEditorWindow>

          <div className="px-4">
            <Selection from={steps.map((step) => step.children)} />
          </div>
          <SlideContent
            images={steps.map((step) => step.images || [])}
            audios={steps.map((step) => step.audios || [])}
          />
        </div>
      </SelectionProvider>
      <Link href="/">{"<"}</Link>
    </>
  )
}
