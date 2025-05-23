"use client"

import { useEffect, useRef, useState } from "react"

export default function ThreeBodyAnimation() {
  const canvasRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // 延迟初始化动画，减少初始加载压力
    const timer = setTimeout(() => {
      setIsActive(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // 简化的三体系统 - 减少计算复杂度
    const bodies = [
      {
        x: 30,
        y: -20,
        vx: -0.3,
        vy: -0.6,
        mass: 4000,
        radius: 4.5,
        color: "#ff4040",
      },
      {
        x: -40,
        y: -20,
        vx: 0.1,
        vy: 0.5,
        mass: 5000,
        radius: 5,
        color: "#ff8080",
      },
      {
        x: -20,
        y: 40,
        vx: 0.05,
        vy: -0.1,
        mass: 7000,
        radius: 5.5,
        color: "#ff2020",
      },
      {
        x: 10,
        y: 20,
        vx: 0.2,
        vy: 0.1,
        mass: 2,
        radius: 2.2,
        color: "#4080ff",
      },
    ]

    // 简化的轨迹历史 - 减少存储
    const trails = [[], [], [], []]
    const maxTrailLength = 30 // 减少轨迹长度

    let animationId = null

    const updateBodies = () => {
      const G = 0.03
      const dt = 0.05

      for (let i = 0; i < bodies.length; i++) {
        const body1 = bodies[i]
        let fx = 0
        let fy = 0

        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue

          const body2 = bodies[j]
          const dx = body2.x - body1.x
          const dy = body2.y - body1.y
          const r = Math.sqrt(dx * dx + dy * dy) + 1

          const f = (G * body1.mass * body2.mass) / (r * r)
          fx += (f * dx) / r
          fy += (f * dy) / r
        }

        body1.vx += (fx / body1.mass) * dt
        body1.vy += (fy / body1.mass) * dt
        body1.x += body1.vx * dt
        body1.y += body1.vy * dt

        // 添加到轨迹
        trails[i].push({ x: body1.x, y: body1.y })
        if (trails[i].length > maxTrailLength) {
          trails[i].shift()
        }

        // 简化的边界检测
        const maxDistance = 120
        const distanceFromCenter = Math.sqrt(body1.x * body1.x + body1.y * body1.y)
        if (distanceFromCenter > maxDistance) {
          const factor = maxDistance / distanceFromCenter
          body1.x *= factor
          body1.y *= factor
          body1.vx *= 0.9
          body1.vy *= 0.9
        }
      }
    }

    const drawScene = () => {
      // 使用更简单的清屏方法
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, width, height)

      // 简化轨迹绘制
      for (let i = 0; i < trails.length; i++) {
        const trail = trails[i]
        const body = bodies[i]

        if (trail.length < 2) continue

        // 只绘制部分轨迹点，减少绘制操作
        for (let j = 1; j < trail.length; j += 2) {
          ctx.beginPath()
          ctx.moveTo(centerX + trail[j - 1].x, centerY + trail[j - 1].y)
          ctx.lineTo(centerX + trail[j].x, centerY + trail[j].y)
          ctx.lineWidth = i === 3 ? 0.5 : 0.8
          ctx.strokeStyle = body.color + "80" // 固定透明度
          ctx.stroke()
        }
      }

      // 绘制天体 - 简化光晕效果
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i]

        // 简化的光晕
        ctx.beginPath()
        ctx.arc(centerX + body.x, centerY + body.y, body.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = body.color + "40" // 固定透明度
        ctx.fill()

        // 天体本身
        ctx.beginPath()
        ctx.arc(centerX + body.x, centerY + body.y, body.radius, 0, Math.PI * 2)
        ctx.fillStyle = body.color
        ctx.fill()
      }

      updateBodies()
      animationId = requestAnimationFrame(drawScene)
    }

    drawScene()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isActive])

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-48 h-48">
        <canvas ref={canvasRef} width={240} height={240} className="w-full h-full rounded-full opacity-90" />
        <div className="absolute inset-0 rounded-full border border-red-900/30"></div>
      </div>
    </div>
  )
}
