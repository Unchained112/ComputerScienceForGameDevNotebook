# 后续开发计划（CS Notebook）

> 本文件是站点内容开发的"单一计划源"，供**新建对话窗口**逐批执行。每批对应一个二级主题，
> 包含明确的页面 slug、交付标准与建议交互/代码示例。执行完一批即可开新对话执行下一批，
> 无需重复解释项目背景。

## 一、项目现状

技术栈：**Astro + TypeScript + Tailwind**（静态双语站点）。

已交付：
- 站点基础设施：`BaseLayout`、`Nav`、`Sidebar`、`SidebarItem`、`ThemeToggle`、`LangToggle`、双语切换（`html[data-lang]`）。
- 三个**专门可视化页**（已完成，本计划不重复开发，仅做引用）：
  - `/algorithm/sorting` → `src/components/viz/SortVisualizer.astro`
  - `/datastructure/tree` → `src/components/viz/TreeVisualizer.astro`
  - `/graphics/render` → `src/components/viz/Render3D.astro`
- 导航单一数据源：`src/content/outline.ts`（`outline` 数组 + `getTopicSlugs()` / `findNodeByHref()`）。

待开发：**约 60 个 `/topics/<slug>` 占位页**（当前由 `src/pages/topics/[topic].astro` 统一渲染为"内容建设中"）。

## 二、已确认决策

| 项 | 结论 |
|----|------|
| 计划文档位置 | 独立文件 `DEVELOPMENT_PLAN.md`（不污染 README） |
| 每页交付标准 | **双语图文内容页 + 各主题酌情加轻量交互/代码示例** |
| 执行颗粒度 | **按 14 个子主题分批**，每批 2–7 页 |

## 三、每页交付标准（必读）

1. **双语**：正文用 `<Bilingual>` 包装，`<span slot="zh">…</span><span slot="en">…</span>`。
2. **结构**：沿用 `sorting.astro` 的版式——`header`（小标签 + 标题 + 导语）+ `.glass` 卡片分区。
3. **样式类**（直接复用，勿新建）：`glass`、`text-primary-cyan`、`text-ink-muted`、`accent-gradient`、
   `text-func-amber`/`text-func-red`/`text-func-green`/`text-primary-purple`（用于颜色语义标注）。
4. **轻量交互/代码**（按主题酌情，非必做）：
   - 交互优先用 Astro `<script>` + 原生 TS（如动画、点击切换、滑动窗口高亮），与现有 viz 组件风格一致。
   - 代码用 `<pre class="…"><code>…</code></pre>` 或 `glass` 卡片展示，附复杂度标注。
5. **不破坏现有导航**：新增页面 slug 必须与 `outline.ts` 中 `href` 一致。

## 四、页面落地方式（关键约定）

> 当前所有 `/topics/<slug>` 由动态路由 `src/pages/topics/[topic].astro` 统一占位。
> **新增专属内容时，在 `src/pages/topics/` 下创建同名静态文件 `<slug>.astro` 即可**——
> Astro 中静态路由优先于动态路由，该 slug 会自动"覆盖"占位页，其余 slug 仍走占位逻辑。

**SOP（每批执行步骤）：**
1. 读取本计划对应批次，确认要开发的 slug 清单。
2. 先读 `src/pages/algorithm/sorting.astro` 与 `src/components/Bilingual.astro` 作为版式模板。
3. 对每个 slug 创建 `src/pages/topics/<slug>.astro`，写入双语内容 +（酌情）交互/代码。
4. 运行 `npm run build`（或 `npm run dev` 抽查）确认无报错、双语切换正常、导航高亮正确。
5. 回写本文件末尾"进度追踪表"对应行的状态。

## 五、14 批详细计划

> 每批给出：批次名 / 页数 / slug 清单 / 建议交互与代码要点。

### 批次 1 · 数据结构·线性与哈希（4 页）
- `array`（数组与动态数组）：动态数组扩容（reserve/copy）动画；C++ `std::vector` push_back 代码 + 均摊 O(1) 说明。
- `linked-list`（链表）：单/双/循环链表结构图；"反转链表"可视化 + 递归/迭代双解代码。
- `stack-queue`（栈与队列）：用栈实现括号匹配的交互；用队列实现滑动窗口/阻塞队列说明。
- `hash-table`（哈希表）：链地址法 vs 开放寻址对比图；哈希函数与负载因子对冲突的影响演示。

### 批次 2 · 数据结构·图与并查集（2 页）
- `graph`（图）：邻接表 vs 邻接矩阵对比表（空间/查询/遍历复杂度）；BFS/DFS 遍历高亮（可复用 bfs-dfs 思路）。
- `union-find`（并查集）：`find`/`union` + 路径压缩/按秩合并动画；连通分量统计示例。

### 批次 3 · 算法·基础（4 页）
- `searching`（查找）：二分查找区间 `[lo,hi)` 收缩动画；lower_bound/upper_bound 代码。
- `recursion`（递归与分治）：递归调用栈可视化（阶乘/斐波那契/汉诺塔）；分治范式说明。
- `greedy`（贪心）：区间调度（最多不重叠区间）、找零问题；贪心正确性（交换论证）简述。
- `backtracking`（回溯）：子集/排列/组合生成树；N 皇后可视化 + 剪枝代码。

### 批次 4 · 算法·进阶与图算法（5 页）
- `dp`（动态规划）：0/1 背包、最长公共子序列"填表"动画；状态转移方程 + 空间优化。
- `sliding-window`（滑动窗口）：窗口左右指针滑动高亮；最长无重复子串代码。
- `two-pointers`（双指针）：有序数组两数之和/快慢指针（环检测）动画。
- `bfs-dfs`（BFS/DFS）：迷宫最短路（BFS 层序）/ 树前中后序（DFS）可视化。
- `shortest-path`（最短路径）：Dijkstra 松弛步骤逐步高亮；A* 启发式对比。

### 批次 5 · 题型·数组/链表/树图（3 页）
- `p-array-string`（数组与字符串）：Two Sum、盛水容器、最长回文子串题解 + 代码。
- `p-linked-list`（链表）：翻转链表、环入口、合并有序链表代码。
- `p-tree-graph`（树与图遍历）：层序遍历、二叉树右视图、拓扑排序题解。

### 批次 6 · 题型·DP/窗口/回溯/集合（4 页）
- `p-dp`（动态规划题）：爬楼梯、编辑距离、买卖股票题解 + 代码。
- `p-sw-tp`（滑动窗口与双指针）：最小覆盖子串、三数之和代码。
- `p-backtrack`（回溯与排列组合）：全排列、子集、单词搜索代码。
- `p-union-topo`（并查集与拓扑排序）：省份数量（并查集）、课程表（拓扑排序）代码。

### 批次 7 · 计算机结构·概览与 CPU（3 页）
- `computer-architecture`（计算机结构概览）：五大部件关系图。
- `von-neumann`（冯·诺依曼架构）：存储程序概念、数据与指令同存内存的取舍。
- `cpu`（CPU）：ALU/寄存器/流水线五级（IF/ID/EX/MEM/WB）动画；分支预测说明。

### 批次 8 · 计算机结构·存储/指令/总线/GPU（4 页）
- `memory-hierarchy`（存储层级）：金字塔（寄存器→Cache→RAM→磁盘）；局部性原理；虚拟内存分页。
- `isa`（指令集与汇编）：CISC vs RISC；一条 `add` 指令的取指-执行周期。
- `bus-io`（总线与 I/O）：总线仲裁；中断 vs DMA。
- `gpu`（GPU 架构）：SIMT/SIMD；与图形学（批次 11）的关联说明。

### 批次 9 · 网络·模型与传输（4 页）
- `computer-networks`（网络概览）：分层思想与端到端原则。
- `osi-tcpip`（OSI 与 TCP/IP）：七层 vs 四层对照表（协议/数据单元）。
- `tcp-udp`（TCP/UDP）：三次握手、四次挥手、拥塞控制动画；UDP 适用场景。
- `http`（HTTP/HTTPS）：方法/状态码速查；HTTPS（TLS）握手要点。

### 批次 10 · 网络·应用层（3 页）
- `dns`（DNS）：递归/迭代解析流程动画；记录类型（A/AAAA/CNAME/MX）。
- `websocket`（WebSocket）：与 HTTP 长轮询对比；双向通信时序。
- `cdn`（CDN 与联机优化）：边缘缓存、就近接入；游戏联机中的延迟优化（与 netcode 关联）。

### 批次 11 · 图形学基础（全 7 页）
- `graphics`（图形学概览）：实时 vs 离线渲染管线总览（可链接 `/graphics/render` 可视化页）。
- `coord-transform`（坐标与变换矩阵）：Model/View/Projection 矩阵演示；齐次坐标。
- `rasterization`（光栅化）：三角形遍历、重心坐标插值动画。
- `lighting`（光照模型）：Phong（环境/漫反射/高光）vs PBR（金属度/粗糙度）公式与对比。
- `texturing`（纹理与采样）：UV 映射、双线性/三线性滤波、mipmap。
- `shaders`（着色器）：顶点/片元着色器职责；一段最小 GLSL 示例。
- `camera`（相机与投影）：透视 vs 正交投影；视锥与裁剪。

### 批次 12 · 编程语言·概览与 C++（6 页）
- `languages`（编程语言概览）：命令式/函数式/OOP 范式对比；各语言定位。
- `cpp`（C++ 概览）：编译模型、与 C 的区别。
- `cpp-memory`（内存管理与指针）：栈/堆布局、指针与引用、内存对齐。
- `cpp-templates`（模板与泛型）：函数/类模板、SFINAE/concepts 简介。
- `cpp-stl`（STL 容器与算法）：`vector/map/unordered_map` 复杂度对照表；`sort`/`find` 等。
- `cpp-raii`（RAII 与智能指针）：`unique_ptr`/`shared_ptr` 生命周期示例。

### 批次 13 · 编程语言·Python（3 页）
- `python`（Python 概览）：解释型、GIL、与 C++ 的性能/生态取舍。
- `py-syntax`（语法与数据结构）：列表推导、生成器、dict/set 速查。
- `py-stdlib`（标准库与工具链）：`collections`、`itertools`、`pathlib`、`venv`/`pip`。

### 批次 14 · 数据库（8 页，分两小组，同批执行）
- `databases`（数据库概览）：关系型 vs NoSQL 选型矩阵。
- `relational`（关系型概览）：表/行/列、主键外键。
- `sql`（SQL 基础）：SELECT/JOIN/GROUP BY 示例 + 执行顺序。
- `index-transaction`（索引与事务）：B+ 树索引、ACID、隔离级别与脏读/幻读。
- `normalization`（范式与连接）：1NF–3NF、反范式权衡；多表 JOIN 示例。
- `nosql`（NoSQL 概览）：CAP 定理；各类 NoSQL 适用场景。
- `kv-document`（KV / 文档数据库）：Redis / MongoDB 数据模型示例。
- `graph-db`（图数据库与游戏存档）：节点-关系模型；用图存玩家/物品关系、存档设计示例。

## 六、进度追踪表

| 批次 | 主题 | 页数 | 状态 |
|------|------|------|------|
| 1 | 数据结构·线性与哈希 | 4 | 已完成 |
| 2 | 数据结构·图与并查集 | 2 | 已完成 |
| 3 | 算法·基础 | 4 | 已完成 |
| 4 | 算法·进阶与图算法 | 5 | 已完成 |
| 5 | 题型·数组/链表/树图 | 3 | 已完成 |
| 6 | 题型·DP/窗口/回溯/集合 | 4 | 已完成 |
| 7 | 计算机结构·概览与 CPU | 3 | 待开发 |
| 8 | 计算机结构·存储/指令/总线/GPU | 4 | 待开发 |
| 9 | 网络·模型与传输 | 4 | 待开发 |
| 10 | 网络·应用层 | 3 | 待开发 |
| 11 | 图形学基础（全） | 7 | 待开发 |
| 12 | 编程语言·概览与 C++ | 6 | 待开发 |
| 13 | 编程语言·Python | 3 | 待开发 |
| 14 | 数据库（全） | 8 | 待开发 |

> 完成一批后，将对应"状态"改为 `已完成`，并可在备注列标注 PR/提交号。

## 七、新对话执行提示词模板

开新对话时，可直接粘贴如下内容（以批次 N 为例）：

```
请基于 DEVELOPMENT_PLAN.md 执行「批次 N」。
- 阅读 src/content/outline.ts 确认 slug 与导航。
- 以 src/pages/algorithm/sorting.astro 为版式模板，src/components/Bilingual.astro 为双语组件。
- 为每个 slug 在 src/pages/topics/<slug>.astro 创建专属页（静态路由会覆盖占位页）。
- 交付标准：双语图文 + 酌情轻量交互/代码示例（见计划第三节）。
- 完成后跑 npm run build 验证，并回写进度追踪表。
```
