---
name: python-support-and-batch6
overview: 为数据结构与算法章节（批次1-5，18个页面、34个代码块）添加 Python 代码支持（C++/Python 标签切换），并创建批次6的4个新题解页（p-dp / p-sw-tp / p-backtrack / p-union-topo）。
todos:
  - id: create-codetabs-infra
    content: 创建 CodeTabs.astro 组件，在 BaseLayout 添加全局切换脚本，在 global.css 添加标签样式
    status: completed
  - id: modify-ds-pages
    content: 改造数据结构页（array/linked-list/stack-queue/hash-table/graph/union-find）补 Python + CodeTabs
    status: completed
    dependencies:
      - create-codetabs-infra
  - id: modify-algo-pages
    content: 改造算法页（sorting/searching/recursion/greedy/backtracking）补 Python + CodeTabs
    status: completed
    dependencies:
      - create-codetabs-infra
  - id: modify-advanced-pages
    content: 改造进阶算法页（dp/sliding-window/two-pointers/bfs-dfs/shortest-path）补 Python + CodeTabs
    status: completed
    dependencies:
      - create-codetabs-infra
  - id: modify-problem-pages
    content: 改造题解页（p-array-string/p-linked-list/p-tree-graph）补 Python + CodeTabs
    status: completed
    dependencies:
      - create-codetabs-infra
  - id: create-batch6
    content: 创建批次6四页（p-dp/p-sw-tp/p-backtrack/p-union-topo）含 C++/Python 双语代码
    status: completed
    dependencies:
      - create-codetabs-infra
  - id: build-verify
    content: npm run build 验证 + lint 检查 + 回写 DEVELOPMENT_PLAN.md 批次6进度
    status: completed
    dependencies:
      - modify-ds-pages
      - modify-algo-pages
      - modify-advanced-pages
      - modify-problem-pages
      - create-batch6
---

## 产品概述

为 CS Notebook 站点的"算法与数据结构"章节增加 Python 代码支持，并推进批次6的开发。涉及两个核心任务：(1) 创建 C++/Python 标签切换组件，改造现有 19 个页面中 38 个代码块（含 `algorithm/sorting.astro` 的 4 个），为每个 C++ 代码块补充 Python 等价实现；(2) 创建批次6 的 4 个题解页面。

## 核心功能

- **CodeTabs 组件**：C++/Python 代码标签切换，localStorage 持久化语言偏好，全站统一切换
- **现有页面改造**：19 个 DS&A 章节页面（18 个 `topics/` + 1 个 `algorithm/sorting.astro`）的 38 个代码块全部补充 Python 等价代码并用 CodeTabs 包装
- **批次6 新页面**：`p-dp`（爬楼梯/编辑距离/买卖股票）、`p-sw-tp`（最小覆盖子串/三数之和）、`p-backtrack`（全排列/子集/单词搜索）、`p-union-topo`（省份数量/课程表），每页含 C++/Python 双语代码
- 所有新代码遵循现有双语包装、glass 卡片版式、复杂度标注标准

## Tech Stack

- **Astro + TypeScript + Tailwind CSS**（现有项目技术栈，无新增依赖）
- 代码标签切换：Astro 组件 `<slot>` + 全局 `is:inline` 脚本 + CSS
- Python 代码：手写等价实现，保持算法逻辑一致，利用 Python 惯用写法（list comprehension、collections 等）

## Implementation Approach

### 1. CodeTabs.astro 组件

创建 `src/components/CodeTabs.astro`，使用具名 slot 包装 C++ 和 Python 代码：

```
---
// 无 props，纯 slot 驱动
---
<div class="code-tabs" data-code-tabs>
  <div class="flex gap-1 mb-2">
    <button class="code-tab px-3 py-1 text-xs font-mono rounded-t-md transition-colors"
            data-code-tab="cpp" data-active="true">C++</button>
    <button class="code-tab px-3 py-1 text-xs font-mono rounded-t-md transition-colors"
            data-code-tab="py">Python</button>
  </div>
  <div data-code-panel="cpp"><slot name="cpp" /></div>
  <div data-code-panel="py" class="hidden"><slot name="py" /></div>
</div>
```

页面使用方式：

```
<CodeTabs>
  <pre slot="cpp"><code>...C++ 代码（HTML实体转义）...</code></pre>
  <pre slot="py"><code>...Python 代码...</code></pre>
</CodeTabs>
```

### 2. 全局切换脚本

在 `BaseLayout.astro` 的 `</body>` 前添加 `is:inline` 脚本：

- 读取 `localStorage['csnote-codelang']`（默认 `'cpp'`）
- `applyCodeLang(lang)` 遍历所有 `[data-code-tabs]`，切换 `[data-code-tab]` 的 `data-active` 属性和 `[data-code-panel]` 的 `hidden` class
- 点击标签时更新偏好并持久化
- 页面加载时自动应用已保存的偏好（首屏无闪烁）
- 与现有语言/主题 `is:inline` 脚本并列，不干扰现有逻辑

### 3. CSS 样式

在 `global.css` 添加：

```css
.code-tab[data-active="true"] {
  color: var(--primary-cyan);
  border-bottom: 2px solid var(--primary-cyan);
}
.code-tab[data-active="false"] {
  color: var(--ink-muted);
  border-bottom: 2px solid transparent;
}
.code-tabs pre {
  /* 统一代码块样式，规范化现有两种不一致的 pre class */
  font-size: 0.8125rem;
  background: rgba(0,0,0,0.3);
  border-radius: 0.75rem;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.6;
}
```

这样所有 CodeTabs 内的 `<pre>` 统一样式，页面侧只需传 `<pre><code>` 无需额外 class。

### 4. 页面改造策略

每个含代码块的页面：

1. frontmatter 添加 `import CodeTabs from '...';`
2. 每个 `<pre><code>C++代码</code></pre>` 替换为：

```
<CodeTabs>
<pre slot="cpp"><code>原C++代码（保持不变）</code></pre>
<pre slot="py"><code>新Python等价代码</code></pre>
</CodeTabs>
```

3. `stack-queue.astro` 第2块（已有 Python）补充 C++ 标签
4. 保持 glass 卡片结构、双语内容、表格完全不变
5. Python 代码使用惯用写法：`list` 代替 `vector`、`dict` 代替 `unordered_map`、`collections.deque` 代替 `queue`、`heapq` 代替 `priority_queue` 等

### 5. 批次6新页面设计

4 页沿用 `p-array-string.astro` 题解版式（header + glass 卡片 × N + 速查表），每题含：题意简述（Bilingual）+ 思路（Bilingual）+ CodeTabs（C++/Python）+ 复杂度标注。slug 与 `outline.ts` 一致。

### 性能与可靠性

- 全局脚本仅操作 DOM class/attribute，单次 `applyCodeLang` O(标签组数)，性能无忧
- `is:inline` 脚本不参与 Astro 打包，无额外 JS 体积
- Python 代码为静态 HTML 文本，无运行时开销
- 构建为静态站，无 SSR 影响

## Implementation Notes

- HTML 实体转义规则：`<`→`&lt;`、`>`→`&gt;`、`{`→`&#123;`、`}`→`&#125;`、`&`→`&amp;`，Python 代码同样需要转义
- 现有代码块有两种格式（带 class / 不带 class），CodeTabs 内统一用 `.code-tabs pre` CSS 覆盖，移除原 `<pre>` 上的 class
- `sorting.astro` 在 `src/pages/algorithm/` 目录，import 路径为 `../../components/CodeTabs.astro`（与 topics/ 页面相同相对路径）
- 批次6页面 ID 前缀：`pd-`/`ps-`/`pb-`/`pu-`，避免 DOM 冲突
- 每页 frontmatter 只需加一行 import，不破坏现有结构

## Architecture Design

```
BaseLayout.astro
  ├── <head> 现有 is:inline 脚本（语言/主题）
  ├── <body>
  │   ├── Nav / Sidebar / <slot />
  │   └── [NEW] is:inline 脚本（代码标签切换）
  └── global.css [MODIFY] 添加 .code-tab / .code-tabs pre 样式

CodeTabs.astro [NEW]
  └── data-code-tabs 容器 → tab 按钮 + cpp/py panel

页面（19个改造 + 4个新建）
  └── 每个 <pre><code> → <CodeTabs> 包装
```

## Directory Structure

```
src/
├── components/
│   ├── Bilingual.astro          # 现有，不变
│   └── CodeTabs.astro           # [NEW] C++/Python 标签切换组件
├── layouts/
│   └── BaseLayout.astro         # [MODIFY] 添加代码标签全局 is:inline 脚本
├── styles/
│   └── global.css               # [MODIFY] 添加 .code-tab / .code-tabs pre 样式
├── pages/
│   ├── algorithm/
│   │   └── sorting.astro        # [MODIFY] 4个代码块补Python + CodeTabs
│   └── topics/
│       ├── array.astro          # [MODIFY] 1块 → CodeTabs
│       ├── linked-list.astro    # [MODIFY] 2块 → CodeTabs
│       ├── stack-queue.astro    # [MODIFY] 2块 → CodeTabs（第2块补C++）
│       ├── hash-table.astro     # [MODIFY] 1块 → CodeTabs
│       ├── graph.astro          # [MODIFY] 1块 → CodeTabs
│       ├── union-find.astro     # [MODIFY] 1块 → CodeTabs
│       ├── searching.astro      # [MODIFY] 1块 → CodeTabs
│       ├── recursion.astro      # [MODIFY] 2块 → CodeTabs
│       ├── greedy.astro         # [MODIFY] 2块 → CodeTabs
│       ├── backtracking.astro   # [MODIFY] 2块 → CodeTabs
│       ├── dp.astro             # [MODIFY] 2块 → CodeTabs
│       ├── sliding-window.astro # [MODIFY] 2块 → CodeTabs
│       ├── two-pointers.astro   # [MODIFY] 2块 → CodeTabs
│       ├── bfs-dfs.astro        # [MODIFY] 2块 → CodeTabs
│       ├── shortest-path.astro  # [MODIFY] 2块 → CodeTabs
│       ├── p-array-string.astro # [MODIFY] 3块 → CodeTabs
│       ├── p-linked-list.astro  # [MODIFY] 3块 → CodeTabs
│       ├── p-tree-graph.astro   # [MODIFY] 3块 → CodeTabs
│       ├── p-dp.astro           # [NEW] 爬楼梯/编辑距离/买卖股票
│       ├── p-sw-tp.astro        # [NEW] 最小覆盖子串/三数之和
│       ├── p-backtrack.astro    # [NEW] 全排列/子集/单词搜索
│       └── p-union-topo.astro   # [NEW] 省份数量/课程表
DEVELOPMENT_PLAN.md               # [MODIFY] 批次6状态改为已完成
```

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 在实现阶段批量读取待修改页面的完整内容，确保每个代码块的 C++ 原文和上下文准确无误，避免遗漏或误改
- Expected outcome: 获取每个待修改文件的精确代码块位置和内容，为编写 Python 等价代码提供准确参照