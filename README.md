# ComputerScienceForGameDevNotebook
Notebook for what I learned or trying to learn, with visualization


## 计算机科学-游戏开发

### 算法与数据结构

#### 数据结构 (Data Structures)
- 数组与动态数组 (Arrays & Dynamic Arrays)
- 链表（单 / 双 / 循环）(Linked Lists)
- 栈与队列 (Stack & Queue)
- 哈希表 (Hash Tables)
- 树（二叉 / BST / AVL / 红黑 / 堆 / Trie）(Trees)  ← 含树结构可视化
- 图（邻接表 / 邻接矩阵）(Graphs)
- 并查集 (Disjoint Set)

#### 算法 (Algorithms)
- 排序（快排 / 归并 / 堆排 / 桶排）(Sorting)  ← 含排序可视化
- 查找（二分）(Searching)
- 递归与分治 (Recursion & Divide)
- 动态规划 (Dynamic Programming)
- 贪心 (Greedy)
- 回溯 (Backtracking)
- 滑动窗口 (Sliding Window)
- 双指针 (Two Pointers)
- BFS / DFS
- 最短路径（Dijkstra / A*）(Shortest Path)

#### 常见算法题目类型 (Common Problem Types)
- 数组与字符串 (Array & String)
- 链表 (Linked List)
- 树与图遍历 (Tree & Graph Traversal)
- 动态规划 (Dynamic Programming)
- 滑动窗口与双指针 (Sliding Window & Two Pointers)
- 回溯与排列组合 (Backtracking & Permutation)
- 并查集与拓扑排序 (Union-Find & Topo Sort)

## 计算机结构 (Computer Architecture)
- 冯·诺依曼架构 (Von Neumann)
- CPU（ALU / 寄存器 / 流水线 / 分支预测）(CPU)
- 存储层级（Cache / RAM / 虚拟内存）(Memory Hierarchy)
- 指令集与汇编基础 (ISA & Assembly)
- 总线与 I/O (Bus & I/O)
- GPU 架构（与图形学关联）(GPU Architecture)

## 计算机网络 (Computer Networks)
- OSI 与 TCP/IP 模型 (OSI & TCP/IP)
- HTTP / HTTPS
- TCP / UDP
- DNS
- WebSocket
- CDN 与联机优化 (CDN & Netcode)

## 图形学基础 (Graphics Fundamentals)
- 坐标系统与变换矩阵 (Coords & Transforms)
- 光栅化 (Rasterization)
- 光照模型（Phong / PBR）(Lighting Models)
- 纹理与采样 (Texturing)
- 着色器（顶点 / 片元）(Shaders)
- 相机与投影 (Camera & Projection)
- 3D 渲染管线 (3D Render Pipeline)  ← 含 3D 渲染可视化

## 常用编程语言 (Programming Languages)

### C++
- 内存管理与指针 (Memory & Pointers)
- 模板与泛型 (Templates)
- STL 容器与算法 (STL)
- RAII 与智能指针 (RAII & Smart Pointers)

### Python
- 语法与数据结构 (Syntax & Data Structures)
- 标准库与工具链 (Stdlib & Tooling)

## 数据库 (Databases)

### 关系型数据库 (Relational DB)
- SQL 基础 (SQL Basics)
- 索引与事务 (Index & Transaction)
- 范式与连接 (Normalization & Joins)

### 非关系型数据库 (NoSQL)
- KV / 文档数据库 (KV / Document)
- 图数据库与游戏存档 (Graph DB & Saves)

---

## 站点（本项目代码）

基于 [Astro](https://astro.build) 的静态、可交互知识汇总站，支持中英文切换与可视化。

### 本地运行

```bash
npm install
npm run dev      # 本地预览 http://localhost:4321
npm run build    # 产物输出到 dist/
```

### 部署到 GitHub Pages

推送 `main` 分支后，GitHub Actions 会自动构建并发布到 `gh-pages`；
站点地址：`https://Unchained112.github.io/ComputerScienceForGameDevNotebook/`

### 目录结构

- `src/content/outline.ts`：细纲导航的单一数据源
- `src/components/`：导航、侧边栏、双语/主题切换、可视化组件（排序 / 树 / 3D）
- `src/pages/`：页面（示例可视化页 + 其余主题占位页）
- `.github/workflows/deploy.yml`：自动部署
