"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Play, Square, Shuffle } from "lucide-react"
import { sortingAlgorithms, type SortingAlgorithm } from "@/lib/sorting-algorithms"
import { searchingAlgorithms, type SearchingAlgorithm } from "@/lib/searching-algorithms"

interface ControlsPanelProps {
  type: "sorting" | "searching"
  algorithms: (SortingAlgorithm | SearchingAlgorithm)[]
  selectedAlgorithm: SortingAlgorithm | SearchingAlgorithm
  onAlgorithmChange: (algorithm: string) => void
  arraySize: number
  onArraySizeChange: (size: number) => void
  speed: number
  onSpeedChange: (speed: number) => void
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onGenerateArray: () => void
}

export function ControlsPanel({
  type,
  algorithms,
  selectedAlgorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  isRunning,
  onStart,
  onStop,
  onGenerateArray,
}: ControlsPanelProps) {
  const algorithmData = type === "sorting" ? sortingAlgorithms : searchingAlgorithms

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Algorithm Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Select Algorithm</Label>
        <div className="flex flex-wrap gap-2">
          {algorithms.map((alg) => (
            <Button
              key={alg}
              variant={selectedAlgorithm === alg ? "default" : "secondary"}
              size="sm"
              onClick={() => onAlgorithmChange(alg)}
              disabled={isRunning}
              className="capitalize"
            >
              {algorithmData[alg as keyof typeof algorithmData].name}
            </Button>
          ))}
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Array Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Array Size</Label>
            <span className="text-sm text-muted-foreground">{arraySize}</span>
          </div>
          <Slider
            value={[arraySize]}
            onValueChange={([value]) => onArraySizeChange(value)}
            min={10}
            max={100}
            step={5}
            disabled={isRunning}
          />
        </div>

        {/* Speed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Animation Speed</Label>
            <span className="text-sm text-muted-foreground">{speed}%</span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            min={1}
            max={100}
            step={1}
            disabled={isRunning}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onGenerateArray} disabled={isRunning} variant="secondary" className="gap-2">
          <Shuffle className="w-4 h-4" />
          Generate Array
        </Button>

        {isRunning ? (
          <Button onClick={onStop} variant="destructive" className="gap-2">
            <Square className="w-4 h-4" />
            Stop
          </Button>
        ) : (
          <Button onClick={onStart} className="gap-2">
            <Play className="w-4 h-4" />
            Start {type === "sorting" ? "Sorting" : "Searching"}
          </Button>
        )}
      </div>
    </div>
  )
}
