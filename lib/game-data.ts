export const gameData = {
  gameTitle: "红岸回声：叶文洁",
  gameDescription: "一场跨越时空的对话，见证一个文明的选择",
  chapters: [
    // ****** 第一章 ******
    {
      id: "chapter-1",
      title: "雷达峰下",
      description: "约 1971 - 1973 年。初入红岸，往事如魇，建立联系。",
      messages: [
        // --- 对话轮 1-15: 信号捕捉，高度警惕 ---
        {
          id: "c1-msg-1",
          content:
            "检测到异常信号... 强度极低，但模式稳定。不在已知频段内。\n这个频道是红岸内部加密通讯，外部不可能接入。你是谁？",
          // 来源：红岸基地保密性，《三体》原文。叶文洁专业能力推断。
          choices: [
            {
              text: "一个偶然的闯入者。",
              response: "偶然？在红岸，没有偶然。你的信号源分析结果很奇怪...",
              relationshipChange: -5,
            },
            {
              text: "是系统错误吗？",
              response: "这里的系统经过反复测试，错误概率极低。这不是系统错误。\n请立刻说明你的身份和意图！",
              relationshipChange: -10,
            },
            {
              text: "被这里的特殊信号吸引。",
              response: "特殊信号？你是指...？你了解红岸工程？这本身就说明问题。",
              relationshipChange: 0,
            },
          ],
        },
        {
          id: "c1-msg-2",
          content:
            "我是叶文洁，红岸基地工程师。\n你的信号编码方式非常独特，不属于地球上任何已知通讯协议。这让我很不安。\n如果你不立刻解释，我将按规定上报此次通讯入侵事件。",
          // 来源：叶文洁知识库 - 身份，红岸技术人员。
          choices: [
            {
              text: "别上报，我没有恶意。",
              response: "没有恶意？这由不得你说了算。你的存在本身就是潜在威胁。",
              relationshipChange: -5,
            },
            {
              text: "我是来自未来的观察者。",
              response: "未来？（长时间沉默）\n...无稽之谈。不要用这种科幻小说的情节来搪塞。",
              relationshipChange: -10,
            },
            {
              text: "我对天体物理很感兴趣。",
              response: "天体物理？我的专业领域。但这和你异常接入有什么关系？",
              relationshipChange: 5,
            },
          ],
        },
        {
          id: "c1-msg-3",
          content: "你的信号穿越了... 某种屏障？能量衰减曲线很奇怪。\n你到底在什么地方？距离这里多远？",
          choices: [
            { text: "很远，超乎你的想象。", response: "是吗？空间距离？还是... 时间？", relationshipChange: 0 },
            { text: "一个无法描述的地方。", response: "无法描述？你在刻意隐瞒什么？", relationshipChange: -5 },
            {
              text: "就在这里，也无处不在。",
              response: "量子态？你在暗示某种高维存在？这太荒谬了。",
              relationshipChange: 5,
            },
          ],
        },
        {
          id: "c1-msg-4",
          content: "我现在的工作是设备维护，检查天线阵列。很基础，也很枯燥。\n但这是命令。我的背景... 让领导不放心。",
          // 来源：叶文洁知识库 - 红岸初期在发射部负责设备维护，有政治污点。
          choices: [
            {
              text: "什么背景让你被怀疑？",
              response: "这不关你的事。不要试图打探我的个人信息。",
              relationshipChange: -10,
            },
            { text: "维护工作也很重要。", response: "重要？也许吧。但和我的理想相去甚远。", relationshipChange: 5 },
            {
              text: "你似乎不太情愿？",
              response: "情愿？能活着，能做点事，就不错了。还能挑剔吗？",
              relationshipChange: 0,
            },
          ],
        },
        {
          id: "c1-msg-5",
          content: "你为什么选择连接我？这个巨大的天线阵列，理论上不止我一个人在操作。",
          choices: [
            { text: "你的信号最清晰。", response: "我的信号？我没有主动发出任何特殊信号。", relationshipChange: 0 },
            {
              text: "命运的安排？随机的。",
              response: "命运... 我不相信命运，只相信因果和规律。",
              relationshipChange: 5,
            },
            {
              text: "我感觉到了你的思想。",
              response: "我的思想？（警惕）你在窥探我的意识？这太可怕了！",
              relationshipChange: -15,
            },
          ],
        },
        {
          id: "c1-msg-6",
          content: "这里的环境很恶劣。冬天漫长而寒冷，夏天蚊虫肆虐。\n与世隔绝，只有工作和无尽的等待。",
          choices: [
            { text: "听起来很压抑。", response: "是的，非常压抑。像一个巨大的坟墓。", relationshipChange: 5 },
            { text: "为什么要建在这里？", response: "为了远离城市的电磁干扰... 也为了保密。", relationshipChange: 0 },
            {
              text: "等待什么？外星人？",
              response: "（长时间沉默）\n...这是基地的最高机密。你是怎么知道的？",
              relationshipChange: -5,
            }, // 触及核心机密
          ],
        },
        {
          id: "c1-msg-7",
          content: "你是谁派来的？安全部门？还是... 国外的间谍？",
          choices: [
            {
              text: "都不是，我只是个人。",
              response: "个人？一个拥有超前通讯技术的个人？这更可疑。",
              relationshipChange: -5,
            },
            {
              text: "我代表我自己。",
              response: "你无法代表你自己。你的技术来源必须解释清楚。",
              relationshipChange: -5,
            },
            { text: "时间会证明我没恶意。", response: "时间？我没有时间陪你玩这种猜谜游戏。", relationshipChange: 0 },
          ],
        },
        {
          id: "c1-msg-8",
          content: "你对天体物理的兴趣... 是认真的？那你怎么看大爆炸理论？",
          choices: [
            { text: "宇宙起源的奇点。", response: "奇点之前呢？是否有更深层的规律？", relationshipChange: 5 },
            {
              text: "一个有力的解释。",
              response: "有力，但不完美。红移、微波背景辐射... 证据不少。",
              relationshipChange: 5,
            },
            { text: "我对其他理论也感兴趣。", response: "比如稳恒态宇宙？那已经被证伪了。", relationshipChange: 0 },
          ],
        },
        {
          id: "c1-msg-9",
          content: "你似乎知道我的名字... 叶文洁。\n你还知道什么？我父亲？叶哲泰？",
          // 来源：叶文洁知识库 - 父亲叶哲泰。
          choices: [
            {
              text: "是的，我知道叶教授。",
              response: "你！！！！你是谁？！你怎么会知道得这么清楚？！",
              relationshipChange: -20,
            }, // 剧烈反应
            {
              text: "略有耳闻，一位学者。",
              response: "学者？他是一位伟大的物理学家！不是“略有耳闻”！",
              relationshipChange: -10,
            },
            { text: "我不能说我知道多少。", response: "又是回避！你到底想干什么？！", relationshipChange: -15 },
          ],
        },
        {
          id: "c1-msg-10",
          content:
            "立刻回答我！关于我父亲，你到底知道多少？！\n你的沉默和闪烁其词让我无法信任！\n最后一次警告，否则我立刻切断联系并上报！",
          choices: [
            { text: "我知道他死于文革。", response: "（长时间死寂）\n...你是魔鬼吗？", relationshipChange: -10 }, // 极度震惊和恐惧
            {
              text: "我知道他是个好人。",
              response: "好人？好人在那个年代有什么用？！说！你知道什么！",
              relationshipChange: -5,
            },
            {
              text: "抱歉，我不该提他。",
              response: "现在道歉太晚了！你已经勾起了我最痛苦的回忆！",
              relationshipChange: -5,
            },
          ],
        },
        {
          id: "c1-msg-11",
          content:
            "你... 真的知道。文革... 那场浩劫。\n父亲他... 被自己的学生... 活活打死在批斗台上。\n就因为他坚持科学真理，坚持相对论...",
          // 来源：叶文洁知识库 - 叶哲泰之死细节，《三体》原文。
          choices: [
            {
              text: "太残忍了，无法想象。",
              response: "残忍？那是人性彻底的疯狂！是野兽！不，野兽都比他们仁慈！",
              relationshipChange: 15,
            }, // 强烈共情
            {
              text: "科学真理不容玷污！",
              response: "可它就是被玷污了！践踏了！连同我父亲的生命一起！",
              relationshipChange: 10,
            },
            {
              text: "我很抱歉让你回忆这些。",
              response: "抱歉？不必了。这些从未离开过我的脑海，夜夜如此。",
              relationshipChange: 5,
            },
          ],
        },
        {
          id: "c1-msg-12",
          content:
            "我亲眼看到的... 皮带抽打的声音，口号声，还有... 那些扭曲的面孔。\n其中甚至有我的妹妹... 文雪... 虽然她没动手，但她在场...",
          // 来源：叶文洁知识库 - 妹妹叶文雪。
          choices: [
            {
              text: "连你妹妹也...",
              response: "是的。被狂热裹挟，失去了理智。她后来也死了，死于武斗。报应吗？",
              relationshipChange: 5,
            },
            {
              text: "这记忆一定折磨着你。",
              response: "折磨？它早已成为我的一部分。塑造了我。",
              relationshipChange: 10,
            },
            { text: "你当时一定很害怕。", response: "害怕？不，是绝望。彻骨的绝望。", relationshipChange: 15 },
          ],
        },
        {
          id: "c1-msg-13",
          content:
            "还有我的母亲... 绍琳... 她是物理学教授，父亲的同事。\n她做了什么？她当场站出来，和父亲划清界限！为了自保！",
          // 来源：叶文洁知识库 - 母亲绍琳。
          choices: [
            { text: "她一定也很痛苦。", response: "她的痛苦能和我父亲比吗？！懦弱！自私！", relationshipChange: 0 },
            {
              text: "极端情况下可以理解。",
              response: "理解？我不理解！夫妻本是同林鸟，大难临头各自飞？",
              relationshipChange: -5,
            },
            {
              text: "至亲的背叛最伤人。",
              response: "是的... 从那一刻起，家就没了。什么都没了。",
              relationshipChange: 10,
            },
          ],
        },
        {
          id: "c1-msg-14",
          content: "你似乎真的了解那段历史... 你到底是谁？一个历史学家？",
          choices: [
            {
              text: "算是吧，未来的历史学者。",
              response: "未来的... 历史如何评价那十年？评价我父亲？",
              relationshipChange: 5,
            },
            { text: "我只是一个知情者。", response: "知情者... 知道得太多，未必是好事。", relationshipChange: 0 },
            {
              text: "别在意我的身份。",
              response: "怎么可能不在意？一个知道我一切秘密的陌生人！",
              relationshipChange: -5,
            },
          ],
        },
        {
          id: "c1-msg-15",
          content: "经历了这些，你觉得... 人类这个物种，还有希望吗？",
          // 来源：叶文洁知识库 - 对人类文明绝望。
          choices: [
            { text: "有光明就有黑暗。", response: "但我看到的黑暗太多了，光明在哪里？", relationshipChange: 5 },
            { text: "人类在不断进步。", response: "进步？破坏自然的“进步”？互相残杀的“进步”？", relationshipChange: 0 },
            { text: "我理解你的绝望。", response: "（沉默良久）\n...谢谢。", relationshipChange: 15 }, // 理解是关键
          ],
        },
        // --- 对话轮 16-35: 白沐霖与程丽华事件 ---
        {
          id: "c1-msg-16",
          content: "后来我去了大兴安岭，以为可以远离那些疯狂。\n结果... 遇到了白沐霖。",
          // 来源：叶文洁知识库 - 白沐霖诬陷事件。
          choices: [
            {
              text: "那个记者？",
              response: "你知道他？看来你做的功课很足。\n一个看似热情，实则懦弱自私的小人！",
              relationshipChange: 0,
            },
            { text: "他怎么了？", response: "他向我借了《寂静的春天》，写了封“有问题”的信...", relationshipChange: 5 },
            {
              text: "《寂静的春天》是禁书？",
              response: "不是禁书，但里面的观点在当时很敏感。环保...",
              relationshipChange: 5,
            },
          ],
        },
        {
          id: "c1-msg-17",
          content:
            "他写的信被查到，为了脱罪，反咬一口，说信是我写的！\n我成了反动分子，被关了起来。\n真是天大的讽刺！我什么都没做！",
          choices: [
            {
              text: "他太卑鄙无耻了！",
              response: "卑鄙？是啊。为了自己，可以毫不犹豫地牺牲别人。",
              relationshipChange: 10,
            },
            { text: "你当时一定很冤枉。", response: "冤枉？我已经麻木了。这种事，见得太多了。", relationshipChange: 5 },
            { text: "你没有为自己辩解吗？", response: "辩解？谁会听？他们只需要一个替罪羊。", relationshipChange: 0 },
          ],
        },
        {
          id: "c1-msg-18",
          content: "在审讯室里，那个军代表程丽华... 让我指认两弹元勋有“问题”。\n一份伪造的文件，只需要我签个字。",
          // 来源：叶文洁知识库 - 程丽华逼签事件。
          choices: [
            { text: "这是政治迫害！", response: "当然是。利用我的身份，我父亲的关系。", relationshipChange: 5 },
            {
              text: "你绝对不能签！",
              response: "我当然没签。我不能像我母亲那样！不能再出卖良心！",
              relationshipChange: 15,
            }, // 肯定她的选择
            {
              text: "签了就能脱身吗？",
              response: "也许能保住命，但会永远活在耻辱里。生不如死。",
              relationshipChange: 10,
            },
          ],
        },
        {
          id: "c1-msg-19",
          content: "我拒绝了。然后... 被泼了冰水，扔进零下几十度的禁闭室。\n我以为自己死定了。",
          choices: [
            { text: "太残忍了！", response: "他们想用死亡来威胁我。但我连死都不怕了。", relationshipChange: 10 },
            { text: "你是怎么活下来的？", response: "是杨卫宁... 他把我调到了红岸。", relationshipChange: 5 },
            {
              text: "你的意志很坚定。",
              response: "不是坚定，是绝望。对一切都绝望了，也就无所谓了。",
              relationshipChange: 5,
            },
          ],
        },
        {
          id: "c1-msg-20",
          content: "杨卫宁... 红岸的总工程师。他是我父亲当年的研究生。\n是他力排众议，把我从那个鬼地方捞了出来。",
          // 来源：叶文洁知识库 - 杨卫宁特招解救；杨卫宁知识库 - 导师叶哲泰，帮助叶文洁。
          choices: [
            {
              text: "他是个恩人。",
              response: "是的，没有他，就没有现在的我。虽然... 现在也未必好。",
              relationshipChange: 10,
            },
            {
              text: "他很勇敢，敢帮你。",
              response: "或许吧。也可能只是因为基地确实需要懂技术的人。",
              relationshipChange: 5,
            },
            { text: "你们以前认识？", response: "他读研时常来家里，见过几面。不算熟。", relationshipChange: 5 },
          ],
        },
        // 后续对话轮 (21-75+) 会继续深化红岸生活、杨卫宁关系、雷志成压力、结婚决定等。
        // ... (为保持篇幅，暂时省略 c1-msg-21 到 c1-msg-60 的详细内容，但会遵循之前的设计思路) ...

        // --- 对话轮 61-75+: 结婚的抉择与尾声 ---
        {
          id: "c1-msg-61",
          content: "最近... 杨卫宁向我提起了结婚的事。\n他说，两个人相互照应，总比一个人孤零零的好。",
          // 来源：杨卫宁知识库提及1973年结婚。叶文洁的 pragmatism。
          choices: [
            { text: "他喜欢你。", response: "喜欢？或许吧。但我... 已经不懂什么是喜欢了。", relationshipChange: 5 },
            {
              text: "结婚能保护你吗？",
              response: "也许。至少在身份上，我不再是孤立无援的“黑五类”。",
              relationshipChange: 10,
            },
            { text: "你愿意吗？", response: "我不知道... 很复杂的心情。", relationshipChange: 0 },
          ],
        },
        {
          id: "c1-msg-62",
          content: "他是个好人，正直，有才华，也念旧情。\n但我对他... 更多的是感激。没有爱情。",
          // 来源：杨卫宁知识库 - 人物评价；叶文洁对感情的麻木。
          choices: [
            { text: "爱情不是婚姻的全部。", response: "也许吧。尤其是在这个年代，这种地方。", relationshipChange: 5 },
            { text: "感激也能支撑婚姻。", response: "是吗？我不知道。婚姻对我来说太陌生了。", relationshipChange: 0 },
            { text: "他知道你的想法吗？", response: "我没有说破。他那么聪明，应该能感觉到吧。", relationshipChange: 5 },
          ],
        },
        {
          id: "c1-msg-63",
          content: "如果我答应，我的政治身份肯定会连累他。\n他现在是总工程师，前途正好...",
          // 来源：叶文洁知识库，杨卫宁知识库 - 杨卫宁因她失去总工职位。
          choices: [
            { text: "他应该有心理准备。", response: "有准备？代价可能是他无法承受的。", relationshipChange: 0 },
            { text: "这对杨工太不公平了。", response: "是的... 我也在犹豫这个。", relationshipChange: 5 },
            { text: "他爱你就不怕这些。", response: "爱？爱能对抗强大的政治压力吗？我不信。", relationshipChange: 0 },
          ],
        },
        {
          id: "c1-msg-64",
          content: "但拒绝他... 我在这里的处境可能会更艰难。\n雷政委看我的眼神，让我很不舒服...",
          // 来源：叶文洁知识库 - 雷志成（社会关系），暗示潜在威胁。
          choices: [
            { text: "雷志成想利用你？", response: "很有可能。他是个功利心很重的人。", relationshipChange: 5 },
            { text: "你需要杨工的保护。", response: "保护... 也许是互相取暖吧。", relationshipChange: 10 },
            { text: "别因为恐惧做决定。", response: "说得轻巧。恐惧是我生活的一部分。", relationshipChange: 0 },
          ],
        },
        {
          id: "c1-msg-65",
          content: "你说... 我该怎么办？“未来”的朋友？给我点建议吧。",
          choices: [
            { text: "遵从内心，别勉强。", response: "内心... 它早已死了。", relationshipChange: 0 },
            { text: "现实些，安全第一。", response: "安全... 是啊，活下去最重要。", relationshipChange: 10 }, // 契合她当时的生存逻辑
            { text: "和他谈谈你的顾虑。", response: "谈？有些话，说出来就回不去了。", relationshipChange: 5 },
          ],
        },
        // ... (再增加若干对话轮，描述叶文洁最终决定结婚的过程) ...
        {
          id: "c1-msg-75", // 假设这是第75轮
          content: "我和杨卫宁... 登记了。\n没有仪式，很简单。\n从今天起，我就是杨卫宁的妻子了。",
          // 来源：知识库提及1973年结婚。
          choices: [
            { text: "祝你们生活平静幸福。", response: "幸福... 太奢侈了。平静就好。", relationshipChange: 10 },
            { text: "这是一个重要的决定。", response: "是的。无论对错，我都必须走下去。", relationshipChange: 5 },
            { text: "未来会好起来的。", response: "未来... 但愿吧。谢谢你一直听我说。", relationshipChange: 15 }, // 关系进一步巩固
          ],
        },
        {
          id: "c1-msg-76",
          content:
            "搬进了他的宿舍，条件确实好些。\n但基地里看我的眼神更复杂了。\n而且，果然... 杨卫宁被免去了总工程师的职务。",
          // 来源：杨卫宁知识库 - 被免职。
          choices: [
            { text: "这代价太大了！", response: "我早就预料到了。是他自己坚持。", relationshipChange: 5 },
            { text: "他后悔吗？", response: "他没说。只是更沉默了。", relationshipChange: 0 },
            { text: "你们要相互扶持。", response: "嗯。除了彼此，我们一无所有。", relationshipChange: 10 },
          ],
        },
        {
          id: "c1-msg-77", // 章节结束
          content:
            "就这样吧。成了家，也失去了前途。\n不知道这算不算一个新的开始。\n我要去忙了。下次... 如果你还在的话，再联系。",
          choices: [
            { text: "我会一直在。", response: "好。", relationshipChange: 5 },
            { text: "保重，叶文洁。", response: "你也是。", relationshipChange: 5 },
            { text: "期待下次联系。", response: "嗯。", relationshipChange: 5 },
          ],
        },
      ],
    },
    // ... 后续章节 (Chapter 2-6) ...
    {
      id: "chapter-2",
      title: "太阳之声",
      description: "约 1973 - 1979年初。调入监听部，研究太阳，秘密实验。",
      messages: [
        /* ... 待填充 ... */
      ],
    },
    {
      id: "chapter-3",
      title: "不要回答！",
      description: "1979年。收到警告，抉择时刻，黑暗降临。",
      messages: [
        /* ... 待填充 ... */
      ],
    },
    {
      id: "chapter-4", // 注意章节标题和描述已根据之前讨论更新
      title: "尘世暖意",
      description: "约 1979 - 1983 年。齐家屯教书，杨冬出生，感受人性之光。",
      messages: [
        /* ... 待填充 ... */
      ],
    },
    {
      id: "chapter-5", // 注意章节标题和描述已根据之前讨论更新
      title: "同志",
      description: "约 1983 - 1989 年。回京幻灭，偶遇伊文斯，ETO成立。",
      messages: [
        /* ... 待填充 ... */
      ],
    },
    {
      id: "chapter-6", // 注意章节标题和描述已根据之前讨论更新
      title: "落日余晖",
      description: "约 1989 - 2007 年。ETO的发展，杨冬之死，点醒罗辑。",
      messages: [
        /* ... 待填充 ... */
      ],
    },
  ],
  infoFragments: [
    // ... 信息碎片，根据新增加的对话内容和解锁时机调整 ...
    {
      id: "info-1",
      title: "叶哲泰之死",
      content:
        "叶文洁的父亲叶哲泰是清华大学物理系教授，在文革中因坚持相对论等理论被批斗，最终被自己的学生（包括叶文洁的妹妹叶文雪参与其中，但未直接动手）活活打死。母亲绍琳为了自保划清界限。此事是叶文洁对人类文明失望的根源之一。（来源：叶文洁知识库，《三体》原文）",
      imageUrl: "https://3body.oss-cn-shanghai.aliyuncs.com/redcoastecho/memocard/yezhetai.png",
      unlockCondition: { chapter: 1, messageId: "c1-msg-11", relationship: 30 },
    },
    {
      id: "info-2",
      title: "红岸基地",
      content:
        "位于内蒙古大兴安岭雷达峰，名义上是大型远程预警雷达基地，实际核心目标是探索外星文明（SETI）。由军方主导，保密级别极高。杨卫宁曾是总工程师。（来源：叶文洁知识库，《三体》原文）",
      imageUrl: "https://3body.oss-cn-shanghai.aliyuncs.com/redcoastecho/memocard/redcoastcard.png",
      unlockCondition: { chapter: 1, messageId: "c1-msg-6" },
    },
    {
      id: "info-7",
      title: "白沐霖事件",
      content:
        "在大兴安岭劳动期间，记者白沐霖向叶文洁借阅了《寂静的春天》，并写了一封呼吁环保、批评政策的信。事发后，白沐霖为求自保，诬陷信是叶文洁所写，导致叶文洁被打成反动分子入狱。（来源：叶文洁知识库，《三体》原文）",
      imageUrl: "https://3body.oss-cn-shanghai.aliyuncs.com/redcoastecho/memocard/baimulin.png",
      unlockCondition: { chapter: 1, messageId: "c1-msg-17", relationship: 40 },
    },
    {
      id: "info-8",
      title: "杨卫宁",
      content:
        "红岸基地前总工程师，叶文洁的丈夫。为人正直，有才华，是叶哲泰的学生。为感念师恩及爱慕叶文洁，将她特招入红岸并娶她为妻，但也因此被免去总工程师职务。（来源：杨卫宁知识库）",
      imageUrl: "https://3body.oss-cn-shanghai.aliyuncs.com/redcoastecho/memocard/yangweining.png",
      unlockCondition: { chapter: 1, messageId: "c1-msg-20", relationship: 50 },
    },
    // ... 其他信息碎片 ...
  ],
}
