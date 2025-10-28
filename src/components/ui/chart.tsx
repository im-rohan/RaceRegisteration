import * as React from "react"
import { cn } from "@/lib/utils"

// Stub chart components to avoid build errors
// These can be replaced with proper chart implementations if needed

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

// Stub components
const ChartTooltip = ({ children }: { children?: React.ReactNode }) => <>{children}</>
const ChartTooltipContent = React.forwardRef<HTMLDivElement, any>(() => null)
const ChartLegend = ({ children }: { children?: React.ReactNode }) => <>{children}</>
const ChartLegendContent = React.forwardRef<HTMLDivElement, any>(() => null)
const ChartStyle = () => null

ChartTooltipContent.displayName = "ChartTooltipContent"
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}