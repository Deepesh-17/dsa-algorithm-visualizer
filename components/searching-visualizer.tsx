"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ControlsPanel } from "@/components/controls-panel"
import { AlgorithmInfo } from "@/components/algorithm-info"
import { SearchArrayBars } from "@/components/search-array-bars"
import { searchingAlgorithms, type SearchingAlgorithm } from "@/lib/searching-algorithms"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from "lucide-react"

export function SearchingVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState(20)
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SearchingAlgorithm>("linear")
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [checkedIndices, setCheckedIndices] = useState<number[]>([])
  const [searchTarget, setSearchTarget] = useState<number>(50)
  const [searchResult, setSearchResult] = useState<"found" | "not-found" | null>(null)
  const [lowIndex, setLowIndex] = useState<number | null>(null)
  const [highIndex, setHighIndex] = useState<number | null>(null)
  const stopRef = useRef(false)

  // Generate sorted array for binary search or random for linear
  const generateArray = useCallback(() => {
    let newArray: number[]

    if (selectedAlgorithm === "binary") {
      // Generate sorted array for binary search
      newArray = Array.from(
        { length: arraySize },
        (_, i) => Math.floor((i / arraySize) * 100) + Math.floor(Math.random() * 5),
      ).sort((a, b) => a - b)
    } else {
      // Generate random array for linear search
      newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)
    }

    setArray(newArray)
    setCurrentIndex(null)
    setFoundIndex(null)
    setCheckedIndices([])
    setSearchResult(null)
    setLowIndex(null)
    setHighIndex(null)
  }, [arraySize, selectedAlgorithm])

  // Initialize array on mount and when size/algorithm changes
  useEffect(() => {
    generateArray()
  }, [generateArray])

  // Delay helper for animations
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // Get delay based on speed
  const getDelay = () => Math.max(50, 500 - speed * 5)

  // Stop the current animation
  const stopSearching = () => {
    stopRef.current = true
  }

  // Linear Search
  const linearSearch = async () => {
    for (let i = 0; i < array.length; i++) {
      if (stopRef.current) return

      setCurrentIndex(i)
      setCheckedIndices((prev) => [...prev, i])
      await delay(getDelay())

      if (array[i] === searchTarget) {
        setFoundIndex(i)
        setSearchResult("found")
        return
      }
    }
    setSearchResult("not-found")
    setCurrentIndex(null)
  }

  // Binary Search
  const binarySearch = async () => {
    let low = 0
    let high = array.length - 1

    while (low <= high) {
      if (stopRef.current) return

      setLowIndex(low)
      setHighIndex(high)

      const mid = Math.floor((low + high) / 2)
      setCurrentIndex(mid)
      setCheckedIndices((prev) => [...prev, mid])
      await delay(getDelay())

      if (array[mid] === searchTarget) {
        setFoundIndex(mid)
        setSearchResult("found")
        return
      } else if (array[mid] < searchTarget) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    setSearchResult("not-found")
    setCurrentIndex(null)
    setLowIndex(null)
    setHighIndex(null)
  }

  // Start searching based on selected algorithm
  const startSearching = async () => {
    setIsRunning(true)
    stopRef.current = false
    setCurrentIndex(null)
    setFoundIndex(null)
    setCheckedIndices([])
    setSearchResult(null)
    setLowIndex(null)
    setHighIndex(null)

    if (selectedAlgorithm === "linear") {
      await linearSearch()
    } else {
      await binarySearch()
    }

    setIsRunning(false)
  }

  const handleStop = () => {
    stopSearching()
    setIsRunning(false)
    setCurrentIndex(null)
  }

  const handleAlgorithmChange = (alg: string) => {
    setSelectedAlgorithm(alg as SearchingAlgorithm)
    setSearchResult(null)
    setFoundIndex(null)
    setCheckedIndices([])
    setCurrentIndex(null)
    setLowIndex(null)
    setHighIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ControlsPanel
            type="searching"
            algorithms={Object.keys(searchingAlgorithms) as SearchingAlgorithm[]}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={handleAlgorithmChange}
            arraySize={arraySize}
            onArraySizeChange={setArraySize}
            speed={speed}
            onSpeedChange={setSpeed}
            isRunning={isRunning}
            onStart={startSearching}
            onStop={handleStop}
            onGenerateArray={generateArray}
          />

          <div className="bg-card border border-border rounded-lg p-4">
            <Label htmlFor="search-target" className="text-sm font-medium text-foreground">
              Search Target Value
            </Label>
            <Input
              id="search-target"
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(Number(e.target.value))}
              disabled={isRunning}
              className="mt-2 max-w-[200px]"
              min={1}
              max={100}
            />
          </div>
        </div>
        <div>
          <AlgorithmInfo type="searching" algorithm={selectedAlgorithm} />
        </div>
      </div>

      <SearchArrayBars
        array={array}
        currentIndex={currentIndex}
        foundIndex={foundIndex}
        checkedIndices={checkedIndices}
        lowIndex={lowIndex}
        highIndex={highIndex}
        isBinarySearch={selectedAlgorithm === "binary"}
      />

      {/* Search Result */}
      {searchResult && (
        <div
          className={`flex items-center justify-center gap-3 p-4 rounded-lg border ${
            searchResult === "found"
              ? "bg-[var(--found)]/10 border-[var(--found)] text-[var(--found)]"
              : "bg-destructive/10 border-destructive text-destructive"
          }`}
        >
          {searchResult === "found" ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">
                Found {searchTarget} at index {foundIndex}!
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              <span className="font-medium">{searchTarget} not found in the array</span>
            </>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--current)]" />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-muted-foreground">Checked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--found)]" />
          <span className="text-muted-foreground">Found</span>
        </div>
        {selectedAlgorithm === "binary" && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-primary bg-transparent" />
            <span className="text-muted-foreground">Search Range</span>
          </div>
        )}
      </div>
    </div>
  )
}
