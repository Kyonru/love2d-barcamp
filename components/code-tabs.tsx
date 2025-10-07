import { Block, CodeBlock, ImageBlock, parseProps } from "codehike/blocks"
import { z } from "zod"
import { CodeTabs } from "./tab"
import { Code } from "./code"

export const SingleTabSchema = Block.extend({
  code: CodeBlock,
  cover: z.optional(ImageBlock),
})

export const TabsSchema = Block.extend({
  tabs: z.array(SingleTabSchema),
  console: z.optional(CodeBlock),
  images: z.optional(z.array(ImageBlock)),
  audios: z.optional(z.array(ImageBlock)),
})

export function CodeWithTabs(props: {
  tabs: z.infer<typeof TabsSchema>["tabs"]
}) {
  const { tabs } = parseProps(props, TabsSchema)
  return (
    <CodeTabs tabs={tabs}>
      {tabs.map((tab, i) => (
        <Code key={tab.title} codeblock={tab.code || tabs[0].code!} />
      ))}
    </CodeTabs>
  )
}
