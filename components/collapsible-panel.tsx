"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import DeploymentGuide from "@/components/deployment-guide"
import useScreenSize from "@/hooks/use-screen-size"

export default function CollapsiblePanel() {
  const { isMobile, isTablet } = useScreenSize()
  // 默认折叠面板，只有在点击展开按钮后才显示
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative h-full flex flex-col">
      {/* 切换按钮 - 在面板折叠时显示在左侧，展开时显示在右侧 */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute top-4 z-20 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 ${
          isExpanded ? "-left-4" : "left-4"
        } transform -translate-x-full`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* 面板内容 */}
      <div
        className={`bg-zinc-950 border-l border-zinc-800 h-full transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      >
        {isExpanded && <DeploymentGuide />}
      </div>
    </div>
  )
}
