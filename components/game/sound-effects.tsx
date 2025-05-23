"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// 音效类型
type SoundType = "message" | "choice" | "system" | "relationship"

// 音效管理器
export default function useSoundEffects() {
  // 音效引用
  const sounds = useRef<Record<SoundType, HTMLAudioElement | null>>({
    message: null,
    choice: null,
    system: null,
    relationship: null,
  })

  // 音效是否已加载
  const [soundsLoaded, setSoundsLoaded] = useState(false)

  // 初始化音效
  useEffect(() => {
    // 只在客户端执行
    if (typeof window === "undefined") return

    // 创建音效元素但不立即设置src
    const audioElements: Record<SoundType, HTMLAudioElement> = {
      message: new Audio(),
      choice: new Audio(),
      system: new Audio(),
      relationship: new Audio(),
    }

    // 设置音量
    Object.values(audioElements).forEach((sound) => {
      if (sound) {
        sound.volume = 0.3
      }
    })

    // 在组件挂载后再设置音频源
    setTimeout(() => {
      try {
        audioElements.message.src = "/sounds/message.mp3"
        audioElements.choice.src = "/sounds/choice.mp3"
        audioElements.system.src = "/sounds/system.mp3"
        audioElements.relationship.src = "/sounds/relationship.mp3"

        sounds.current = audioElements
        setSoundsLoaded(true)
      } catch (error) {
        console.error("加载音效失败:", error)
      }
    }, 1000)

    // 清理函数
    return () => {
      Object.values(sounds.current).forEach((sound) => {
        if (sound) {
          sound.pause()
          sound.src = ""
        }
      })
    }
  }, [])

  // 播放音效
  const playSound = useCallback(
    (type: SoundType) => {
      if (!soundsLoaded) {
        console.log(`播放音效: ${type}`)
        return
      }

      const sound = sounds.current[type]
      if (sound) {
        // 创建一个新的Audio实例来播放，避免重叠问题
        const tempAudio = new Audio(sound.src)
        tempAudio.volume = sound.volume

        // 使用Promise处理播放
        const playPromise = tempAudio.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // 忽略自动播放策略错误
            console.log(`音效 ${type} 播放失败:`, error.message)
          })
        }
      }
    },
    [soundsLoaded],
  )

  return { playSound }
}
