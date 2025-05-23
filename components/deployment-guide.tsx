"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { gameData } from "@/lib/game-data"

export default function DeploymentGuide() {
  // 将gameData转换为格式化的JSON字符串
  const formattedGameData = JSON.stringify(gameData, null, 2)

  return (
    <div className="h-full p-6">
      <Tabs defaultValue="structure" className="h-full flex flex-col">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="structure">数据结构</TabsTrigger>
          <TabsTrigger value="example">示例数据</TabsTrigger>
          <TabsTrigger value="guide">部署指南</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="flex-1 overflow-auto">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-500">游戏数据结构</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">核心数据结构</h3>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <pre className="text-xs text-zinc-300 whitespace-pre-wrap">
                  {`{
  "gameTitle": "红岸回声",
  "gameDescription": "一场跨越时空的对话",
  "chapters": [
    {
      "id": "chapter-1",
      "title": "雷达峰下",
      "description": "1971-1973年，叶文洁在红岸基地的初期经历",
      "messages": [
        {
          "id": "message-1",
          "content": "消息内容",
          "choices": [
            {
              "text": "选项文本",
              "response": "选择后的回复",
              "relationshipChange": 5, // 信任度变化
              "unlocksInfo": ["info-id"] // 解锁的信息碎片
            }
          ]
        }
      ]
    }
  ],
  "infoFragments": [
    {
      "id": "info-id",
      "title": "信息标题",
      "content": "信息内容"
    }
  ]
}`}
                </pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">消息类型</h3>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-300 mb-2">游戏中有三种消息类型：</p>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-2">
                  <li>
                    <span className="text-zinc-200">系统消息</span>：type: "system" - 用于章节转换、游戏提示等
                  </li>
                  <li>
                    <span className="text-zinc-200">接收消息</span>：type: "received" - 叶文洁发送的消息
                  </li>
                  <li>
                    <span className="text-zinc-200">发送消息</span>：type: "sent" - 玩家发送的消息
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">选择机制</h3>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-300 mb-2">每个选择可以包含以下属性：</p>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-2">
                  <li>
                    <span className="text-zinc-200">text</span>：选项显示的文本
                  </li>
                  <li>
                    <span className="text-zinc-200">response</span>：选择后叶文洁的回复
                  </li>
                  <li>
                    <span className="text-zinc-200">relationshipChange</span>：信任度变化值（可正可负）
                  </li>
                  <li>
                    <span className="text-zinc-200">unlocksInfo</span>：解锁的信息碎片ID数组
                  </li>
                  <li>
                    <span className="text-zinc-200">nextMessageId</span>：（可选）跳转到特定消息ID
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="example" className="flex-1 overflow-auto">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-500">示例游戏数据</h2>
            <p className="text-sm text-zinc-400">以下是当前游戏使用的数据示例：</p>

            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 overflow-auto">
              <pre className="text-xs text-zinc-300 whitespace-pre-wrap">{formattedGameData}</pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="flex-1 overflow-auto">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-500">部署指南</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">如何替换游戏数据</h3>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-300 mb-4">要替换游戏数据，请按照以下步骤操作：</p>
                <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-3">
                  <li>
                    <span className="text-zinc-200">编辑游戏数据文件</span>
                    <p className="ml-6 mt-1 text-zinc-500">
                      修改 <code className="bg-zinc-800 px-1 py-0.5 rounded">lib/game-data.ts</code> 文件中的 gameData
                      对象
                    </p>
                  </li>
                  <li>
                    <span className="text-zinc-200">确保数据结构正确</span>
                    <p className="ml-6 mt-1 text-zinc-500">新数据必须遵循上述数据结构，包含所有必要的字段</p>
                  </li>
                  <li>
                    <span className="text-zinc-200">重新构建应用</span>
                    <p className="ml-6 mt-1 text-zinc-500">
                      运行 <code className="bg-zinc-800 px-1 py-0.5 rounded">npm run build</code> 命令重新构建应用
                    </p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">使用外部JSON文件</h3>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-300 mb-4">如果您希望使用外部JSON文件而不是硬编码数据，可以：</p>
                <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-3">
                  <li>
                    <span className="text-zinc-200">创建JSON文件</span>
                    <p className="ml-6 mt-1 text-zinc-500">
                      在 <code className="bg-zinc-800 px-1 py-0.5 rounded">public/data/</code> 目录下创建{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">game-data.json</code> 文件
                    </p>
                  </li>
                  <li>
                    <span className="text-zinc-200">修改数据加载逻辑</span>
                    <p className="ml-6 mt-1 text-zinc-500">
                      在 <code className="bg-zinc-800 px-1 py-0.5 rounded">lib/game-data.ts</code> 中使用 fetch
                      加载外部JSON：
                    </p>
                    <pre className="bg-zinc-800 p-2 rounded mt-2 text-xs">
                      {`// 示例代码
import { useEffect, useState } from 'react';

export function useGameData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data/game-data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('加载游戏数据失败:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading };
}`}
                    </pre>
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-200">部署到生产环境</h3>
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <p className="text-sm text-zinc-300 mb-4">将应用部署到生产环境的步骤：</p>
                <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-3">
                  <li>
                    <span className="text-zinc-200">构建应用</span>
                    <p className="ml-6 mt-1 text-zinc-500">
                      运行 <code className="bg-zinc-800 px-1 py-0.5 rounded">npm run build</code> 命令
                    </p>
                  </li>
                  <li>
                    <span className="text-zinc-200">部署到Vercel</span>
                    <p className="ml-6 mt-1 text-zinc-500">推荐使用Vercel进行部署，只需连接您的GitHub仓库并自动部署</p>
                  </li>
                  <li>
                    <span className="text-zinc-200">或使用其他托管服务</span>
                    <p className="ml-6 mt-1 text-zinc-500">
                      将构建后的 <code className="bg-zinc-800 px-1 py-0.5 rounded">out</code>{" "}
                      目录部署到任何静态网站托管服务
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
