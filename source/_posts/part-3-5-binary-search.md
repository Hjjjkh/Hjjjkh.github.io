---
title: Part 3.5：二分查找：O(log n) 的有序搜索艺术
categories:
  - 大学算法全体系
  - Part 3：排序与查找算法
tags:
  - 算法
  - 二分查找
  - Binary Search
  - O(log n)
  - 查找算法
description: >-
  二分查找是在有序数组中进行高效搜索的经典算法。本文将深入讲解其 O(log n)
  的原理、三种写法（左闭右闭、左闭右开、递归），并探讨其在查找边界、旋转数组等变体问题中的应用，助你彻底掌握这个面试必考算法。
abbrlink: bb72f8b1
date: 2025-11-16 00:00:00
---

## 引言：猜数字游戏

想象一个猜数字游戏：我想了一个 1 到 100 之间的数，你来猜。你每猜一次，我告诉你"大了"、"小了"或"猜对了"。

最笨的方法是从 1 开始一个一个猜。但最快的方法是每次都猜中间的数：先猜 50，如果小了，就在 51-100 之间猜 75... 这种每次都将搜索范围缩小一半的策略，就是**二分查找 (Binary Search)**。

二分查找是一种在**有序数组**中查找特定元素的高效算法。它的时间复杂度为 `O(log n)`，远快于顺序查找的 `O(n)`。

**为什么二分查找如此重要？**

*   **面试必考**：二分查找及其变体是面试中最常考的算法之一，能很好地考察你的逻辑严谨性和边界处理能力。
*   **应用广泛**：在需要快速从有序数据中定位信息的场景，如数据库索引、字典查找等，都离不开二分查找的思想。

## 1. 核心原理

**前提**：数组必须是**有序的**。

**思想**：
1.  维护 `left` 和 `right` 两个指针，表示当前的搜索区间。
2.  计算中间位置 `mid`。
3.  比较 `arr[mid]` 与目标值 `target`：
    *   如果相等，则找到。
    *   如果 `arr[mid] < target`，说明 `target` 在右半部分，更新 `left = mid + 1`。
    *   如果 `arr[mid] > target`，说明 `target` 在左半部分，更新 `right = mid - 1`。
4.  重复步骤 2-3，直到 `left > right`，表示未找到。

## 2. Python 实现（三种写法）

### 写法一：左闭右闭 `[left, right]` (最常用)

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right: # 注意是 <=
        mid = left + (right - left) // 2 # 防止溢出
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1 # 未找到
```

### 写法二：左闭右开 `[left, right)`

```python
def binary_search_v2(arr, target):
    left, right = 0, len(arr) # 注意 right 的初始值
    
    while left < right: # 注意是 <
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid # 注意 right 的更新
    return -1
```

## 3. 复杂度分析

*   **时间复杂度**：`O(log n)`。每次搜索都将范围缩小一半。
*   **空间复杂度**：`O(1)`（迭代实现）。

## 4. 常见变体与应用

二分查找的强大之处在于其变体，用于解决"查找第一个/最后一个等于 target 的元素"、"查找第一个大于等于 target 的元素"等问题。

### 4.1 查找左边界

查找第一个大于或等于 `target` 的元素的索引。

```python
def find_left_bound(arr, target):
    left, right = 0, len(arr) - 1
    ans = -1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] >= target:
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans
```

### 4.2 旋转数组中的查找

**问题**：一个升序数组在某个点被旋转（如 `[4, 5, 6, 7, 0, 1, 2]`），查找 `target`。

**解法**：通过比较 `arr[mid]` 与 `arr[left]` 的大小，判断哪一半是有序的，然后在有序的那一半中进行二分查找。

## 5. 总结

二分查找是在有序数据中进行高效搜索的基石。

*   **核心**：每次将搜索范围缩小一半。
*   **前提**：数据必须有序。
*   **关键**：注意边界条件的处理（`<=` 还是 `<`，`right` 的更新）。
*   **应用**：不仅能查找特定值，还能高效地查找边界。

至此，**Part 3：排序与查找算法**已全部完成！在下一个 Part 中，我们将进入更复杂的**图论算法**世界。

