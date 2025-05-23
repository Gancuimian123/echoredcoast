"use client"

import { useState, useEffect } from "react"

export default function useScreenSize() {
  // 初始状态设置为安全的默认值
  const [screenSize, setScreenSize] = useState({
    width: 1024, // 默认桌面宽度
    height: 768, // 默认桌面高度
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // 标记组件已挂载
    setHasMounted(true)

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenSize({
        width,
        height,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // 初始化
    handleResize()

    // 添加事件监听器
    window.addEventListener("resize", handleResize)

    // 清理事件监听器
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 如果组件尚未挂载，返回默认值
  // 这可以防止服务器端渲染和客户端渲染之间的不匹配
  return hasMounted
    ? screenSize
    : {
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }
}
