"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface InfoFragmentCardProps {
  id: string
  title: string
  content: string
  imageUrl?: string
  onCollect: (id: string) => void
}

export default function InfoFragmentCard({
  id,
  title,
  content,
  imageUrl = "/placeholder.svg?key=zcaj2",
  onCollect,
}: InfoFragmentCardProps) {
  const [isCollecting, setIsCollecting] = useState(false)

  const handleCollect = () => {
    setIsCollecting(true)
    // 模拟收集动画
    setTimeout(() => {
      onCollect(id)
    }, 800)
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* 信息碎片图片 */}
        <div className="relative w-full h-48 bg-zinc-800 overflow-hidden">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
          <div className="absolute top-0 left-0 bg-red-900/80 text-xs text-white py-1 px-3 rounded-br-lg">信息碎片</div>
        </div>

        {/* 信息碎片内容 */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-red-500 mb-2">{title}</h3>
          <p className="text-sm text-zinc-300 mb-4 leading-relaxed">{content}</p>

          <AnimatePresence>
            {!isCollecting ? (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                <Button onClick={handleCollect} className="bg-red-900 hover:bg-red-800 text-white w-full">
                  收集碎片
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-10"
              >
                <span className="text-green-500 flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  正在收集...
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
