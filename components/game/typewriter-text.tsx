"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number // 打字速度 (ms/字符)
  delay?: number // 开始前的延迟 (ms)
  onComplete?: () => void // 打字完成后的回调
  className?: string
}

export default function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 重置状态
    setDisplayedText("")
    setIsComplete(false)

    // 清除任何现有的timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    let currentIndex = 0

    // 延迟开始
    timeoutRef.current = setTimeout(() => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
          timeoutRef.current = setTimeout(typeNextChar, speed)
        } else {
          setIsComplete(true)
          if (onComplete) {
            onComplete()
          }
        }
      }

      typeNextChar()
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, delay, onComplete])

  // 处理中文标点符号后的自然停顿
  const formattedText = displayedText.replace(/([，。！？；：、])/g, '<span class="typewriter-pause">$1</span>')

  return (
    <div className={className}>
      <span dangerouslySetInnerHTML={{ __html: formattedText }} />
      {!isComplete && <span className="inline-block w-1 h-4 ml-0.5 bg-red-500 animate-pulse align-middle"></span>}
    </div>
  )
}
