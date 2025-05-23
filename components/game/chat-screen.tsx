"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import RelationshipIndicator from "./relationship-indicator"
import BackgroundEffects from "./background-effects"
import TypewriterText from "./typewriter-text"

export default function ChatScreen({
  messages,
  choices,
  onSelectChoice,
  relationship,
  relationshipChange,
  isMobile,
  onSecretDoorOpen,
}) {
  const messagesEndRef = useRef(null)
  const messageContainerRef = useRef(null)
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)
  const [completedMessages, setCompletedMessages] = useState<Set<string>>(new Set())

  // 暗门逻辑：记录点击次数和时间
  const [secretClickCount, setSecretClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  // 当新消息到达时，标记为正在输入
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (!completedMessages.has(lastMessage.id) && lastMessage.type !== "system") {
        setTypingMessageId(lastMessage.id)
      }
    }
  }, [messages, completedMessages])

  // 消息完成打字效果后的处理
  const handleMessageComplete = (messageId: string) => {
    setCompletedMessages((prev) => new Set([...prev, messageId]))
    setTypingMessageId(null)
  }

  // 修改滚动逻辑，确保只在消息容器内滚动
  useEffect(() => {
    if (!typingMessageId && messagesEndRef.current && messageContainerRef.current) {
      // 使用容器内部滚动，而不是scrollIntoView
      const container = messageContainerRef.current

      // 平滑滚动到底部
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, typingMessageId])

  // 处理暗门点击
  const handleSecretClick = () => {
    const now = Date.now()

    // 如果距离上次点击小于1.5秒，视为连续点击
    if (now - lastClickTime < 1500) {
      const newCount = secretClickCount + 1
      setSecretClickCount(newCount)

      // 连续点击两次，触发暗门
      if (newCount >= 2) {
        setSecretClickCount(0) // 重置计数
        if (onSecretDoorOpen) {
          onSecretDoorOpen()
        }
      }
    } else {
      // 重置计数
      setSecretClickCount(1)
    }

    setLastClickTime(now)
  }

  // 根据设备类型调整样式
  const getStatusBarStyle = () => {
    return isMobile ? "py-3 px-4" : "p-4"
  }

  const getMessageAreaStyle = () => {
    const baseStyle = "flex-1 overflow-y-auto p-4 pt-10 space-y-4 scroll-smooth"
    const paddingBottom = choices && choices.length > 0 ? "pb-48" : ""
    return `${baseStyle} ${paddingBottom}`
  }

  const getChoiceButtonStyle = (index) => {
    const baseStyle = "w-full justify-start text-left border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 text-sm"
    const padding = isMobile ? "py-2.5" : "py-3"
    return `${baseStyle} ${padding}`
  }

  // 判断是否应该显示选择按钮
  const shouldShowChoices = !typingMessageId && choices && choices.length > 0

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-black to-zinc-950 relative">
      {/* 复用欢迎页面的背景效果 */}
      <BackgroundEffects />

      {/* 顶部状态栏 */}
      <div
        className={`${getStatusBarStyle()} border-b border-zinc-800 flex items-center justify-between z-10 backdrop-blur-sm bg-black/30`}
      >
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
          <span className="text-red-500 text-sm font-mono">红岸基地</span>
        </div>
        {/* 暗门入口 */}
        <div
          className="text-zinc-500 text-xs cursor-pointer hover:text-zinc-400 transition-colors flex items-center"
          onClick={handleSecretClick}
        >
          <span className="mr-1">通讯已加密</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>

      {/* 关系值指示器 */}
      <RelationshipIndicator value={relationship} change={relationshipChange} isMobile={isMobile} />

      {/* 消息区域 - 添加ref以便控制滚动 */}
      <div ref={messageContainerRef} className={getMessageAreaStyle()}>
        {messages.map((message) => {
          const isTyping = message.id === typingMessageId
          const isCompleted = completedMessages.has(message.id)

          if (message.type === "system") {
            return (
              <div key={message.id} className="flex justify-center my-2 message-fade-in">
                <div className="bg-zinc-900/80 backdrop-blur-sm text-zinc-500 text-xs py-1 px-3 rounded-full border border-zinc-800/50">
                  {message.content}
                </div>
              </div>
            )
          } else if (message.type === "received") {
            return (
              <div key={message.id} className="flex flex-col max-w-[80%] message-fade-in">
                <div className="bg-zinc-800/80 backdrop-blur-sm text-zinc-200 p-3 rounded-lg rounded-tl-none border-l border-t border-zinc-700/50 shadow-lg relative">
                  {/* 科幻装饰元素 */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-900/80 rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-900/80 rounded-full"></div>

                  {isTyping || !isCompleted ? (
                    <TypewriterText
                      text={message.content}
                      speed={40}
                      onComplete={() => handleMessageComplete(message.id)}
                    />
                  ) : (
                    <span>{message.content}</span>
                  )}
                </div>
                <span className="text-zinc-600 text-xs mt-1 ml-1 flex items-center">
                  <span className="text-red-500 mr-1">叶文洁</span> ·
                  <span className="ml-1">
                    {formatDistanceToNow(new Date(message.timestamp), {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </span>
                </span>
              </div>
            )
          } else {
            return (
              <div key={message.id} className="flex flex-col items-end ml-auto max-w-[80%] message-fade-in">
                <div className="bg-red-900/70 backdrop-blur-sm text-zinc-100 p-3 rounded-lg rounded-tr-none border-r border-t border-red-700/30 shadow-lg relative">
                  {/* 科幻装饰元素 */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500/80 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500/80 rounded-full"></div>

                  {isTyping || !isCompleted ? (
                    <TypewriterText
                      text={message.content}
                      speed={30}
                      onComplete={() => handleMessageComplete(message.id)}
                    />
                  ) : (
                    <span>{message.content}</span>
                  )}
                </div>
                <span className="text-zinc-600 text-xs mt-1 mr-1 flex items-center justify-end">
                  <span className="text-zinc-400">你</span> ·
                  <span className="ml-1">
                    {formatDistanceToNow(new Date(message.timestamp), {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </span>
                </span>
              </div>
            )
          }
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 选择区域 - 只在当前消息打字完成后显示 */}
      {shouldShowChoices && (
        <div className="p-4 border-t border-zinc-800 space-y-2 absolute bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-sm z-10">
          {choices.map((choice, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${getChoiceButtonStyle(index)} transition-all duration-200 hover:scale-[1.01] hover:border-red-900/50`}
              onClick={(e) => {
                // 阻止事件冒泡，防止影响外部
                e.stopPropagation()
                onSelectChoice(index)
              }}
            >
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 min-w-[1.25rem] border border-red-900/50 rounded-full text-xs mr-2">
                  <span className="text-red-500 font-mono">{index + 1}</span>
                </div>
                <span className="flex-1">{choice.text}</span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
