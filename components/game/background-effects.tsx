"use client"

export default function BackgroundEffects() {
  // 简化背景效果，移除framer-motion依赖
  return (
    <>
      {/* 背景图案 - 红色网格 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 grid grid-cols-6 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-full border-r border-red-800"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-full border-b border-red-800"></div>
          ))}
        </div>
      </div>

      {/* 红色噪点效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff000015_1px,transparent_1px)] bg-[length:8px_8px]"></div>

      {/* 简化的荧光效果 - 使用静态元素代替动画 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full bg-red-900/20 blur-3xl w-64 h-64 -top-20 -left-20"></div>
        <div className="absolute rounded-full bg-red-900/10 blur-3xl w-96 h-96 -bottom-40 -right-20"></div>
      </div>

      {/* 移除随机闪烁的点，减少动画复杂度 */}
    </>
  )
}
