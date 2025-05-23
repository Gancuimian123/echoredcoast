"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function MemoryAttic({ fragments, onClose }) {
  const [selectedFragmentIndex, setSelectedFragmentIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const fragmentsPerPage = 6

  // 计算总页数
  const totalPages = Math.ceil(fragments.length / fragmentsPerPage)

  // 获取当前页的碎片
  const currentFragments = fragments.slice(currentPage * fragmentsPerPage, (currentPage + 1) * fragmentsPerPage)

  // 处理翻页
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {/* 顶部标题栏 */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-red-500 text-lg font-bold">记忆阁楼</h2>
        <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
          <X size={20} />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto p-4">
        {fragments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <p>暂无收集的信息碎片</p>
          </div>
        ) : selectedFragmentIndex === null ? (
          // 网格视图 - 显示所有碎片
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentFragments.map((fragment, index) => (
              <div
                key={fragment.id}
                className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg overflow-hidden cursor-pointer hover:border-red-900/50 transition-all duration-300"
                onClick={() => setSelectedFragmentIndex(index + currentPage * fragmentsPerPage)}
              >
                <div className="h-32 bg-zinc-700 relative overflow-hidden">
                  {/* 图片 */}
                  <img
                    src={
                      fragment.imageUrl ||
                      `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(fragment.title) || "/placeholder.svg"}`
                    }
                    alt={fragment.title}
                    className="w-full h-full object-cover"
                  />

                  {/* 渐变叠加层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-80"></div>

                  {/* 标题 */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-sm font-medium text-zinc-100 truncate">{fragment.title}</h3>
                    <p className="text-xs text-zinc-400 truncate mt-1">{fragment.content.substring(0, 50)}...</p>
                  </div>

                  {/* 装饰性元素 */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500/70 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 详情视图 - 显示选中的碎片
          <div className="h-full flex flex-col">
            <div className="p-4 flex items-center border-b border-zinc-800/50">
              <button
                onClick={() => setSelectedFragmentIndex(null)}
                className="flex items-center text-zinc-400 hover:text-white bg-zinc-800/50 px-3 py-1.5 rounded-md"
              >
                <ChevronLeft size={18} className="mr-1" />
                <span>返回</span>
              </button>
              <span className="text-zinc-400 text-sm ml-4">
                {selectedFragmentIndex + 1} / {fragments.length}
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-zinc-900/30">
              <div className="max-w-2xl mx-auto">
                <div className="w-full h-48 md:h-64 bg-zinc-800 rounded-lg overflow-hidden mb-6 relative">
                  {/* 图片 */}
                  <img
                    src={
                      fragments[selectedFragmentIndex].imageUrl ||
                      `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(fragments[selectedFragmentIndex].title) || "/placeholder.svg"}`
                    }
                    alt={fragments[selectedFragmentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-5">
                  <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {fragments[selectedFragmentIndex].title}
                  </h3>
                  <div className="border-l-2 border-red-900/30 pl-4 py-1 mb-4">
                    <p className="text-xs text-zinc-500">信息碎片 #{selectedFragmentIndex + 1}</p>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{fragments[selectedFragmentIndex].content}</p>
                </div>
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="p-4 flex justify-between border-t border-zinc-800/50 bg-zinc-900/50">
              <button
                onClick={() => setSelectedFragmentIndex(Math.max(0, selectedFragmentIndex - 1))}
                disabled={selectedFragmentIndex <= 0}
                className={`p-2 rounded-md flex items-center ${
                  selectedFragmentIndex <= 0
                    ? "text-zinc-700 bg-zinc-800/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-800/50"
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                <span>上一个</span>
              </button>
              <button
                onClick={() => setSelectedFragmentIndex(Math.min(fragments.length - 1, selectedFragmentIndex + 1))}
                disabled={selectedFragmentIndex >= fragments.length - 1}
                className={`p-2 rounded-md flex items-center ${
                  selectedFragmentIndex >= fragments.length - 1
                    ? "text-zinc-700 bg-zinc-800/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800 bg-zinc-800/50"
                }`}
              >
                <span>下一个</span>
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 分页控制 */}
      {totalPages > 1 && selectedFragmentIndex === null && (
        <div className="p-4 border-t border-zinc-800 flex justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-md flex items-center ${
              currentPage === 0 ? "text-zinc-700" : "text-zinc-400 hover:text-white"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-zinc-400 text-sm">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-md flex items-center ${
              currentPage === totalPages - 1 ? "text-zinc-700" : "text-zinc-400 hover:text-white"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
