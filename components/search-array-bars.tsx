"use client"

interface SearchArrayBarsProps {
  array: number[]
  currentIndex: number | null
  foundIndex: number | null
  checkedIndices: number[]
  lowIndex: number | null
  highIndex: number | null
  isBinarySearch: boolean
}

export function SearchArrayBars({
  array,
  currentIndex,
  foundIndex,
  checkedIndices,
  lowIndex,
  highIndex,
  isBinarySearch,
}: SearchArrayBarsProps) {
  const maxValue = Math.max(...array, 100)

  const getBarColor = (index: number): string => {
    if (foundIndex === index) {
      return "bg-[var(--found)]"
    }
    if (currentIndex === index) {
      return "bg-[var(--current)]"
    }
    if (checkedIndices.includes(index)) {
      return "bg-muted"
    }
    return "bg-muted-foreground/40"
  }

  const isInRange = (index: number): boolean => {
    if (!isBinarySearch || lowIndex === null || highIndex === null) return false
    return index >= lowIndex && index <= highIndex
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-end justify-center gap-[2px] h-[400px]" style={{ minHeight: "300px" }}>
        {array.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
            style={{
              width: `${Math.max(100 / array.length - 0.5, 2)}%`,
              minWidth: "20px",
              maxWidth: "50px",
            }}
          >
            <span className="text-xs text-muted-foreground font-mono">{value}</span>
            <div
              className={`
                w-full rounded-t transition-all duration-150 ease-in-out
                ${getBarColor(index)}
                ${isInRange(index) && !foundIndex ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : ""}
              `}
              style={{
                height: `${(value / maxValue) * 80}%`,
                minHeight: "20px",
              }}
            />
            <span className="text-xs text-muted-foreground font-mono">{index}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
