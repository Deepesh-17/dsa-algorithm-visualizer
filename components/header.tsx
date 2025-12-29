"use client"

import { BarChart3, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  activeTab: "sorting" | "searching"
  setActiveTab: (tab: "sorting" | "searching") => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">DSA Visualizer</h1>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant={activeTab === "sorting" ? "default" : "ghost"}
              onClick={() => setActiveTab("sorting")}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Sorting
            </Button>
            <Button
              variant={activeTab === "searching" ? "default" : "ghost"}
              onClick={() => setActiveTab("searching")}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Searching
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
