"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import BackgroundEffects from "./background-effects"

interface GameOverScreenProps {
  reason: string
  onRestart: () => void
}

export default function GameOverScreen({ reason, onRestart }: GameOverScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
      {/* 背景效果 */}
      <BackgroundEffects />

      {/* 红色噪点叠加 */}
      <div className="absolute inset-0 bg-red-900/20"></div>

      {/* 闪烁效果 */}
      <motion.div
        className="absolute inset-0 bg-red-900/30"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-red-500 mb-2">通讯中断</h1>
          <div className="w-16 h-1 bg-red-800 mx-auto mb-6"></div>

          <div className="bg-zinc-900/60 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 mb-8 max-w-md">
            <p className="text-zinc-300 mb-4">{reason}</p>
            <p className="text-zinc-400 text-sm">
              叶文洁已切断与你的连接。你的行为引起了她的强烈不信任，无法继续对话。
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <Button onClick={onRestart} className="bg-red-900 hover:bg-red-800 text-white border-none">
              重新开始
            </Button>
          </div>
        </motion.div>
      </div>

      {/* 底部信息 */}
      <div className="p-4 text-center">
        <p className="text-zinc-600 text-xs">红岸回声 · 游戏结束</p>
      </div>
    </div>
  )
}
