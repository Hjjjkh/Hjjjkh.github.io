---
title: Part 4.4：多源最短路与负权环 (Bellman-Ford & Floyd-Warshall)
categories:
  - 大学算法全体系
  - Part 4：图论算法
tags:
  - 图论
  - 最短路径
  - Bellman-Ford算法
  - Floyd-Warshall算法
  - 动态规划
  - 负权环
description: >-
  在上一篇文章中，我们解决了从一个点出发的最短路问题。但如果我们需要知道任意两点之间的最短路径呢？或者，如果图中存在负权边甚至负权环，我们该如何应对？本文将深入探讨两种强大的最短路算法：Bellman-Ford
  算法（单源，可处理负权边并检测负权环）和 Floyd-Warshall 算法（多源，优雅的动态规划解法）。掌握它们，你将能应对更复杂的路径问题。
abbrlink: dff8203e
date: 2025-11-25 01:00:00
---

## 引言：当起点不唯一

单源最短路算法（如 Dijkstra）解决了从一个固定起点到所有其他点的最短路径问题。但在某些场景下，我们需要知道**任意两点之间**的最短路径。例如，在一个城市交通网络中，我们可能需要快速查询任意两个地点之间的最短行车时间。

此外，Dijkstra 算法无法处理**负权边**。在现实世界中，负权边虽然不常见，但在某些抽象模型中却很有用（例如，在金融模型中，负权边可以表示收益）。更棘手的是**负权环**——一个边权之和为负的环路。一旦图中存在负权环，从某些点出发的最短路径将不再有意义，因为我们可以无限次地绕着这个环走，使得路径长度变为负无穷。

为了解决这些问题，我们需要更强大的算法：**Bellman-Ford 算法**和 **Floyd-Warshall 算法**。

## Bellman-Ford 算法：处理负权边的单源最短路

Bellman-Ford 算法是一种基于**动态规划**思想的单源最短路算法。它比 Dijkstra 慢，但优点是**可以处理负权边**，并且能够**检测负权环**。

### 核心思想

Bellman-Ford 算法的核心思想是：

> 对图中的所有边进行 `V-1` 轮松弛操作。在第 `k` 轮松弛后，从起点出发，经过**最多 `k` 条边**到达任意顶点的最短路径就已经被找到了。

由于任意两个顶点之间的最短路径最多包含 `V-1` 条边（如果超过，则一定有环），因此 `V-1` 轮松弛后，就能找到从起点到所有其他顶点的最短路径。

### 算法步骤

1.  初始化：将起点 `s` 的距离设为 0，其他所有顶点的距离设为无穷大。
2.  进行 `V-1` 轮循环，每一轮中：
    a.  遍历图中的**所有边 `(u, v, weight)`**。
    b.  对每条边进行松弛操作：`if dist[u] + weight < dist[v]: dist[v] = dist[u] + weight`。
3.  **检测负权环**：在 `V-1` 轮松弛后，再进行一轮松弛。如果在这轮中，还有任何顶点的距离被更新，说明图中存在负权环。

### 时间复杂度

-   `O(VE)`，其中 `V` 是顶点数，`E` 是边数。

### 适用场景

-   图中存在负权边。
-   需要检测负权环。

## Floyd-Warshall 算法：优雅的多源最短路

Floyd-Warshall 算法是一种非常简洁优美的**多源最短路算法**。它同样基于**动态规划**，可以在 `O(V³)` 的时间内计算出任意两点之间的最短路径。

### 核心思想

Floyd-Warshall 算法的核心思想是：

> 对于任意一对顶点 `(i, j)`，它们之间的最短路径，要么是直接连接的边，要么是经过某个中间顶点 `k` 的路径。

我们定义 `dp[k][i][j]` 为：从 `i` 到 `j`，只允许经过编号从 `1` 到 `k` 的顶点作为中间节点时，所能得到的 dlaest 路径。

状态转移方程为：
`dp[k][i][j] = min(dp[k-1][i][j], dp[k-1][i][k] + dp[k-1][k][j])`

由于 `dp[k]` 只依赖于 `dp[k-1]`，我们可以优化空间，去掉第一维。

### 算法步骤

1.  初始化一个 `V x V` 的距离矩阵 `dist`：
    -   `dist[i][j]` = `weight(i, j)`（如果 `i` 和 `j` 之间有边）。
    -   `dist[i][i]` = `0`。
    -   `dist[i][j]` = `infinity`（如果 `i` 和 `j` 之间没有边）。
2.  进行三层循环：
    ```
    for k from 1 to V:
        for i from 1 to V:
            for j from 1 to V:
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    ```
3.  **检测负权环**：算法结束后，如果 `dist[i][i] < 0`，说明从 `i` 出发存在负权环。

### 时间复杂度

-   `O(V³)`。

### 适用场景

-   需要计算任意两点之间的最短路径。
-   图的规模不大（`V` 通常小于 500）。

## Python 实现

### Bellman-Ford 算法实现

```python
def bellman_ford(graph, nodes, start):
    """
    Bellman-Ford 算法求单源最短路径
    graph: 边列表，格式为 [(u, v, weight), ...]
    nodes: 节点列表
    start: 起点
    返回: (距离字典, 是否存在负权环)
    """
    dist = {node: float('inf') for node in nodes}
    dist[start] = 0
    num_nodes = len(nodes)
    
    # V-1 轮松弛
    for _ in range(num_nodes - 1):
        for u, v, weight in graph:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
    
    # 检测负权环
    has_negative_cycle = False
    for u, v, weight in graph:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            has_negative_cycle = True
            break
            
    return dist, has_negative_cycle

# --- 案例测试 ---
nodes = ['A', 'B', 'C', 'D', 'E']
graph_edges = [
    ('A', 'B', -1), ('A', 'C', 4),
    ('B', 'C', 3), ('B', 'D', 2), ('B', 'E', 2),
    ('D', 'B', 1), ('D', 'C', 5),
    ('E', 'D', -3)
]

dist, cycle = bellman_ford(graph_edges, nodes, 'A')
print("Bellman-Ford 算法结果:")
if cycle:
    print("  图中存在负权环")
else:
    for node, d in sorted(dist.items()):
        print(f"  A -> {node}: {d}")

# 输出:
# Bellman-Ford 算法结果:
#   A -> A: 0
#   A -> B: -1
#   A -> C: 2
#   A -> D: -2
#   A -> E: 1
```

### Floyd-Warshall 算法实现

```python
from collections import defaultdict

def floyd_warshall(nodes, edges):
    """
    Floyd-Warshall 算法求多源最短路径
    nodes: 节点列表
    edges: 边列表，格式为 [(u, v, weight), ...]
    返回: 距离矩阵
    """
    num_nodes = len(nodes)
    node_map = {node: i for i, node in enumerate(nodes)}
    
    # 初始化距离矩阵
    dist = [[float('inf')] * num_nodes for _ in range(num_nodes)]
    for i in range(num_nodes):
        dist[i][i] = 0
    
    for u, v, weight in edges:
        i, j = node_map[u], node_map[v]
        dist[i][j] = weight
    
    # 动态规划
    for k in range(num_nodes):
        for i in range(num_nodes):
            for j in range(num_nodes):
                if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    
    return dist

# --- 案例测试 ---
nodes = ['A', 'B', 'C', 'D']
edges = [
    ('A', 'B', 3), ('A', 'D', 7),
    ('B', 'A', 8), ('B', 'C', 2),
    ('C', 'A', 5), ('C', 'D', 1),
    ('D', 'A', 2)
]

dist_matrix = floyd_warshall(nodes, edges)
print("\nFloyd-Warshall 算法结果 (距离矩阵):")
for row in dist_matrix:
    print(f"  {row}")

# 输出:
# Floyd-Warshall 算法结果 (距离矩阵):
#   [0, 3, 5, 6]
#   [5, 0, 2, 3]
#   [3, 6, 0, 1]
#   [2, 5, 7, 0]
```

## 复杂度分析

| 算法 | 时间复杂度 | 空间复杂度 | 类型 | 能否处理负权边 | 能否检测负权环 |
|--------------|-----------|-----------|------|--------------|--------------|
| Bellman-Ford | `O(VE)` | `O(V)` | 单源 | ✅ | ✅ |
| Floyd-Warshall | `O(V³)` | `O(V²)` | 多源 | ✅ | ✅ |

## 优势 / 劣势 / 易错点

### Bellman-Ford 算法
**优势**：
-   可以处理负权边，应用范围比 Dijkstra 广。
-   可以检测负权环。

**劣势**：
-   时间复杂度较高，对于没有负权边的图，不如 Dijkstra 高效。

**易错点**：
-   忘记进行 `V-1` 轮松弛。
-   负权环的检测逻辑写错。

### Floyd-Warshall 算法
**优势**：
-   代码实现非常简洁。
-   一次性计算出所有点对之间的最短路径。

**劣势**：
-   时间复杂度 `O(V³)`，只适用于小规模图。

**易错点**：
-   三层循环的顺序不能搞错，最外层必须是中间节点 `k`。
-   距离矩阵的初始化错误。

## 经典应用

1.  **套利检测**：在货币兑换中，汇率可以构成一个图，通过检测负权环（实际上是乘积小于 1 的环）来发现套利机会。
2.  **交通网络分析**：计算任意两个地点之间的最短距离，用于路线规划和网络评估。
3.  **传递闭包**：Floyd-Warshall 算法可以稍作修改，用于计算图的传递闭包（判断任意两点是否可达）。

## 总结

Bellman-Ford 和 Floyd-Warshall 是处理复杂最短路问题的两大利器。前者解决了负权边和负权环的单源最短路问题，后者则提供了一种优雅的方式来计算多源最短路。

### 本文核心要点

✅ **Bellman-Ford**：单源最短路，`O(VE)`，可处理负权边，可检测负权环。
✅ **Floyd-Warshall**：多源最短路，`O(V³)`，代码简洁，基于动态规划。
✅ **负权环**：一个边权之和为负的环，会导致最短路径无解。两种算法都能检测它。
✅ **选择建议**：
    -   无负权边，单源：Dijkstra。
    -   有负权边，单源：Bellman-Ford 或 SPFA。
    -   多源，小规模图：Floyd-Warshall。

掌握了这些算法，你就拥有了解决几乎所有最短路问题的能力。在下一篇文章中，我们将学习一个在有向无环图 (DAG) 中非常重要的问题——**拓扑排序**。

