"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import useScreenSize from "@/hooks/use-screen-size"
import ThreeBodyAnimation from "./three-body-animation"
import BackgroundEffects from "./background-effects"

export default function WelcomeScreen({ onStart }) {
  const { isMobile } = useScreenSize()
  const [displayedText, setDisplayedText] = useState("")
  const [showButton, setShowButton] = useState(false)
  const [showAuthor, setShowAuthor] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const timeoutRef = useRef(null)

  // 名言
  const quote = "我点燃了火，却控制不了它。"

  // 使用简单的打字效果，只执行一次
  useEffect(() => {
    let currentIndex = 0

    const typeNextChar = () => {
      if (currentIndex < quote.length) {
        setDisplayedText(quote.substring(0, currentIndex + 1))
        currentIndex++
        timeoutRef.current = setTimeout(typeNextChar, 150)
      } else {
        // 打字效果完成后，显示作者和按钮
        setTimeout(() => {
          setShowAuthor(true)
          setTimeout(() => {
            setShowSubtitle(true)
            setTimeout(() => {
              setShowButton(true)
              // 延迟显示动画，减少初始加载压力
              setTimeout(() => setShowAnimation(true), 1000)
            }, 500)
          }, 500)
        }, 500)
      }
    }

    // 延迟开始打字效果
    timeoutRef.current = setTimeout(typeNextChar, 1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, []) // 空依赖数组确保效果只运行一次

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
      {/* 背景效果 */}
      <BackgroundEffects />

      {/* 信号发射效果 - 简化版 */}
      <div className="absolute left-1/2 top-[15%] -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full z-10">
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
      </div>

      {/* 主要内容 - 整体下移 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 pt-24">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* 顶部标题 */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 tracking-wider">红岸回声</h1>

            {showSubtitle && <p className="mt-2 text-zinc-500 text-sm">一场跨越时空的对话</p>}
          </div>

          {/* 顶部红线 */}
          <div className="w-16 h-[2px] bg-red-700 mb-8"></div>

          {/* 名言 - 使用简单的打字效果 */}
          <div className="mb-12 relative">
            {/* 装饰性引号 */}
            <div className="absolute -left-6 -top-6 text-4xl text-red-900/40">"</div>
            <div className="absolute -right-6 -bottom-6 text-4xl text-red-900/40">"</div>

            <h2 className="text-2xl md:text-3xl font-light text-zinc-100 leading-relaxed tracking-wide">
              <span className="text-red-500 font-normal">"</span>
              {displayedText}
              {displayedText.length < quote.length && (
                <span className="inline-block w-1 h-6 ml-1 bg-red-500 animate-pulse"></span>
              )}
              <span className="text-red-500 font-normal">"</span>
            </h2>
            <p className={`text-right text-zinc-500 text-sm mt-4 ${showAuthor ? "opacity-100" : "opacity-0"}`}>
              — 叶文洁
            </p>
          </div>

          {/* 按钮 */}
          <div className={`w-full ${showButton ? "opacity-100" : "opacity-0"}`}>
            <Button
              onClick={onStart}
              className="w-full bg-red-900/80 hover:bg-red-800 text-white border-none backdrop-blur-sm relative"
              disabled={!showButton}
            >
              <span className="relative z-10">开始游戏</span>
              <span className="absolute top-0 left-0 w-full h-[1px] bg-red-500/30"></span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/30"></span>
            </Button>
          </div>

          {/* 三体动画 - 减少与底部的距离，只在需要时显示 */}
          {showButton && showAnimation && (
            <div className="mt-8">
              <ThreeBodyAnimation />
            </div>
          )}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="p-4 text-center">
        <p className="text-zinc-600 text-xs">红岸回声 · 基于《三体》宇宙</p>
      </div>
    </div>
  )
}
