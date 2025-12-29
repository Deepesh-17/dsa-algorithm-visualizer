"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ControlsPanel } from "@/components/controls-panel"
import { AlgorithmInfo } from "@/components/algorithm-info"
import { ArrayBars } from "@/components/array-bars"
import { sortingAlgorithms, type SortingAlgorithm } from "@/lib/sorting-algorithms"

export function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState(30)
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>("bubble")
  const [comparingIndices, setComparingIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const stopRef = useRef(false)

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 5)
    setArray(newArray)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
  }, [arraySize])

  // Initialize array on mount and when size changes
  useEffect(() => {
    generateArray()
  }, [generateArray])

  // Delay helper for animations
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // Get delay based on speed (inverse relationship)
  const getDelay = () => Math.max(5, 200 - speed * 2)

  // Stop the current animation
  const stopSorting = () => {
    stopRef.current = true
  }

  // Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return

        setComparingIndices([j, j + 1])
        await delay(getDelay())

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1])
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await delay(getDelay())
          setSwappingIndices([])
        }
      }
      setSortedIndices((prev) => [...prev, n - 1 - i])
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i))
    setComparingIndices([])
  }

  // Selection Sort
  const selectionSort = async () => {
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i

      for (let j = i + 1; j < n; j++) {
        if (stopRef.current) return

        setComparingIndices([minIdx, j])
        await delay(getDelay())

        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }

      if (minIdx !== i) {
        setSwappingIndices([i, minIdx])
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        setArray([...arr])
        await delay(getDelay())
        setSwappingIndices([])
      }

      setSortedIndices((prev) => [...prev, i])
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i))
    setComparingIndices([])
  }

  // Insertion Sort
  const insertionSort = async () => {
    const arr = [...array]
    const n = arr.length

    for (let i = 1; i < n; i++) {
      const key = arr[i]
      let j = i - 1

      setComparingIndices([i])
      await delay(getDelay())

      while (j >= 0 && arr[j] > key) {
        if (stopRef.current) return

        setSwappingIndices([j, j + 1])
        arr[j + 1] = arr[j]
        setArray([...arr])
        await delay(getDelay())
        setSwappingIndices([])
        j--
      }

      arr[j + 1] = key
      setArray([...arr])
    }

    setSortedIndices(Array.from({ length: n }, (_, i) => i))
    setComparingIndices([])
  }

  // Merge Sort
  const mergeSort = async () => {
    const arr = [...array]

    const merge = async (left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1)
      const rightArr = arr.slice(mid + 1, right + 1)

      let i = 0,
        j = 0,
        k = left

      while (i < leftArr.length && j < rightArr.length) {
        if (stopRef.current) return

        setComparingIndices([left + i, mid + 1 + j])
        await delay(getDelay())

        if (leftArr[i] <= rightArr[j]) {
          setSwappingIndices([k])
          arr[k] = leftArr[i]
          i++
        } else {
          setSwappingIndices([k])
          arr[k] = rightArr[j]
          j++
        }
        setArray([...arr])
        await delay(getDelay())
        setSwappingIndices([])
        k++
      }

      while (i < leftArr.length) {
        if (stopRef.current) return
        arr[k] = leftArr[i]
        setArray([...arr])
        await delay(getDelay())
        i++
        k++
      }

      while (j < rightArr.length) {
        if (stopRef.current) return
        arr[k] = rightArr[j]
        setArray([...arr])
        await delay(getDelay())
        j++
        k++
      }
    }

    const mergeSortHelper = async (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)
        await mergeSortHelper(left, mid)
        await mergeSortHelper(mid + 1, right)
        await merge(left, mid, right)
      }
    }

    await mergeSortHelper(0, arr.length - 1)
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i))
    setComparingIndices([])
  }

  // Quick Sort
  const quickSort = async () => {
    const arr = [...array]

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j < high; j++) {
        if (stopRef.current) return -1

        setComparingIndices([j, high])
        await delay(getDelay())

        if (arr[j] < pivot) {
          i++
          setSwappingIndices([i, j])
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          setArray([...arr])
          await delay(getDelay())
          setSwappingIndices([])
        }
      }

      setSwappingIndices([i + 1, high])
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setArray([...arr])
      await delay(getDelay())
      setSwappingIndices([])

      setSortedIndices((prev) => [...prev, i + 1])
      return i + 1
    }

    const quickSortHelper = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high)
        if (pi === -1) return
        await quickSortHelper(low, pi - 1)
        await quickSortHelper(pi + 1, high)
      }
    }

    await quickSortHelper(0, arr.length - 1)
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i))
    setComparingIndices([])
  }

  // Start sorting based on selected algorithm
  const startSorting = async () => {
    setIsRunning(true)
    stopRef.current = false
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])

    const algorithms = {
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort,
    }

    await algorithms[selectedAlgorithm]()
    setIsRunning(false)
  }

  const handleStop = () => {
    stopSorting()
    setIsRunning(false)
    setComparingIndices([])
    setSwappingIndices([])
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ControlsPanel
            type="sorting"
            algorithms={Object.keys(sortingAlgorithms) as SortingAlgorithm[]}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={(alg) => setSelectedAlgorithm(alg as SortingAlgorithm)}
            arraySize={arraySize}
            onArraySizeChange={setArraySize}
            speed={speed}
            onSpeedChange={setSpeed}
            isRunning={isRunning}
            onStart={startSorting}
            onStop={handleStop}
            onGenerateArray={generateArray}
          />
        </div>
        <div>
          <AlgorithmInfo type="sorting" algorithm={selectedAlgorithm} />
        </div>
      </div>

      <ArrayBars
        array={array}
        comparingIndices={comparingIndices}
        swappingIndices={swappingIndices}
        sortedIndices={sortedIndices}
      />

      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--comparing)]" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--swapping)]" />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--sorted)]" />
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
    </div>
  )
}
