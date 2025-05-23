"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, SkipForward } from "lucide-react"

export default function ChapterEndAnimation({ chapterNumber, chapterTitle, onContinue, onReplay }) {
  const [isVideoEnded, setIsVideoEnded] = useState(true) // 直接设为true，跳过视频播放
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    // 延迟显示按钮
    const timer = setTimeout(() => {
      setShowButtons(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 简化版本，不实际播放视频
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex flex-col">
        {/* 简化的章节结束显示 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-red-500 text-2xl font-bold mb-4">第 {chapterNumber} 章</div>
          <div className="text-white text-4xl font-bold mb-16 text-center px-4">{chapterTitle}</div>
          <div className="w-16 h-1 bg-red-900 rounded-full mb-8" />
        </div>

        {/* 底部控制区 */}
        {showButtons && (
          <div className="bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 p-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-center mb-2 text-red-500">第 {chapterNumber} 章完成</h2>
              <p className="text-zinc-400 text-center mb-6">「{chapterTitle}」</p>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={onContinue}
                  className="bg-red-900 hover:bg-red-800 text-white flex items-center justify-center"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  继续下一章
                </Button>

                <Button
                  onClick={onReplay}
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  重播动画
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
