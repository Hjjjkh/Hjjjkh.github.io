---
title: Part 2.6：堆与优先队列：O(log n) 的动态极值查找
categories:
  - 大学算法全体系
  - Part 2：基础数据结构
tags:
  - 数据结构
  - 堆
  - 优先队列
  - 完全二叉树
  - 堆排序
description: >-
  堆是一种特殊的完全二叉树，能在 O(log n)
  时间内完成插入和删除最值操作。本文将深入剖析大顶堆和小顶堆的原理、堆化过程、数组实现，以及其在优先队列、Top-K 问题、堆排序等场景中的经典应用。
abbrlink: 633a1b38
date: 2025-11-15 20:30:00
---

## 引言：如何快速找到"最重要"的任务？

想象你是一个操作系统的任务调度器，面前有成百上千个任务等待执行。每个任务都有一个优先级。你需要**始终**执行优先级最高的任务。

如果用普通数组存储这些任务，每次找到优先级最高的任务需要 `O(n)` 时间。如果用排序数组，虽然查找最值是 `O(1)`，但插入新任务需要 `O(n)` 时间。有没有一种数据结构，能同时高效地完成"插入"和"取出最值"这两个操作呢？

答案就是我们今天的主角——**堆 (Heap)**，以及基于堆实现的**优先队列 (Priority Queue)**。

**为什么堆如此重要？**

*   **面试价值**：堆是面试中的高频考点。Top-K 问题、数据流中的中位数、合并 K 个有序链表……这些经典题目的最优解都离不开堆。
*   **工程价值**：操作系统的任务调度、网络数据包的优先级处理、Dijkstra 最短路径算法……堆在系统底层和算法优化中无处不在。

本文将带你深入理解堆的原理、实现和应用，让你掌握这个强大的"动态极值查找"利器。

## 1. 堆的核心原理

### 直觉：一个"半有序"的完全二叉树

堆是一棵**完全二叉树**，它满足一个特殊的性质——**堆性质 (Heap Property)**：

*   **大顶堆 (Max Heap)**：每个节点的值都**大于或等于**其子节点的值。因此，根节点是整棵树的最大值。
*   **小顶堆 (Min Heap)**：每个节点的值都**小于或等于**其子节点的值。因此，根节点是整棵树的最小值。

堆不要求左右子树之间有任何大小关系，只要求父节点与子节点之间的关系。这使得堆比二叉搜索树更"宽松"，但也足以让我们快速找到最值。

### 关键图示：大顶堆与小顶堆

> **图示标题：大顶堆示例**
> ```
>       90
>      /  \
>    80    70
>   / \    /
>  50  60 40
> ```
> 每个父节点都大于其子节点。根节点 90 是最大值。

> **图示标题：小顶堆示例**
> ```
>       10
>      /  \
>    20    30
>   / \    /
>  40  50 60
> ```
> 每个父节点都小于其子节点。根节点 10 是最小值。

### 数组实现

由于堆是完全二叉树，我们可以用**数组**来高效地存储它。

**索引关系** (假设根节点索引为 0)：
*   父节点索引 `i` 的左子节点索引：`2*i + 1`
*   父节点索引 `i` 的右子节点索引：`2*i + 2`
*   子节点索引 `i` 的父节点索引：`(i - 1) // 2`

## 2. 核心操作：堆化 (Heapify)

堆的所有操作都围绕着一个核心过程——**堆化 (Heapify)**，即维护堆性质的过程。

### 2.1 向上堆化 (Heapify Up / Sift Up)

**使用场景**：在堆的**末尾**插入一个新元素后，需要将其"上浮"到正确的位置。

**步骤**：
1.  将新元素放在数组的末尾（完全二叉树的最后一个位置）。
2.  比较它与其父节点的值。
3.  如果违反了堆性质（大顶堆中子节点大于父节点，或小顶堆中子节点小于父节点），就交换它们。
4.  重复步骤 2-3，直到满足堆性质或到达根节点。

**动画式案例**：向大顶堆 `[90, 80, 70, 50, 60, 40]` 中插入 `85`。

1.  **初始状态**: `[90, 80, 70, 50, 60, 40]`
2.  **插入 85**: `[90, 80, 70, 50, 60, 40, 85]`
3.  **比较 85 与父节点 70**: `85 > 70`，交换。 `[90, 80, 85, 50, 60, 40, 70]`
4.  **比较 85 与父节点 90**: `85 < 90`，满足堆性质，停止。
5.  **最终状态**: `[90, 80, 85, 50, 60, 40, 70]`

### 2.2 向下堆化 (Heapify Down / Sift Down)

**使用场景**：删除堆顶元素后，需要将新的堆顶"下沉"到正确的位置。

**步骤**：
1.  将堆顶元素（根节点）与堆的最后一个元素交换，然后删除最后一个元素。
2.  从新的根节点开始，比较它与其两个子节点的值。
3.  如果违反了堆性质，就将它与**更大的子节点**（大顶堆）或**更小的子节点**（小顶堆）交换。
4.  重复步骤 2-3，直到满足堆性质或到达叶子节点。

**动画式案例**：从大顶堆 `[90, 80, 85, 50, 60, 40, 70]` 中删除堆顶 `90`。

1.  **初始状态**: `[90, 80, 85, 50, 60, 40, 70]`
2.  **交换堆顶与末尾**: `[70, 80, 85, 50, 60, 40, 90]`
3.  **删除末尾**: `[70, 80, 85, 50, 60, 40]`
4.  **比较 70 与子节点 80, 85**: 最大的是 85，交换。 `[85, 80, 70, 50, 60, 40]`
5.  **比较 70 与子节点 40**: `70 > 40`，满足堆性质，停止。
6.  **最终状态**: `[85, 80, 70, 50, 60, 40]`

## 3. Python 实现

### 伪代码：大顶堆的核心操作

```pseudocode
class MaxHeap:
  constructor():
    this.heap = []
  
  // 插入元素
  function insert(value):
    this.heap.append(value)
    this._heapify_up(len(this.heap) - 1)
  
  // 删除并返回最大值
  function extract_max():
    if len(this.heap) == 0: Error("Heap is empty")
    max_value = this.heap[0]
    this.heap[0] = this.heap[len(this.heap) - 1]
    this.heap.pop()
    this._heapify_down(0)
    return max_value
  
  // 向上堆化
  function _heapify_up(index):
    parent = (index - 1) // 2
    if index > 0 and this.heap[index] > this.heap[parent]:
      swap(this.heap[index], this.heap[parent])
      this._heapify_up(parent)
  
  // 向下堆化
  function _heapify_down(index):
    largest = index
    left = 2 * index + 1
    right = 2 * index + 2
    
    if left < len(this.heap) and this.heap[left] > this.heap[largest]:
      largest = left
    if right < len(this.heap) and this.heap[right] > this.heap[largest]:
      largest = right
    
    if largest != index:
      swap(this.heap[index], this.heap[largest])
      this._heapify_down(largest)
```

### Python 实现：使用 `heapq` 模块

Python 的 `heapq` 模块提供了一个高效的**小顶堆**实现。

```python
import heapq

# 创建一个空堆
heap = []

# 插入元素
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
heapq.heappush(heap, 20)
print(f"Heap after pushes: {heap}") # 输出: [5, 10, 20]

# 弹出最小值
min_value = heapq.heappop(heap)
print(f"Popped min value: {min_value}") # 输出: 5
print(f"Heap after pop: {heap}") # 输出: [10, 20]

# 将普通列表转换为堆
data = [30, 10, 50, 20]
heapq.heapify(data)
print(f"Heapified list: {data}") # 输出: [10, 20, 50, 30]
```

**注意**：`heapq` 只提供小顶堆。如果需要大顶堆，可以将所有元素取负后插入。

## 4. 复杂度分析

| 操作 | 时间复杂度 | 说明 |
|:---|:---:|:---|
| **插入 (Insert)** | `O(log n)` | 最多需要向上堆化 `log n` 层 |
| **删除最值 (Extract Max/Min)** | `O(log n)` | 最多需要向下堆化 `log n` 层 |
| **查看最值 (Peek)** | `O(1)` | 直接访问堆顶 |
| **建堆 (Heapify)** | `O(n)` | 从一个无序数组构建堆 |

**空间复杂度**：`O(n)`，需要存储 `n` 个元素。

## 5. 应用场景

### 5.1 优先队列 (Priority Queue)

优先队列是一种抽象数据类型，元素按优先级出队，而非按插入顺序。堆是实现优先队列的最佳数据结构。

```python
import heapq

# 使用元组 (priority, task) 来实现优先队列
pq = []
heapq.heappush(pq, (3, "Task C"))
heapq.heappush(pq, (1, "Task A"))
heapq.heappush(pq, (2, "Task B"))

while pq:
    priority, task = heapq.heappop(pq)
    print(f"Processing {task} with priority {priority}")
# 输出:
# Processing Task A with priority 1
# Processing Task B with priority 2
# Processing Task C with priority 3
```

### 5.2 Top-K 问题

**问题**：从 `n` 个元素中找出最大的 `k` 个元素。

**解法**：维护一个大小为 `k` 的**小顶堆**。遍历所有元素，如果当前元素大于堆顶，就替换堆顶并重新堆化。最终堆中的 `k` 个元素就是最大的 `k` 个。

**时间复杂度**：`O(n log k)`，远优于排序的 `O(n log n)`。

### 5.3 堆排序

堆排序是一种基于堆的排序算法。我们将在后续章节详细讲解。

### 5.4 Dijkstra 最短路径算法

在图论中，Dijkstra 算法使用优先队列（堆）来高效地找到下一个待访问的最近节点。

## 6. 总结

堆是一种特殊的完全二叉树，通过维护堆性质，实现了 `O(log n)` 的插入和删除最值操作。

*   **核心**：堆性质（父节点与子节点的大小关系）。
*   **关键操作**：向上堆化和向下堆化。
*   **实现**：用数组存储完全二叉树，利用索引关系访问父子节点。
*   **应用**：优先队列、Top-K 问题、堆排序、图算法。

掌握了堆，你就拥有了解决"动态极值查找"问题的利器。在下一篇文章中，我们将学习另一种高效的数据结构——**并查集**，它在处理"连通性"问题时有着独特的优势。

