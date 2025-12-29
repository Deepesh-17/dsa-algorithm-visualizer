export type SearchingAlgorithm = "linear" | "binary"

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

export const searchingAlgorithms: Record<SearchingAlgorithm, AlgorithmData> = {
  linear: {
    name: "Linear Search",
    description:
      "Sequentially checks each element of the list until a match is found or the whole list has been searched. Works on both sorted and unsorted arrays.",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
  },
  binary: {
    name: "Binary Search",
    description:
      "Repeatedly divides the search interval in half. If the target value is less than the middle element, search continues in the lower half; otherwise, it continues in the upper half. Requires a sorted array.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
  },
}
