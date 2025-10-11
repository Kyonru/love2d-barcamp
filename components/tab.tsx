"use client"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense, useEffect, useState } from "react"
import { SingleTabSchema } from "./code-tabs"
import { useSelectedIndex } from "codehike/utils/selection"

export function CodeTabs({
  tabs,
  children,
}: {
  tabs: z.infer<typeof SingleTabSchema>[]
  children: React.ReactNode[]
}) {
  const [selectedIndex] = useSelectedIndex()
  const [lastSelectedIndex, setLastSelectedIndex] = useState(selectedIndex)
  const [selectedTab, setSelectedTab] = useState(tabs[0].title)

  useEffect(() => {
    setLastSelectedIndex(selectedIndex)

    if (selectedIndex !== lastSelectedIndex) {
      setSelectedTab(tabs[0].title)
    }
  }, [selectedIndex])

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      defaultValue={tabs[0]?.title}
      className="dark bg-muted"
    >
      <TabsList className="flex flex-1 justify-start overflow-x-auto rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.title} value={tab.title || ""}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={tab.title} value={tab.title || ""} className="mt-0">
          <Suspense>{children[i]}</Suspense>
        </TabsContent>
      ))}
    </Tabs>
  )
}
