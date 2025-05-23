"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function RelationshipIndicator({ value, change = 0, isMobile = false }) {
  const [showChange, setShowChange] = useState(false)
  const [userExpanded, setUserExpanded] = useState(false)
  const [autoShowDetails, setAutoShowDetails] = useState(false)

  // 合并用户展开和自动展开的状态
  const expanded = userExpanded || autoShowDetails

  // 根据关系值确定颜色
  const getColor = (val) => {
    if (val < 30) return "text-red-500 bg-red-500"
    if (val < 60) return "text-yellow-500 bg-yellow-500"
    return "text-green-500 bg-green-500"
  }

  // 根据关系值确定描述
  const getDescription = (val) => {
    if (val < 20) return "敌对"
    if (val < 40) return "警惕"
    if (val < 60) return "中立"
    if (val < 80) return "友好"
    return "信任"
  }

  // 根据设备类型调整样式
  const getContainerStyle = () => {
    const baseStyle = "absolute right-4 flex flex-col items-end z-10"
    const topPosition = isMobile ? "top-14" : "top-16"
    return `${baseStyle} ${topPosition}`
  }

  // 当change值变化时，显示变化提示
  useEffect(() => {
    if (change !== 0) {
      setShowChange(true)
      const timer = setTimeout(() => {
        setShowChange(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [change])

  // 当关系值变化时，自动显示详细信息
  useEffect(() => {
    if (change !== 0) {
      setAutoShowDetails(true)
      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        setAutoShowDetails(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [change])

  // 提取颜色类名
  const colorClass = getColor(value).split(" ")[1]

  return (
    <motion.div
      className={getContainerStyle()}
      onHoverStart={() => setUserExpanded(true)}
      onHoverEnd={() => setUserExpanded(false)}
      onClick={() => setUserExpanded(!userExpanded)}
    >
      <div className="flex items-center mb-1">
        <span className="text-xs text-zinc-400 mr-2">关系:</span>
        <span className={`text-xs font-bold ${getColor(value).split(" ")[0]}`}>{getDescription(value)}</span>
      </div>

      <div className="relative">
        <div className="w-20 h-1.5 bg-zinc-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-zinc-800/30">
          <motion.div
            className={`h-full ${colorClass}/80`}
            initial={{ width: `${Math.max(0, value - Math.abs(change))}%` }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* 刻度线 */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-[1px] pointer-events-none opacity-60">
          <div className="w-[1px] h-3 bg-zinc-600 transform translate-y-[-4px]"></div>
          <div className="w-[1px] h-2 bg-zinc-700 transform translate-y-[-3px]"></div>
          <div className="w-[1px] h-3 bg-zinc-600 transform translate-y-[-4px]"></div>
        </div>
      </div>

      <AnimatePresence>
        {showChange && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-xs font-bold mt-1 ${change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-zinc-400"}`}
          >
            {change > 0 ? `+${change}` : change}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 展开的详细信息 */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 bg-zinc-900/80 backdrop-blur-sm p-2 rounded border border-zinc-800/50 text-xs"
          >
            <div className="flex justify-between mb-1">
              <span className="text-zinc-500">敌对</span>
              <span className="text-zinc-500">信任</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex">
                <div className="h-full bg-red-900/70" style={{ width: "20%" }}></div>
                <div className="h-full bg-yellow-900/70" style={{ width: "40%" }}></div>
                <div className="h-full bg-green-900/70" style={{ width: "40%" }}></div>
              </div>
              <div
                className="absolute top-0 h-full w-1 bg-white rounded-full"
                style={{ left: `calc(${value}% - 2px)` }}
              ></div>
            </div>
            <div className="text-center mt-1 text-zinc-400">
              当前值: <span className={getColor(value).split(" ")[0]}>{value}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
