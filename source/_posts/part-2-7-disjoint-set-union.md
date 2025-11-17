---
title: Part 2.7：并查集：高效处理“朋友圈”问题
categories:
  - 大学算法全体系
  - Part 2：基础数据结构
tags:
  - 数据结构
  - 并查集
  - Union-Find
  - 路径压缩
  - 按秩合并
description: >-
  并查集（Disjoint Set Union）是处理动态连通性问题的利器。本文将通过“朋友圈”的生动比喻，深入剖析其 find 和 union
  两大核心操作，并讲解路径压缩和按秩合并两大关键优化，让你彻底掌握这个查询效率近乎 O(1) 的高效数据结构。
cover: 'https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/part-2-7-cover.jpg'
abbrlink: 2b8a6ba5
date: 2025-11-15 21:00:00
---

## 引言：谁和谁是朋友？

想象一个社交网络，里面有很多人。我们想知道两个人是否属于同一个“朋友圈”。朋友的朋友，也算同一个圈子。现在，不断有新的人建立朋友关系，我们如何快速地判断任意两个人是否在同一个圈子里呢？

这就是典型的**动态连通性**问题。我们需要一个数据结构，它能支持两种操作：
1.  **合并 (Union)**：将两个不相交的集合（朋友圈）合并成一个。
2.  **查找 (Find)**：判断两个元素是否属于同一个集合。

**并查集 (Disjoint Set Union, DSU)**，也常被称为 **Union-Find**，就是为此而生的。它是一种专门用于处理不相交集合的合并与查询问题的数据结构。

**为什么并查集如此重要？**

*   **面试价值**：并查集是面试中考察频率中等但区分度很高的知识点。它能很好地考察你对数据结构抽象和优化的理解。常见题目如“省份数量”、“最小生成树（Kruskal 算法）”等。
*   **工程价值**：在图论中，它被用于判断图中是否存在环、求解最小生成树。在图像处理中，它可以用于图像分割，将相邻的相似像素合并成一个区域。

本文将通过生动的比喻，带你从零开始构建一个并查集，并学习两种让其查询效率近乎 `O(1)` 的神奇优化。

## 1. 并查集的核心原理

### 直觉：每个圈子选一个“老大”

并查集的核心思想是：用一棵**树**来表示一个集合（朋友圈），树的**根节点**就是这个集合的代表（“老大”）。

*   **判断是否同伙**：想知道两个人是不是一个圈子的，就看他们各自的“老大”是不是同一个人。
*   **合并两个圈子**：想让两个圈子合并，只需要让一个圈子的“老大”认另一个圈子的“老大”为自己的“老大”即可。

### 严谨原理：用数组模拟树

我们通常使用一个数组 `parent` 来模拟这种树形结构。

`parent[i]` 存储的是节点 `i` 的**父节点**。

**特殊约定**：如果一个节点是根节点（“老大”），那么它的父节点就是它自己，即 `parent[i] = i`。

### 关键图示：并查集的存储结构

![并查集的数组表示](https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/dsu-array-representation.png)
*用一个 parent 数组即可表示出整个森林的结构*

## 2. 核心操作

### 2.1 Find：找老大

`find(i)` 操作就是从节点 `i` 开始，沿着 `parent` 数组不断向上查找，直到找到根节点（即 `parent[i] == i` 的节点）。

#### 伪代码

```pseudocode
function find(i):
  // 如果当前节点不是根节点
  while parent[i] != i:
    // 继续向上找
    i = parent[i]
  return i
```

### 2.2 Union：合并团伙

`union(i, j)` 操作就是将节点 `i` 和节点 `j` 所在的两个集合合并。

#### 动画式案例：合并集合

**场景**：合并节点 `1` 和节点 `4` 所在的两个集合。

**初始状态**：
- 集合1: `1 -> 0`, `2 -> 0` (根是 0)
- 集合2: `4 -> 3` (根是 3)

![并查集的合并操作](https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/dsu-union-operation.png)

**步骤解析**：
1.  **`find(1)`**：找到节点 `1` 的根是 `0`。
2.  **`find(4)`**：找到节点 `4` 的根是 `3`。
3.  **合并**：根 `0` 和 `3` 不相同，执行合并。将一个根指向另一个，例如 `parent[0] = 3`。

**最终状态**：两个集合合并成一个，所有节点的最终根都变成了 `3`。

#### 伪代码

```pseudocode
function union(i, j):
  root_i = find(i)
  root_j = find(j)
  
  if root_i != root_j:
    parent[root_i] = root_j
```

## 3. 关键优化：让查询飞起来

上述基础版本的并查集，在最坏情况下，树可能退化成一条链。此时 `find` 操作的时间复杂度为 `O(n)`，效率很低。

为了解决这个问题，我们引入两种强大的优化：**路径压缩**和**按秩合并**。

### 3.1 路径压缩 (Path Compression)

**思想**：在 `find` 的过程中，将查找路径上的所有节点**直接指向根节点**。这样下次再查找这些节点时，就能一步到位。

**直觉**：小弟找老大的过程中，沿途遇到的所有“中层领导”都直接拜老大为老大。这样，整个组织结构变得极其扁平化。

#### 动画式案例：路径压缩

**场景**：在一个形如 `4 -> 3 -> 2 -> 1 -> 0` 的链状结构中执行 `find(4)`。

![路径压缩动画](https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/dsu-path-compression.gif)
*图片来源: visualgo.net*

**过程解析**：
1.  **查找**：从节点 4 开始，沿着父节点指针一路向上，直到找到根节点 0。
2.  **压缩**：在回溯的过程中，将路径上经过的所有节点（4, 3, 2, 1）的父指针直接指向根节点 0。
3.  **结果**：树的结构变得极其扁平，下次对这些节点执行 `find` 操作时，将直接一步到位。

#### 伪代码 (递归实现)

```pseudocode
function find_with_compression(i):
  if parent[i] == i:
    return i
  // 递归查找根节点，并将路径上所有节点的父节点设为根节点
  parent[i] = find_with_compression(parent[i])
  return parent[i]
```

路径压缩是**最重要**的优化，仅此一项就能极大地提升并查集的性能。

### 3.2 按秩合并 (Union by Rank/Size)

**思想**：在 `union` 操作时，总是将**较小的树**合并到**较大的树**上。这样可以有效地避免树的高度过快增长。

**直觉**：小帮派并入大帮派，而不是反过来。这样能保持整个组织的结构相对平衡。

**实现**：
*   **按秩 (Rank)**：用一个 `rank` 数组记录每棵树的高度（或深度）。合并时，总是将高度较小的树的根指向高度较大的树的根。
*   **按大小 (Size)**：用一个 `size` 数组记录每个集合的元素数量。合并时，总是将元素数量较少的集合合并到较多的集合上。

![按秩合并与朴素合并的对比](https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/dsu-union-by-rank.png)
*左图：按秩合并，小树合并到大树，树高增长缓慢。右图：朴素合并，大树合并到小树，树高快速增长，可能退化成链。*

#### 伪代码 (按秩合并)

```pseudocode
// 初始化: rank 数组全为 1
function union_by_rank(i, j):
  root_i = find(i)
  root_j = find(j)
  
  if root_i != root_j:
    if rank[root_i] < rank[root_j]:
      parent[root_i] = root_j
    else if rank[root_i] > rank[root_j]:
      parent[root_j] = root_i
    else: // rank 相等
      parent[root_j] = root_i
      rank[root_i] = rank[root_i] + 1
```

## 4. Python 实现 (带优化)

```python
class DSU:
    def __init__(self, n):
        # 初始化，每个元素的父节点是自己
        self.parent = list(range(n))
        # 初始化，每个集合的大小为 1
        self.size = [1] * n

    def find(self, i):
        """查找根节点，并进行路径压缩"""
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        """按大小合并两个集合"""
        root_i = self.find(i)
        root_j = self.find(j)

        if root_i != root_j:
            # 将小树合并到大树
            if self.size[root_i] < self.size[root_j]:
                root_i, root_j = root_j, root_i # 交换
            
            self.parent[root_j] = root_i
            self.size[root_i] += self.size[root_j]
            return True # 返回 True 表示成功合并
        return False # 返回 False 表示已在同一集合

# 示例
dsu = DSU(10)
dsu.union(1, 2)
dsu.union(2, 3)
dsu.union(5, 6)

print(dsu.find(1) == dsu.find(3)) # 输出: True
print(dsu.find(1) == dsu.find(5)) # 输出: False
```

## 5. 复杂度分析

当同时使用**路径压缩**和**按秩/大小合并**这两种优化时，并查集的操作时间复杂度可以达到**近乎 `O(1)`**。

严格来说，其时间复杂度是 `O(α(n))`，其中 `α(n)` 是**反阿克曼函数**。这个函数增长极其缓慢，对于所有实际应用中的 `n`，`α(n)` 的值都不会超过 5。因此，我们可以认为它是常数时间。

| 操作 | 最坏情况 (无优化) | 平均情况 (带优化) |
|:---|:---:|:---:|
| **Find** | `O(n)` | `O(α(n))` (近乎 `O(1)`) |
| **Union** | `O(n)` | `O(α(n))` (近乎 `O(1)`) |

**空间复杂度**：`O(n)`，需要存储 `parent` 和 `rank/size` 数组。

## 6. 应用场景

1.  **最小生成树 (Kruskal 算法)**：在构建最小生成树时，用并查集来判断加入一条边是否会形成环。
2.  **判断图的连通性**：遍历图的所有边，对边的两个顶点进行 `union` 操作。最后，如果所有节点都在一个集合中，则图是连通的。
3.  **计算连通分量数量**：初始化时有 `n` 个连通分量。每成功 `union` 一次，连通分量数量减一。
4.  **LeetCode 经典题**：
    *   “省份数量” (Number of Provinces)
    *   “朋友圈” (Friend Circles)
    *   “等式方程的可满足性” (Satisfiability of Equality Equations)

## 7. 总结

并查集是一种看似简单，实则非常精妙的数据结构。它专注于解决动态连通性问题，并通过两种核心优化，将操作效率提升到了极致。

*   **核心思想**：用**树（森林）**表示集合，用**根节点**作为集合代表。
*   **两大操作**：`find` (找老大) 和 `union` (合并团伙)。
*   **两大优化**：
    *   **路径压缩**：`find` 时让路径上的节点直连根节点，使树**扁平化**。
    *   **按秩/大小合并**：`union` 时将小树并入大树，使树**平衡化**。
*   **惊人效率**：经过优化后，操作时间复杂度近乎 `O(1)`。

掌握了并查集，你就拥有了高效解决“朋友圈”这类问题的强大工具。在下一篇文章中，我们将回到二叉树，学习一种非常重要的有序树结构——**二叉搜索树**。

