export type SortingAlgorithm = "bubble" | "selection" | "insertion" | "merge" | "quick"

interface AlgorithmData {
  name: string
  description: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
}

export const sortingAlgorithms: Record<SortingAlgorithm, AlgorithmData> = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
  },
  selection: {
    name: "Selection Sort",
    description:
      "Divides the input list into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
  },
  insertion: {
    name: "Insertion Sort",
    description:
      "Builds the final sorted array one item at a time. It takes each element and inserts it into its correct position within the already-sorted portion of the array.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
  },
  merge: {
    name: "Merge Sort",
    description:
      "A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
  },
  quick: {
    name: "Quick Sort",
    description:
      "Selects a 'pivot' element and partitions the array around it, placing smaller elements before and larger elements after. It then recursively sorts the sub-arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
  },
}
