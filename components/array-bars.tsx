"use client"

interface ArrayBarsProps {
  array: number[]
  comparingIndices: number[]
  swappingIndices: number[]
  sortedIndices: number[]
}

export function ArrayBars({ array, comparingIndices, swappingIndices, sortedIndices }: ArrayBarsProps) {
  const maxValue = Math.max(...array, 100)

  const getBarColor = (index: number): string => {
    if (swappingIndices.includes(index)) {
      return "bg-[var(--swapping)]"
    }
    if (comparingIndices.includes(index)) {
      return "bg-[var(--comparing)]"
    }
    if (sortedIndices.includes(index)) {
      return "bg-[var(--sorted)]"
    }
    return "bg-muted-foreground/40"
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-end justify-center gap-[2px] h-[400px]" style={{ minHeight: "300px" }}>
        {array.map((value, index) => (
          <div
            key={index}
            className={`${getBarColor(index)} rounded-t transition-all duration-100 ease-in-out`}
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: `${Math.max(100 / array.length - 0.5, 2)}%`,
              minWidth: "3px",
              maxWidth: "40px",
            }}
            title={`Value: ${value}`}
          />
        ))}
      </div>
    </div>
  )
}
