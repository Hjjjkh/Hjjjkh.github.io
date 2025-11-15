---
title: Part 4.2：最小生成树 (MST)——Kruskal 与 Prim 算法
categories:
  - 大学算法全体系
  - Part 4：图论算法
tags:
  - 图论
  - 最小生成树
  - MST
  - Kruskal
  - Prim
  - 贪心算法
  - 算法进阶
description: >-
  如何用最低的成本连接一个网络中的所有节点？这就是最小生成树（Minimum Spanning Tree,
  MST）问题。无论是铺设电缆、设计交通网络，还是优化网络路由，MST 都是核心算法。本文将深入探讨解决 MST 问题的两大经典贪心算法：Kruskal
  算法和 Prim 算法。我们将通过图解、代码实现和复杂度分析，带你彻底掌握这两种方法的精髓。
abbrlink: 39868bc3
date: 2025-11-23 01:00:00
---

## 引言：如何用最低成本连接所有城市？

想象一下，你是一个网络工程师，需要在一个国家的几个主要城市之间铺设光缆，使得所有城市都能相互通信。每条可行的光缆路线都有一个建设成本。你的任务是：**选择一个铺设计划，使得总成本最低，同时保证所有城市都被连接起来。**

这个问题就是经典的**最小生成树 (Minimum Spanning Tree, MST)** 问题。它是在一个带权的无向图中，找到一棵连接所有顶点的树，且这棵树的所有边的权重之和最小。

MST 是图论中的一个基础且重要的问题，它在网络设计、集群分析、布线问题等领域有着广泛的应用。解决这个问题最著名的两种算法是 **Kruskal 算法**和 **Prim 算法**，它们都巧妙地运用了**贪心策略**。

## 核心概念

-   **生成树 (Spanning Tree)**：在一个无向连通图中，一棵包含图中**所有顶点**，并且边的数量恰好是**顶点数减一**的子图。生成树是无环的。
-   **最小生成树 (Minimum Spanning Tree, MST)**：在一个带权的无向连通图中，所有边的权重之和最小的那棵生成树。

一个图可以有多个不同的生成树，但它们的最小生成树的权重和是唯一的（除非存在权重相同的边，可能导致有多棵不同的最小生成树）。

## 1. Kruskal 算法：边的贪心

Kruskal 算法的贪心策略非常直接：**总是选择当前可用的、权重最小的边，只要这条边不会形成环路。**

**核心思想**：将所有边按权重从小到大排序，然后依次考察每一条边。如果将这条边加入到当前的森林（初始时每个顶点都是一棵独立的树）中不会形成环，就采纳它。重复这个过程，直到我们选择了 `V-1` 条边。

### 如何检测环路？

检测环路最高效的工具是**并查集 (Disjoint Set Union, DSU)**。并查集可以快速地：
1.  `find(u)`：查找顶点 `u` 所在的集合（或树）的根节点。
2.  `union(u, v)`：合并顶点 `u` 和 `v` 所在的两个集合。

当我们考察一条边 `(u, v)` 时，我们先用 `find(u)` 和 `find(v)` 检查它们是否已经在同一个集合中。如果不在，说明加入这条边不会形成环，我们就采纳它，并调用 `union(u, v)` 合并它们。

### 步骤分解

1.  创建一个并查集，每个顶点都是一个独立的集合。
2.  将图中的所有边按权重从小到大排序。
3.  初始化一个空的 MST 边集，计数器 `edge_count = 0`。
4.  遍历排序后的边 `(u, v)`，权重为 `w`：
    a.  如果 `find(u) != find(v)`：
        i.  将这条边加入 MST。
        ii. 调用 `union(u, v)`。
        iii. `edge_count` 加一。
    b.  如果 `edge_count` 达到 `V-1`，算法结束。

### Python 实现

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i]) # 路径压缩
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j
            return True
        return False

def kruskal(n, edges):
    """
    n: 顶点数
    edges: 边列表，格式为 (weight, u, v)
    """
    # 1. 按权重排序边
    edges.sort()
    
    dsu = DSU(n)
    mst_cost = 0
    mst_edges = []
    edge_count = 0
    
    # 2. 遍历边
    for weight, u, v in edges:
        if dsu.union(u, v):
            mst_cost += weight
            mst_edges.append((u, v, weight))
            edge_count += 1
            if edge_count == n - 1:
                break
    
    return mst_cost, mst_edges

# --- 案例测试 ---
# 顶点数
n = 4 
# 边 (weight, u, v)
edges = [(10, 0, 1), (6, 0, 2), (5, 0, 3), (15, 1, 3), (4, 2, 3)]

cost, mst = kruskal(n, edges)
print(f"Kruskal's MST Cost: {cost}") # 19
print(f"Kruskal's MST Edges: {mst}") # [(4, 2, 3), (5, 0, 3), (10, 0, 1)]
```

## 2. Prim 算法：点的贪心

Prim 算法的贪心策略是从一个顶点开始，逐步“扩张”生成树。

**核心思想**：维护一个已经在 MST 中的顶点集合 `S`。每次都选择一条权重最小的边 `(u, v)`，其中 `u` 在 `S` 中，而 `v` 不在 `S` 中。然后将 `v` 加入 `S`，并将这条边加入 MST。重复这个过程，直到所有顶点都在 `S` 中。

### 如何高效找到最小权重的边？

这个问题可以使用**优先队列 (Min-Heap)** 来解决。优先队列中存储所有连接 `S` 内外顶点的“横切边”，并以权重作为优先级。

### 步骤分解

1.  选择一个任意的起始顶点 `s`，将其加入 MST 顶点集 `visited`。
2.  创建一个优先队列 `pq`，将 `s` 的所有邻接边 `(weight, s, neighbor)` 加入 `pq`。
3.  当 `pq` 不为空且 MST 边数小于 `V-1` 时，循环执行：
    a.  从 `pq` 中取出权重最小的边 `(w, u, v)`。
    b.  如果 `v` 已经被访问过，跳过。
    c.  否则，将 `v` 标记为已访问，将边 `(u, v)` 加入 MST。
    d.  将 `v` 的所有未被访问过的邻居的边加入 `pq`。

### Python 实现

```python
import heapq
from collections import defaultdict

def prim(n, adj, start_node=0):
    """
    n: 顶点数
    adj: 邻接表, 格式为 {u: [(weight, v), ...]}
    """
    visited = {start_node}
    pq = []
    
    # 将起始节点的所有边加入优先队列
    for weight, neighbor in adj[start_node]:
        heapq.heappush(pq, (weight, start_node, neighbor))
        
    mst_cost = 0
    mst_edges = []
    
    while pq and len(visited) < n:
        weight, u, v = heapq.heappop(pq)
        
        if v in visited:
            continue
            
        visited.add(v)
        mst_cost += weight
        mst_edges.append((u, v, weight))
        
        # 将新加入节点的所有边加入优先队列
        for neighbor_weight, neighbor in adj[v]:
            if neighbor not in visited:
                heapq.heappush(pq, (neighbor_weight, v, neighbor))
                
    return mst_cost, mst_edges

# --- 案例测试 ---
n = 4
adj = defaultdict(list)
edges = [(10, 0, 1), (6, 0, 2), (5, 0, 3), (15, 1, 3), (4, 2, 3)]
for w, u, v in edges:
    adj[u].append((w, v))
    adj[v].append((w, u))

cost, mst = prim(n, adj)
print(f"Prim's MST Cost: {cost}") # 19
print(f"Prim's MST Edges: {mst}") # [(5, 0, 3), (4, 3, 2), (10, 0, 1)]
```

## Kruskal vs. Prim

| 特性 | Kruskal 算法 | Prim 算法 |
|---|---|---|
| **贪心对象** | 边 | 顶点 |
| **数据结构** | 并查集 | 优先队列 |
| **图的表示** | 边列表 | 邻接表 |
| **适用场景** | **稀疏图** (边数 `E` 接近顶点数 `V`) | **稠密图** (边数 `E` 接近 `V²`) |
| **时间复杂度** | `O(E log E)` 或 `O(E log V)` | `O(E log V)` |

-   Kruskal 的瓶颈在于对所有边进行排序，所以当边数 `E` 很大时，`O(E log E)` 会成为主导。
-   Prim 的瓶颈在于优先队列的操作，它与边数和顶点数都有关。

在实践中，由于 `E` 通常小于 `V²`，`log E` 和 `log V` 的差异不大，两者性能相当。但 Kruskal 的实现通常更简单。

## 总结

Kruskal 和 Prim 算法都是解决最小生成树问题的经典贪心算法，它们从不同的角度出发，但都殊途同归，完美地解决了如何用最低成本连接所有节点的问题。

### 本文核心要点

✅ **最小生成树 (MST)**：用 `V-1` 条边连接图中所有 `V` 个顶点，且总权重最小。
✅ **Kruskal 算法**：对**边**贪心。将所有边排序，依次选择不会形成环路的最小边。使用**并查集**检测环路。适用于**稀疏图**。
✅ **Prim 算法**：对**点**贪心。从一个点开始，不断选择连接已选点集和未选点集的最小边。使用**优先队列**优化。适用于**稠密图**。
✅ **贪心选择性质**：两种算法的每一步选择都遵循了 MST 的贪心选择性质，保证了最终结果的最优性。

理解了最小生成树，我们就能解决一大类网络优化问题。在下一篇文章中，我们将转向另一个核心图论问题——**最短路径**，看看如何找到从一个点到另一个点的最快路线。
