"use client"

import { useState, useEffect } from "react"
import { gameData } from "@/lib/game-data"
import WelcomeScreen from "./game/welcome-screen"
import ChatScreenWithSound from "./game/chat-screen-with-sound"
import InfoFragmentCard from "./game/info-fragment-card"
import MemoryAttic from "./game/memory-attic"
import useScreenSize from "@/hooks/use-screen-size"
import ChapterEndAnimation from "./game/chapter-end-animation"
import GameOverScreen from "./game/game-over-screen"

// 信息碎片类型定义
interface InfoFragment {
  id: string
  title: string
  content: string
  imageUrl?: string
  unlockCondition?: {
    chapter: number
    messageId: string
    relationship?: number
  }
}

export default function PhoneSimulator({ onSecretDoorOpen }) {
  // 确保所有钩子都在组件顶层调用，不受条件语句影响
  const [isClient, setIsClient] = useState(false)
  const { isMobile, width } = useScreenSize()

  const [gameState, setGameState] = useState({
    screen: "welcome", // welcome, chat, gameover
    currentChapter: 0,
    currentMessageIndex: 0,
    messages: [],
    choices: [],
    relationship: 50, // 0-100 信任度
    relationshipChange: 0, // 最近一次关系值变化
    unlockedInfo: [], // 解锁的信息碎片ID
    collectedInfo: [], // 已收集的信息碎片ID
    gameOverReason: "", // 游戏结束原因
  })

  // 信息碎片状态
  const [showInfoFragment, setShowInfoFragment] = useState(false)
  const [currentInfoFragment, setCurrentInfoFragment] = useState<InfoFragment | null>(null)
  const [showMemoryAttic, setShowMemoryAttic] = useState(false)

  // 新增：是否是首次收集信息碎片
  const [isFirstCollection, setIsFirstCollection] = useState(false)

  // 开发模式 - 简化判断
  const isDevelopment = true

  // 获取已收集的信息碎片完整数据
  const collectedFragments = gameData.infoFragments
    ? gameData.infoFragments.filter((fragment) => gameState.collectedInfo.includes(fragment.id))
    : []

  // 章节结束动画状态
  const [showChapterEndAnimation, setShowChapterEndAnimation] = useState(false)
  const [currentChapterForAnimation, setCurrentChapterForAnimation] = useState(1)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 检查是否有新的信息碎片解锁 - 简化逻辑
  useEffect(() => {
    if (!gameData.infoFragments || gameState.messages.length === 0) return

    const lastMessage = gameState.messages[gameState.messages.length - 1]
    if (!lastMessage || lastMessage.type !== "received") return

    // 检查是否有符合条件的信息碎片
    const unlockedFragment = gameData.infoFragments.find((fragment) => {
      if (gameState.unlockedInfo.includes(fragment.id)) return false

      const condition = fragment.unlockCondition
      if (!condition) return false

      return (
        condition.chapter === gameState.currentChapter + 1 &&
        lastMessage.id.includes(condition.messageId) &&
        (!condition.relationship || gameState.relationship >= condition.relationship)
      )
    })

    if (unlockedFragment) {
      setGameState((prev) => ({
        ...prev,
        unlockedInfo: [...prev.unlockedInfo, unlockedFragment.id],
      }))

      setCurrentInfoFragment(unlockedFragment)
      setShowInfoFragment(true)
    }
  }, [gameState.messages, gameState.currentChapter, gameState.relationship, gameState.unlockedInfo])

  // 根据屏幕尺寸计算手机模拟器的尺寸 - 简化计算
  const getPhoneSize = () => {
    if (!isClient || isMobile) {
      return isMobile
        ? { width: "100%", height: "100%", borderRadius: "0", border: "none" }
        : { width: "375px", height: "812px", borderRadius: "60px", border: "8px solid #27272a" }
    }

    // 在桌面设备上，使用固定尺寸
    const maxWidth = Math.min(375, width * 0.9)
    const height = (812 * maxWidth) / 375

    return {
      width: `${maxWidth}px`,
      height: `${height}px`,
      borderRadius: "60px",
      border: "8px solid #27272a",
    }
  }

  const phoneSize = getPhoneSize()

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      screen: "chat",
      messages: [
        {
          id: "system-1",
          type: "system",
          content: "建立连接中...",
          timestamp: new Date().toISOString(),
        },
        {
          id: "system-2",
          type: "system",
          content: "信号检测到，尝试连接...",
          timestamp: new Date(Date.now() + 1000).toISOString(),
        },
      ],
    }))

    // 模拟延迟后发送第一条消息
    setTimeout(() => {
      const firstMessage = gameData.chapters[0].messages[0]
      setGameState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: `ye-${Date.now()}`,
            type: "received",
            content: firstMessage.content,
            timestamp: new Date().toISOString(),
          },
        ],
        choices: firstMessage.choices || [],
      }))
    }, 2000)
  }

  // 重新开始游戏
  const restartGame = () => {
    setGameState({
      screen: "welcome",
      currentChapter: 0,
      currentMessageIndex: 0,
      messages: [],
      choices: [],
      relationship: 50,
      relationshipChange: 0,
      unlockedInfo: [],
      collectedInfo: [],
      gameOverReason: "",
    })
  }

  const handleChoice = (choiceIndex) => {
    const currentChapter = gameData.chapters[gameState.currentChapter]
    const currentMessage = currentChapter.messages[gameState.currentMessageIndex]
    const selectedChoice = currentMessage.choices[choiceIndex]
    const relationshipChange = selectedChoice.relationshipChange || 0

    // 计算新的关系值
    const newRelationship = Math.max(0, Math.min(100, gameState.relationship + relationshipChange))

    // 添加玩家的选择到消息列表
    setGameState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: `player-${Date.now()}`,
          type: "sent",
          content: selectedChoice.text,
          timestamp: new Date().toISOString(),
        },
      ],
      choices: [],
      relationship: newRelationship,
      relationshipChange: relationshipChange,
    }))

    // 检查关系值是否降到0，如果是则触发游戏结束
    if (newRelationship <= 0) {
      setTimeout(() => {
        // 添加叶文洁的愤怒回应
        setGameState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: `ye-angry-${Date.now()}`,
              type: "received",
              content: "你的言行让我无法容忍！我不会再和你交流了。",
              timestamp: new Date().toISOString(),
            },
            {
              id: `system-disconnect`,
              type: "system",
              content: "叶文洁切断了连接...",
              timestamp: new Date(Date.now() + 1000).toISOString(),
            },
          ],
        }))

        // 延迟显示游戏结束画面
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            screen: "gameover",
            gameOverReason: "你的言行引起了叶文洁的强烈不信任，她决定切断与你的联系。",
          }))
        }, 3000)
      }, 1500)

      return
    }

    // 模拟延迟后发送回复
    setTimeout(() => {
      // 如果有特定回复，使用它
      if (selectedChoice.response) {
        setGameState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: `ye-${Date.now()}`,
              type: "received",
              content: selectedChoice.response,
              timestamp: new Date().toISOString(),
            },
          ],
        }))
      }

      // 延迟后进入下一条消息
      setTimeout(() => {
        const nextMessageIndex = gameState.currentMessageIndex + 1

        if (nextMessageIndex < currentChapter.messages.length) {
          const nextMessage = currentChapter.messages[nextMessageIndex]

          setGameState((prev) => ({
            ...prev,
            currentMessageIndex: nextMessageIndex,
            messages: [
              ...prev.messages,
              {
                id: `ye-${Date.now()}`,
                type: "received",
                content: nextMessage.content,
                timestamp: new Date().toISOString(),
              },
            ],
            choices: nextMessage.choices || [],
            relationshipChange: 0,
          }))
        } else if (gameState.currentChapter + 1 < gameData.chapters.length) {
          // 进入下一章
          const nextChapter = gameData.chapters[gameState.currentChapter + 1]
          const firstMessage = nextChapter.messages[0]

          setGameState((prev) => ({
            ...prev,
            currentChapter: prev.currentChapter + 1,
            currentMessageIndex: 0,
            messages: [
              ...prev.messages,
              {
                id: `system-chapter`,
                type: "system",
                content: `第${gameState.currentChapter + 2}章：${nextChapter.title}`,
                timestamp: new Date().toISOString(),
              },
              {
                id: `ye-${Date.now()}`,
                type: "received",
                content: firstMessage.content,
                timestamp: new Date().toISOString(),
              },
            ],
            choices: firstMessage.choices || [],
            relationshipChange: 0,
          }))
        } else {
          // 游戏结束
          setGameState((prev) => ({
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: `system-end`,
                type: "system",
                content: "通讯中断...",
                timestamp: new Date().toISOString(),
              },
              {
                id: `system-end-2`,
                type: "system",
                content: "游戏结束",
                timestamp: new Date(Date.now() + 1000).toISOString(),
              },
            ],
            choices: [],
            relationshipChange: 0,
          }))
        }
      }, 3000)
    }, 1500)
  }

  // 处理信息碎片收集
  const handleCollectInfoFragment = (id) => {
    // 检查是否是首次收集
    const isFirst = gameState.collectedInfo.length === 0

    setGameState((prev) => ({
      ...prev,
      collectedInfo: [...prev.collectedInfo, id],
    }))

    // 如果是首次收集，设置标志
    if (isFirst) {
      setIsFirstCollection(true)
    }

    // 延迟关闭信息碎片卡片
    setTimeout(() => {
      setShowInfoFragment(false)
      setCurrentInfoFragment(null)
    }, 500)
  }

  // 打开记忆阁楼
  const handleOpenMemoryAttic = () => {
    setShowMemoryAttic(true)
  }

  // 测试信息碎片功能
  const handleTestInfoFragment = () => {
    if (gameData.infoFragments && gameData.infoFragments.length > 0) {
      const randomIndex = Math.floor(Math.random() * gameData.infoFragments.length)
      const testFragment = gameData.infoFragments[randomIndex]

      setCurrentInfoFragment(testFragment)
      setShowInfoFragment(true)
    }
  }

  // 处理触发章节结束动画
  const handleTriggerChapterEnd = () => {
    setCurrentChapterForAnimation(gameState.currentChapter + 1)
    setShowChapterEndAnimation(true)
  }

  // 测试游戏结束功能
  const handleTestGameOver = () => {
    setGameState((prev) => ({
      ...prev,
      screen: "gameover",
      gameOverReason: "测试游戏结束功能：关系值降至0，叶文洁切断了与你的联系。",
    }))
  }

  // 处理继续到下一章
  const handleContinueToNextChapter = () => {
    setShowChapterEndAnimation(false)
  }

  // 处理重播动画
  const handleReplayAnimation = () => {
    // 简化的重播逻辑
  }

  // 如果不在客户端，显示占位符
  if (!isClient) {
    return (
      <div
        className="relative bg-black overflow-hidden shadow-2xl flex items-center justify-center"
        style={{
          width: "375px",
          height: "812px",
          borderRadius: "60px",
          border: "8px solid #27272a",
        }}
      >
        <div className="text-zinc-600">加载中...</div>
      </div>
    )
  }

  // 在移动设备上，直接显示游戏内容，没有外框
  if (isMobile) {
    return (
      <div className="w-full h-screen fixed inset-0 bg-zinc-900 overflow-hidden phone-simulator-content">
        {gameState.screen === "welcome" && <WelcomeScreen onStart={startGame} />}

        {gameState.screen === "chat" && (
          <ChatScreenWithSound
            messages={gameState.messages}
            choices={gameState.choices}
            onSelectChoice={handleChoice}
            relationship={gameState.relationship}
            relationshipChange={gameState.relationshipChange}
            isMobile={isMobile}
            onSecretDoorOpen={onSecretDoorOpen}
            onOpenMemoryAttic={handleOpenMemoryAttic}
            collectedInfoCount={gameState.collectedInfo.length}
            onTestInfoFragment={isDevelopment ? handleTestInfoFragment : null}
            isFirstCollection={isFirstCollection}
            onTriggerChapterEnd={isDevelopment ? handleTriggerChapterEnd : null}
          />
        )}

        {gameState.screen === "gameover" && (
          <GameOverScreen reason={gameState.gameOverReason} onRestart={restartGame} />
        )}

        {/* 信息碎片卡片 */}
        {showInfoFragment && currentInfoFragment && (
          <InfoFragmentCard
            id={currentInfoFragment.id}
            title={currentInfoFragment.title}
            content={currentInfoFragment.content}
            imageUrl={currentInfoFragment.imageUrl}
            onCollect={handleCollectInfoFragment}
          />
        )}

        {/* 记忆阁楼 */}
        {showMemoryAttic && <MemoryAttic fragments={collectedFragments} onClose={() => setShowMemoryAttic(false)} />}

        {/* 章节结束动画 */}
        {showChapterEndAnimation && (
          <ChapterEndAnimation
            chapterNumber={currentChapterForAnimation}
            chapterTitle={gameData.chapters[currentChapterForAnimation - 1]?.title || "章节结束"}
            onContinue={handleContinueToNextChapter}
            onReplay={handleReplayAnimation}
          />
        )}
      </div>
    )
  }

  // 在桌面设备上，显示带外框的手机模拟器
  return (
    <div
      className="relative bg-black overflow-hidden shadow-2xl"
      style={{
        width: phoneSize.width,
        height: phoneSize.height,
        borderRadius: phoneSize.borderRadius,
        border: phoneSize.border,
      }}
    >
      {/* 顶部刘海 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-[30px] bg-black rounded-b-[20px] z-20"></div>

      {/* 屏幕 */}
      <div className="relative w-full h-full bg-zinc-900 overflow-hidden phone-simulator-content">
        {gameState.screen === "welcome" && <WelcomeScreen onStart={startGame} />}

        {gameState.screen === "chat" && (
          <ChatScreenWithSound
            messages={gameState.messages}
            choices={gameState.choices}
            onSelectChoice={handleChoice}
            relationship={gameState.relationship}
            relationshipChange={gameState.relationshipChange}
            isMobile={isMobile}
            onSecretDoorOpen={onSecretDoorOpen}
            onOpenMemoryAttic={handleOpenMemoryAttic}
            collectedInfoCount={gameState.collectedInfo.length}
            onTestInfoFragment={isDevelopment ? handleTestInfoFragment : null}
            isFirstCollection={isFirstCollection}
            onTriggerChapterEnd={isDevelopment ? handleTriggerChapterEnd : null}
          />
        )}

        {gameState.screen === "gameover" && (
          <GameOverScreen reason={gameState.gameOverReason} onRestart={restartGame} />
        )}

        {/* 信息碎片卡片 */}
        {showInfoFragment && currentInfoFragment && (
          <InfoFragmentCard
            id={currentInfoFragment.id}
            title={currentInfoFragment.title}
            content={currentInfoFragment.content}
            imageUrl={currentInfoFragment.imageUrl}
            onCollect={handleCollectInfoFragment}
          />
        )}

        {/* 记忆阁楼 */}
        {showMemoryAttic && <MemoryAttic fragments={collectedFragments} onClose={() => setShowMemoryAttic(false)} />}

        {/* 章节结束动画 */}
        {showChapterEndAnimation && (
          <ChapterEndAnimation
            chapterNumber={currentChapterForAnimation}
            chapterTitle={gameData.chapters[currentChapterForAnimation - 1]?.title || "章节结束"}
            onContinue={handleContinueToNextChapter}
            onReplay={handleReplayAnimation}
          />
        )}
      </div>

      {/* 底部按钮 */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-[5px] bg-zinc-700 rounded-full"></div>
    </div>
  )
}
