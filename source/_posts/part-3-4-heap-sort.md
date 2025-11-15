---
title: Part 3.4：堆排序：原地 O(n log n) 的选择
categories:
  - 大学算法全体系
  - Part 3：排序与查找算法
tags:
  - 算法
  - 堆排序
  - Heap Sort
  - 堆
  - 原地排序
description: 堆排序结合了堆数据结构与排序算法，实现了原地 O(n log n) 排序。本文将讲解建堆过程、堆排序的两个阶段，以及其在时间和空间上的权衡。
abbrlink: 9ca86d2f
date: 2025-11-15 23:30:00
---

## 引言

堆排序是一种基于**堆**数据结构的排序算法。它结合了归并排序的 `O(n log n)` 时间复杂度和快速排序的原地排序特性，是一种非常实用的排序算法。

**核心思想**：
1.  将数组构建成一个大顶堆。
2.  反复将堆顶（最大值）与堆的最后一个元素交换，然后缩小堆的范围并重新堆化。

## 1. 算法步骤

### 阶段一：建堆 (Heapify)

将无序数组转换为大顶堆。从最后一个非叶子节点开始，自底向上进行向下堆化。

**时间复杂度**：`O(n)`（虽然看起来是 `O(n log n)`，但数学证明其为 `O(n)`）

### 阶段二：排序

1.  将堆顶（最大值）与堆的最后一个元素交换。
2.  将堆的大小减 1。
3.  对新的堆顶进行向下堆化。
4.  重复步骤 1-3，直到堆的大小为 1。

**时间复杂度**：`O(n log n)`

## 2. Python 实现

```python
def heap_sort(arr):
    n = len(arr)
    
    # 阶段一：建堆
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # 阶段二：排序
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0] # 交换
        heapify(arr, i, 0) # 堆化

def heapify(arr, n, i):
    """向下堆化"""
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# 使用
arr = [12, 11, 13, 5, 6, 7]
heap_sort(arr)
print(arr) # 输出: [5, 6, 7, 11, 12, 13]
```

## 3. 复杂度分析

*   **时间复杂度**：`O(n log n)`（所有情况）
*   **空间复杂度**：`O(1)`（原地排序）
*   **稳定性**：**不稳定**

## 4. 优劣势

**优势**：
*   时间复杂度稳定在 `O(n log n)`
*   原地排序，空间复杂度 `O(1)`

**劣势**：
*   不稳定
*   实际性能通常不如快速排序（缓存不友好）

## 5. 总结

堆排序是一种实用的排序算法，特别适合需要原地排序且对最坏情况有要求的场景。它是对选择排序的改进，通过堆结构将"选择最大值"的时间从 `O(n)` 降到了 `O(log n)`。

