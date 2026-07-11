// 细纲：站点导航的单一数据源。
// - 含 children 的节点为可展开分组（不导航）
// - 含 href 的节点为可点击页面
// 专用可视化页：/algorithm/sorting、/datastructure/tree、/graphics/render
// 其余节点统一指向 /topics/<slug> 占位页

export interface OutlineNode {
  id: string;
  zh: string;
  en: string;
  href?: string;
  children?: OutlineNode[];
  /** 标记该页为示例可视化页（用于导航徽标） */
  viz?: 'sort' | 'tree' | 'render3d';
}

export const outline: OutlineNode[] = [
  {
    id: 'algo',
    zh: '算法与数据结构',
    en: 'Algorithms & Data Structures',
    children: [
      {
        id: 'ds',
        zh: '数据结构',
        en: 'Data Structures',
        children: [
          { id: 'array', zh: '数组与动态数组', en: 'Arrays & Dynamic Arrays', href: '/topics/array' },
          { id: 'linkedlist', zh: '链表（单/双/循环）', en: 'Linked Lists', href: '/topics/linked-list' },
          { id: 'stack-queue', zh: '栈与队列', en: 'Stack & Queue', href: '/topics/stack-queue' },
          { id: 'hash', zh: '哈希表', en: 'Hash Tables', href: '/topics/hash-table' },
          { id: 'tree-ds', zh: '树（二叉/BST/AVL/红黑/堆/Trie）', en: 'Trees', href: '/datastructure/tree', viz: 'tree' },
          { id: 'graph', zh: '图（邻接表/邻接矩阵）', en: 'Graphs', href: '/topics/graph' },
          { id: 'unionfind', zh: '并查集', en: 'Disjoint Set', href: '/topics/union-find' },
        ],
      },
      {
        id: 'alg',
        zh: '算法',
        en: 'Algorithms',
        children: [
          { id: 'sorting', zh: '排序（快排/归并/堆排/桶排）', en: 'Sorting', href: '/algorithm/sorting', viz: 'sort' },
          { id: 'search', zh: '查找（二分）', en: 'Searching', href: '/topics/searching' },
          { id: 'recursion', zh: '递归与分治', en: 'Recursion & Divide', href: '/topics/recursion' },
          { id: 'dp', zh: '动态规划', en: 'Dynamic Programming', href: '/topics/dp' },
          { id: 'greedy', zh: '贪心', en: 'Greedy', href: '/topics/greedy' },
          { id: 'backtrack', zh: '回溯', en: 'Backtracking', href: '/topics/backtracking' },
          { id: 'sliding', zh: '滑动窗口', en: 'Sliding Window', href: '/topics/sliding-window' },
          { id: 'twopointer', zh: '双指针', en: 'Two Pointers', href: '/topics/two-pointers' },
          { id: 'bfs-dfs', zh: 'BFS / DFS', en: 'BFS / DFS', href: '/topics/bfs-dfs' },
          { id: 'shortest', zh: '最短路径（Dijkstra / A*）', en: 'Shortest Path', href: '/topics/shortest-path' },
        ],
      },
      {
        id: 'prob',
        zh: '常见算法题目类型',
        en: 'Common Problem Types',
        children: [
          { id: 'p-array', zh: '数组与字符串', en: 'Array & String', href: '/topics/p-array-string' },
          { id: 'p-list', zh: '链表', en: 'Linked List', href: '/topics/p-linked-list' },
          { id: 'p-tree', zh: '树与图遍历', en: 'Tree & Graph Traversal', href: '/topics/p-tree-graph' },
          { id: 'p-dp', zh: '动态规划', en: 'Dynamic Programming', href: '/topics/p-dp' },
          { id: 'p-sw', zh: '滑动窗口与双指针', en: 'Sliding Window & Two Pointers', href: '/topics/p-sw-tp' },
          { id: 'p-back', zh: '回溯与排列组合', en: 'Backtracking & Permutation', href: '/topics/p-backtrack' },
          { id: 'p-union', zh: '并查集与拓扑排序', en: 'Union-Find & Topo Sort', href: '/topics/p-union-topo' },
        ],
      },
    ],
  },
  {
    id: 'arch',
    zh: '计算机结构',
    en: 'Computer Architecture',
    href: '/topics/computer-architecture',
    children: [
      { id: 'von', zh: '冯·诺依曼架构', en: 'Von Neumann', href: '/topics/von-neumann' },
      { id: 'cpu', zh: 'CPU（ALU/寄存器/流水线/分支预测）', en: 'CPU', href: '/topics/cpu' },
      { id: 'memory', zh: '存储层级（Cache/RAM/虚拟内存）', en: 'Memory Hierarchy', href: '/topics/memory-hierarchy' },
      { id: 'isa', zh: '指令集与汇编基础', en: 'ISA & Assembly', href: '/topics/isa' },
      { id: 'bus', zh: '总线与 I/O', en: 'Bus & I/O', href: '/topics/bus-io' },
      { id: 'gpu', zh: 'GPU 架构（与图形学关联）', en: 'GPU Architecture', href: '/topics/gpu' },
    ],
  },
  {
    id: 'net',
    zh: '计算机网络',
    en: 'Computer Networks',
    href: '/topics/computer-networks',
    children: [
      { id: 'osi', zh: 'OSI 与 TCP/IP 模型', en: 'OSI & TCP/IP', href: '/topics/osi-tcpip' },
      { id: 'http', zh: 'HTTP / HTTPS', en: 'HTTP / HTTPS', href: '/topics/http' },
      { id: 'tcp', zh: 'TCP / UDP', en: 'TCP / UDP', href: '/topics/tcp-udp' },
      { id: 'dns', zh: 'DNS', en: 'DNS', href: '/topics/dns' },
      { id: 'ws', zh: 'WebSocket', en: 'WebSocket', href: '/topics/websocket' },
      { id: 'rpc', zh: 'RPC 与游戏通信', en: 'RPC & Game Comms', href: '/topics/rpc' },
      { id: 'cdn', zh: 'CDN 与联机优化', en: 'CDN & Netcode', href: '/topics/cdn' },
    ],
  },
  {
    id: 'gfx',
    zh: '图形学基础',
    en: 'Graphics Fundamentals',
    href: '/topics/graphics',
    children: [
      { id: 'coord', zh: '坐标系统与变换矩阵', en: 'Coords & Transforms', href: '/topics/coord-transform' },
      { id: 'raster', zh: '光栅化', en: 'Rasterization', href: '/topics/rasterization' },
      { id: 'lighting', zh: '光照模型（Phong / PBR）', en: 'Lighting Models', href: '/topics/lighting' },
      { id: 'texture', zh: '纹理与采样', en: 'Texturing', href: '/topics/texturing' },
      { id: 'shader', zh: '着色器（顶点/片元）', en: 'Shaders', href: '/topics/shaders' },
      { id: 'camera', zh: '相机与投影', en: 'Camera & Projection', href: '/topics/camera' },
      { id: 'pipeline', zh: '3D 渲染管线', en: '3D Render Pipeline', href: '/graphics/render', viz: 'render3d' },
    ],
  },
  {
    id: 'lang',
    zh: '常用编程语言',
    en: 'Programming Languages',
    href: '/topics/languages',
    children: [
      {
        id: 'cpp',
        zh: 'C++',
        en: 'C++',
        href: '/topics/cpp',
        children: [
          { id: 'cpp-mem', zh: '内存管理与指针', en: 'Memory & Pointers', href: '/topics/cpp-memory' },
          { id: 'cpp-tpl', zh: '模板与泛型', en: 'Templates', href: '/topics/cpp-templates' },
          { id: 'cpp-stl', zh: 'STL 容器与算法', en: 'STL', href: '/topics/cpp-stl' },
          { id: 'cpp-raii', zh: 'RAII 与智能指针', en: 'RAII & Smart Pointers', href: '/topics/cpp-raii' },
        ],
      },
      {
        id: 'python',
        zh: 'Python',
        en: 'Python',
        href: '/topics/python',
        children: [
          { id: 'py-syntax', zh: '语法与数据结构', en: 'Syntax & Data Structures', href: '/topics/py-syntax' },
          { id: 'py-std', zh: '标准库与工具链', en: 'Stdlib & Tooling', href: '/topics/py-stdlib' },
        ],
      },
    ],
  },
  {
    id: 'db',
    zh: '数据库',
    en: 'Databases',
    href: '/topics/databases',
    children: [
      {
        id: 'rel',
        zh: '关系型数据库',
        en: 'Relational DB',
        href: '/topics/relational',
        children: [
          { id: 'sql', zh: 'SQL 基础', en: 'SQL Basics', href: '/topics/sql' },
          { id: 'index', zh: '索引与事务', en: 'Index & Transaction', href: '/topics/index-transaction' },
          { id: 'nf', zh: '范式与连接', en: 'Normalization & Joins', href: '/topics/normalization' },
        ],
      },
      {
        id: 'nosql',
        zh: '非关系型数据库',
        en: 'NoSQL',
        href: '/topics/nosql',
        children: [
          { id: 'kv', zh: 'KV / 文档数据库', en: 'KV / Document', href: '/topics/kv-document' },
          { id: 'graphdb', zh: '图数据库与游戏存档', en: 'Graph DB & Saves', href: '/topics/graph-db' },
        ],
      },
    ],
  },
];

/** 收集所有 /topics/<slug> 占位页 slug */
export function getTopicSlugs(): string[] {
  const slugs = new Set<string>();
  const walk = (nodes: OutlineNode[]) => {
    for (const n of nodes) {
      if (n.href && n.href.startsWith('/topics/')) {
        slugs.add(n.href.replace('/topics/', '').replace(/\/+$/, ''));
      }
      if (n.children) walk(n.children);
    }
  };
  walk(outline);
  return [...slugs];
}

/** 按 href 查找节点（用于面包屑/标题） */
export function findNodeByHref(href: string): OutlineNode | undefined {
  let found: OutlineNode | undefined;
  const walk = (nodes: OutlineNode[]) => {
    for (const n of nodes) {
      if (n.href === href) found = n;
      if (n.children) walk(n.children);
    }
  };
  walk(outline);
  return found;
}

/**
 * 将站点内部路径（以 / 开头，如 /topics/array）补上部署 base 前缀，
 * 生成可直接用于 <a href> 的绝对路径。
 * 必须用于渲染任何 outline 中的 href——否则在 GitHub Pages 子路径部署下会 404。
 * 注意：import.meta.env.BASE_URL 不保证带尾斜杠，因此这里手动归一化，
 * 保证 base 与路径之间恰好一个 '/'。
 * 传入 undefined（无 href 的分组节点）返回 undefined。
 */
export function withBase(href?: string): string | undefined {
  if (!href) return undefined;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, ''); // 去掉尾斜杠
  return `${base}${href}`; // href 自带前导 '/'
}
