---
title: Part 4.3：单源最短路——从一点到所有点的最优路径 (Dijkstra & SPFA)
categories:
  - 大学算法全体系
  - Part 4：图论算法
tags:
  - 图论
  - 最短路径
  - Dijkstra算法
  - SPFA算法
  - 贪心算法
  - 动态规划
description: >-
  如何在一个带权图中，找到从一个起点到所有其他点的最短路径？这是单源最短路问题的核心。无论是地图导航、网络路由，还是游戏中的寻路，最短路算法都是不可或缺的工具。本文将深入讲解两种经典的单源最短路算法：Dijkstra
  算法（适用于非负权图）和 SPFA 算法（可处理负权边）。通过详细的图解、Python 代码和复杂度分析，带你掌握这两种算法的精髓。
abbrlink: 6c6faf80
date: 2025-11-24 01:00:00
---

## 引言：导航的数学基础

当你在地图 App 上输入目的地，点击"开始导航"，它是如何在几秒钟内计算出最优路线的？这背后的核心算法就是**最短路径算法**。

在图论中，**单源最短路径 (Single-Source Shortest Path, SSSP)** 问题是指：给定一个带权图和一个起点 `s`，求从 `s` 到图中所有其他顶点的最短路径。

这个问题有多种算法，其中最著名的是 **Dijkstra 算法**和 **SPFA 算法**。它们各有特点，适用于不同的场景。

## 核心概念

### 最短路径的定义

在一个带权图中，从顶点 `u` 到顶点 `v` 的**最短路径**是指所有从 `u` 到 `v` 的路径中，**边权之和最小**的那条路径。

### 松弛操作 (Relaxation)

几乎所有最短路算法的核心都是**松弛操作**。它的思想是：

> 如果我们发现通过顶点 `u` 到达顶点 `v` 的路径，比当前已知的到 `v` 的路径更短，就更新到 `v` 的最短距离。

用代码表示就是：
```python
if dist[u] + weight(u, v) < dist[v]:
    dist[v] = dist[u] + weight(u, v)
```

## Dijkstra 算法：贪心的力量

### 核心思想

Dijkstra 算法是一种**贪心算法**，它的核心思想是：
1.  维护一个集合 `S`，存储已经找到最短路径的顶点。
2.  每次从**未确定最短路径的顶点**中，选择**距离起点最近**的顶点 `u`，将其加入 `S`。
3.  然后，用 `u` 去**松弛**它的所有邻居。

**关键洞察**：在非负权图中，一旦一个顶点被选中加入 `S`，它的最短距离就已经确定，不会再被更新。

### 算法步骤

1.  初始化：将起点 `s` 的距离设为 0，其他所有顶点的距离设为无穷大。
2.  创建一个优先队列（最小堆），将 `(0, s)` 入队。
3.  当优先队列不为空时，循环执行：
    a.  从优先队列中取出距离最小的顶点 `u`。
    b.  如果 `u` 已经被处理过，跳过。
    c.  对于 `u` 的每一个邻居 `v`，进行松弛操作。如果距离被更新，将 `(dist[v], v)` 入队。

### 时间复杂度

-   使用优先队列（二叉堆）：`O((V + E) log V)`。
-   使用斐波那契堆：`O(E + V log V)`（理论最优，但实现复杂）。

### 适用场景

**只适用于非负权图**。如果图中存在负权边，Dijkstra 算法可能会给出错误的结果。

## SPFA 算法：Bellman-Ford 的优化

### 核心思想

SPFA (Shortest Path Faster Algorithm) 是 Bellman-Ford 算法的一种队列优化版本。它的核心思想是：
1.  使用一个**队列**来存储需要进行松弛操作的顶点。
2.  每次从队列中取出一个顶点 `u`，用它去松弛它的所有邻居。
3.  如果某个邻居 `v` 的距离被更新，且 `v` 不在队列中，就将 `v` 入队。

**关键洞察**：只有当一个顶点的距离被更新时，它才有可能去更新它的邻居。因此，我们只需要维护一个"待处理"的队列。

### 算法步骤

1.  初始化：将起点 `s` 的距离设为 0，其他所有顶点的距离设为无穷大。
2.  创建一个队列，将 `s` 入队，并标记 `s` 在队列中。
3.  当队列不为空时，循环执行：
    a.  从队列中取出一个顶点 `u`，标记 `u` 不在队列中。
    b.  对于 `u` 的每一个邻居 `v`，进行松弛操作。
    c.  如果 `v` 的距离被更新，且 `v` 不在队列中，将 `v` 入队，并标记 `v` 在队列中。

### 时间复杂度

-   平均情况：`O(kE)`，其中 `k` 是一个较小的常数（通常为 2）。
-   最坏情况：`O(VE)`（退化为 Bellman-Ford）。

### 适用场景

**可以处理负权边**，但不能处理负权环（如果存在负权环，最短路径不存在）。

## Python 实现

### Dijkstra 算法实现

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """
    Dijkstra 算法求单源最短路径
    graph: 邻接表表示的图，格式为 {node: [(neighbor, weight), ...]}
    start: 起点
    返回: 从起点到所有节点的最短距离字典
    """
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    
    # 优先队列：(距离, 节点)
    pq = [(0, start)]
    visited = set()
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if u in visited:
            continue
        
        visited.add(u)
        
        # 松弛操作
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    
    return dist

# --- 案例测试 ---
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('C', 1), ('D', 5)],
    'C': [('B', 1), ('D', 8), ('E', 10)],
    'D': [('E', 2)],
    'E': []
}

dist = dijkstra(graph, 'A')
print("Dijkstra 算法结果:")
for node, d in sorted(dist.items()):
    print(f"  A -> {node}: {d}")

# 输出:
# Dijkstra 算法结果:
#   A -> A: 0
#   A -> B: 3
#   A -> C: 2
#   A -> D: 8
#   A -> E: 10
```

### SPFA 算法实现

```python
from collections import deque, defaultdict

def spfa(graph, start):
    """
    SPFA 算法求单源最短路径
    graph: 邻接表表示的图，格式为 {node: [(neighbor, weight), ...]}
    start: 起点
    返回: 从起点到所有节点的最短距离字典，如果存在负权环返回 None
    """
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    
    queue = deque([start])
    in_queue = {node: False for node in graph}
    in_queue[start] = True
    
    # 记录每个节点入队次数，用于检测负权环
    count = {node: 0 for node in graph}
    count[start] = 1
    
    while queue:
        u = queue.popleft()
        in_queue[u] = False
        
        # 松弛操作
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                
                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True
                    count[v] += 1
                    
                    # 如果某个节点入队超过 V 次，说明存在负权环
                    if count[v] > len(graph):
                        return None  # 存在负权环
    
    return dist

# --- 案例测试 ---
# 测试 1：正常情况
graph1 = {
    'A': [('B', 4), ('C', 2)],
    'B': [('C', 1), ('D', 5)],
    'C': [('B', 1), ('D', 8), ('E', 10)],
    'D': [('E', 2)],
    'E': []
}

dist1 = spfa(graph1, 'A')
print("\nSPFA 算法结果 (无负权边):")
for node, d in sorted(dist1.items()):
    print(f"  A -> {node}: {d}")

# 测试 2：带负权边
graph2 = {
    'A': [('B', 4), ('C', 2)],
    'B': [('C', -3), ('D', 5)],
    'C': [('D', 8), ('E', 10)],
    'D': [('E', 2)],
    'E': []
}

dist2 = spfa(graph2, 'A')
print("\nSPFA 算法结果 (有负权边):")
for node, d in sorted(dist2.items()):
    print(f"  A -> {node}: {d}")

# 输出:
# SPFA 算法结果 (无负权边):
#   A -> A: 0
#   A -> B: 3
#   A -> C: 2
#   A -> D: 8
#   A -> E: 10
#
# SPFA 算法结果 (有负权边):
#   A -> A: 0
#   A -> B: 4
#   A -> C: 1
#   A -> D: 9
#   A -> E: 11
```

## 复杂度分析

| 算法 | 时间复杂度 (平均) | 时间复杂度 (最坏) | 空间复杂度 | 能否处理负权边 |
|------|-----------------|-----------------|-----------|--------------|
| Dijkstra | `O((V+E) log V)` | `O((V+E) log V)` | `O(V + E)` | ❌ |
| SPFA | `O(kE)` | `O(VE)` | `O(V + E)` | ✅ |

## 优势 / 劣势 / 易错点

### Dijkstra 算法
**优势**：
-   对于非负权图，性能稳定，时间复杂度有保证。
-   实现相对简单。

**劣势**：
-   不能处理负权边。

**易错点**：
-   忘记检查节点是否已经被访问过，导致重复处理。
-   在有负权边的图上使用，得到错误结果。

### SPFA 算法
**优势**：
-   可以处理负权边。
-   平均情况下性能很好。

**劣势**：
-   最坏情况下会退化为 `O(VE)`，性能不稳定。
-   不能处理负权环（但可以检测）。

**易错点**：
-   忘记标记节点是否在队列中，导致重复入队。
-   没有检测负权环，导致算法陷入死循环。

## 经典应用

1.  **地图导航**：GPS 导航系统使用最短路算法计算最优路线。
2.  **网络路由**：路由器使用最短路算法选择数据包的传输路径。
3.  **游戏 AI**：游戏中的角色寻路。
4.  **社交网络分析**：计算用户之间的"社交距离"。

## 总结

单源最短路径是图论中最重要的问题之一，Dijkstra 和 SPFA 两种算法各有千秋。

### 本文核心要点

✅ **单源最短路径**：从一个起点到所有其他点的最短路径。
✅ **松弛操作**：所有最短路算法的核心。
✅ **Dijkstra 算法**：贪心算法，适用于非负权图，时间复杂度 `O((V+E) log V)`。
✅ **SPFA 算法**：队列优化的 Bellman-Ford，可处理负权边，平均 `O(kE)`。
✅ **选择建议**：非负权图用 Dijkstra，有负权边用 SPFA。

掌握了单源最短路径算法，你就拥有了解决一大类路径优化问题的能力。在下一篇文章中，我们将学习**多源最短路径**和如何处理**负权环**，以及经典的 **Bellman-Ford** 和 **Floyd-Warshall** 算法。

