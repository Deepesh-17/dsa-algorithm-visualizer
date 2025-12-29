"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Lightbulb } from "lucide-react"
import { sortingAlgorithms, type SortingAlgorithm } from "@/lib/sorting-algorithms"
import { searchingAlgorithms, type SearchingAlgorithm } from "@/lib/searching-algorithms"

interface AlgorithmInfoProps {
  type: "sorting" | "searching"
  algorithm: SortingAlgorithm | SearchingAlgorithm
}

export function AlgorithmInfo({ type, algorithm }: AlgorithmInfoProps) {
  const algorithmData =
    type === "sorting"
      ? sortingAlgorithms[algorithm as SortingAlgorithm]
      : searchingAlgorithms[algorithm as SearchingAlgorithm]

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
          {algorithmData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{algorithmData.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Time Complexity</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Best</span>
              <Badge variant="secondary" className="w-full justify-center font-mono text-xs">
                {algorithmData.timeComplexity.best}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Average</span>
              <Badge variant="secondary" className="w-full justify-center font-mono text-xs">
                {algorithmData.timeComplexity.average}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Worst</span>
              <Badge variant="secondary" className="w-full justify-center font-mono text-xs">
                {algorithmData.timeComplexity.worst}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Space Complexity</span>
          <Badge variant="outline" className="font-mono text-xs">
            {algorithmData.spaceComplexity}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
