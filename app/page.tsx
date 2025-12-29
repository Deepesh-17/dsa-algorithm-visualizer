"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SortingVisualizer } from "@/components/sorting-visualizer"
import { SearchingVisualizer } from "@/components/searching-visualizer"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"sorting" | "searching">("sorting")

  return (
    <main className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto px-4 py-8">
        {activeTab === "sorting" ? <SortingVisualizer /> : <SearchingVisualizer />}
      </div>
    </main>
  )
}
