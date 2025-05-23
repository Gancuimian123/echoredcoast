import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "红岸回声 - 游戏原型",
  description: "基于《三体》宇宙的互动小说游戏",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 添加favicon以避免404错误 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* 禁用不必要的预加载 */}
        <meta name="next-size-adjust" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
