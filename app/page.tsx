"use client"

import { useState, useEffect } from "react"
import ClientPhoneSimulator from "@/components/client-phone-simulator"
import useScreenSize from "@/hooks/use-screen-size"

export default function Home() {
  const { isMobile, isTablet } = useScreenSize()
  const [isClient, setIsClient] = useState(false)
  const [showDevPanel, setShowDevPanel] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 暗门触发回调函数
  const handleSecretDoorOpen = () => {
    setShowDevPanel(true)
  }

  return (
    <div
      className={`min-h-screen bg-zinc-950 text-zinc-100 flex flex-col ${isMobile || isTablet ? "h-screen overflow-hidden" : ""}`}
    >
      {/* 在移动设备上隐藏标题栏 */}
      {!isMobile && !isTablet && (
        <header className="border-b border-zinc-800 py-4 px-6">
          <h1 className="text-2xl font-bold text-red-500">红岸回声 - 游戏原型</h1>
        </header>
      )}

      <main className={`flex-1 flex flex-col lg:flex-row overflow-hidden ${isMobile || isTablet ? "h-full" : ""}`}>
        {/* 手机模拟器区域 */}
        <div className={`flex-1 flex justify-center items-center ${isMobile || isTablet ? "p-0 h-full" : "p-6"}`}>
          <ClientPhoneSimulator onSecretDoorOpen={handleSecretDoorOpen} />
        </div>
      </main>

      {/* 在移动设备上隐藏页脚 */}
      {!isMobile && !isTablet && (
        <footer className="border-t border-zinc-800 py-3 px-6 text-center text-zinc-500 text-sm">
          © 2025 红岸回声 - 基于《三体》宇宙
        </footer>
      )}
    </div>
  )
}
