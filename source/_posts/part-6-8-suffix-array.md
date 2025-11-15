---
title: Part 6.8：后缀数组 (Suffix Array)——子串问题的强大工具
categories:
  - 大学算法全体系
  - Part 6：字符串算法
tags:
  - 字符串
  - 后缀数组
  - Suffix Array
  - LCP
  - 最长公共前缀
  - 算法进阶
description: >-
  后缀数组（Suffix Array）是处理字符串子串问题的瑞士军刀。它通过对字符串的所有后缀进行排序，将许多看似复杂的子串问题转化为简单的数组操作。配合
  LCP（最长公共前缀）数组，后缀数组能够高效解决最长重复子串、不同子串计数、字符串匹配等一系列经典问题。本文将从后缀数组的定义出发，详细讲解倍增算法的构建过程，并通过
  Python 代码和实际案例，带你掌握这一强大的字符串工具。
abbrlink: 96dd7304
date: 2025-11-20 01:00:00
---

## 引言：当我们需要处理所有子串

在字符串算法中，有一类问题需要我们考虑字符串的**所有子串**。例如：
-   找出字符串中的**最长重复子串**。
-   统计字符串中有多少个**不同的子串**。
-   在一个字符串中**快速查找**另一个字符串是否出现。

这些问题如果用暴力方法，往往需要 `O(N²)` 甚至 `O(N³)` 的时间复杂度。有没有一种数据结构，能让我们更高效地处理这些问题呢？

答案是**后缀数组 (Suffix Array)**。它是一种空间高效、功能强大的数据结构，通过对字符串的所有后缀进行排序，将许多复杂的子串问题转化为简单的数组操作。

## 核心概念

### 什么是后缀？

对于一个字符串 `S`，它的**后缀 (Suffix)** 是指从某个位置开始到字符串末尾的子串。

例如，字符串 `"banana"` 的所有后缀为：
```
0: banana
1: anana
2: nana
3: ana
4: na
5: a
```

### 什么是后缀数组？

**后缀数组 (Suffix Array, SA)** 是一个整数数组，它存储了字符串所有后缀的**起始位置**，并且这些后缀是按照**字典序排序**的。

对于 `"banana"`，我们先列出所有后缀及其字典序排序：
```
5: a
3: ana
1: anana
0: banana
4: na
2: nana
```

因此，后缀数组 `SA = [5, 3, 1, 0, 4, 2]`。

> **关键洞察**：字符串的任意子串都是某个后缀的前缀。因此，通过对后缀排序，我们可以快速定位和比较子串。

## 构建后缀数组：倍增算法

朴素地构建后缀数组需要对所有后缀进行排序，每次比较的时间复杂度是 `O(N)`，总时间复杂度为 `O(N² log N)`，这在 `N` 很大时是不可接受的。

**倍增算法 (Doubling Algorithm)** 是一种经典的 `O(N log² N)` 算法，它的核心思想是：
1.  首先，按照每个后缀的**第一个字符**进行排序。
2.  然后，按照每个后缀的**前两个字符**进行排序。
3.  接着，按照每个后缀的**前四个字符**进行排序。
4.  以此类推，每次排序的长度翻倍，直到长度超过 `N`。

由于每次排序都可以利用上一次排序的结果，我们可以用**基数排序**在 `O(N)` 时间内完成每一轮排序，总共需要 `O(log N)` 轮，因此总时间复杂度为 `O(N log N)`。

## Python 实现

下面是一个使用倍增算法构建后缀数组的 Python 实现。

```python
def build_suffix_array(s: str) -> list[int]:
    """
    使用倍增算法构建后缀数组
    时间复杂度: O(N log N)
    """
    n = len(s)
    # 将字符串转换为整数数组（方便排序）
    s = [ord(c) for c in s]
    
    # sa[i] 表示排名第 i 的后缀的起始位置
    sa = list(range(n))
    # rank[i] 表示从位置 i 开始的后缀的排名
    rank = s[:]
    # tmp 用于存储新的 rank
    tmp = [0] * n
    
    k = 1  # 当前比较的长度
    while k < n:
        # 按照 (rank[i], rank[i+k]) 进行排序
        # 使用 Python 的稳定排序
        sa.sort(key=lambda i: (rank[i], rank[i + k] if i + k < n else -1))
        
        # 更新 rank
        tmp[sa[0]] = 0
        for i in range(1, n):
            # 如果两个后缀的前 2k 个字符相同，rank 相同
            prev = sa[i - 1]
            curr = sa[i]
            if rank[prev] == rank[curr] and \
               (rank[prev + k] if prev + k < n else -1) == (rank[curr + k] if curr + k < n else -1):
                tmp[curr] = tmp[prev]
            else:
                tmp[curr] = tmp[prev] + 1
        
        rank = tmp[:]
        k *= 2
    
    return sa

# --- 案例测试 ---
s = "banana"
sa = build_suffix_array(s)
print(f"字符串: {s}")
print(f"后缀数组: {sa}")
print("\n排序后的后缀:")
for i, pos in enumerate(sa):
    print(f"{i}: {s[pos:]}")

# 输出:
# 字符串: banana
# 后缀数组: [5, 3, 1, 0, 4, 2]
#
# 排序后的后缀:
# 0: a
# 1: ana
# 2: anana
# 3: banana
# 4: na
# 5: nana
```

## LCP 数组：后缀数组的黄金搭档

有了后缀数组，我们还需要一个辅助数组来解决更多问题，那就是 **LCP 数组 (Longest Common Prefix Array)**。

**LCP[i]** 表示排序后第 `i` 个后缀和第 `i-1` 个后缀的**最长公共前缀的长度**。

对于 `"banana"` 的后缀数组：
```
0: a        LCP[0] = 0 (没有前一个)
1: ana      LCP[1] = 1 (与 "a" 的 LCP 是 "a")
2: anana    LCP[2] = 3 (与 "ana" 的 LCP 是 "ana")
3: banana   LCP[3] = 0 (与 "anana" 的 LCP 是 "")
4: na       LCP[4] = 0 (与 "banana" 的 LCP 是 "")
5: nana     LCP[5] = 2 (与 "na" 的 LCP 是 "na")
```

因此，`LCP = [0, 1, 3, 0, 0, 2]`。

### 构建 LCP 数组：Kasai 算法

Kasai 算法可以在 `O(N)` 时间内构建 LCP 数组。它的核心观察是：如果后缀 `i` 和它在排序中的前一个后缀的 LCP 长度为 `h`，那么后缀 `i+1` 和它的前一个后缀的 LCP 长度至少为 `h-1`。

```python
def build_lcp_array(s: str, sa: list[int]) -> list[int]:
    """
    使用 Kasai 算法构建 LCP 数组
    时间复杂度: O(N)
    """
    n = len(s)
    # rank[i] 表示从位置 i 开始的后缀在 SA 中的排名
    rank = [0] * n
    for i in range(n):
        rank[sa[i]] = i
    
    lcp = [0] * n
    h = 0  # 当前 LCP 长度
    
    for i in range(n):
        if rank[i] > 0:
            j = sa[rank[i] - 1]  # 前一个后缀的起始位置
            # 计算 s[i:] 和 s[j:] 的 LCP
            while i + h < n and j + h < n and s[i + h] == s[j + h]:
                h += 1
            lcp[rank[i]] = h
            if h > 0:
                h -= 1
    
    return lcp

# --- 案例测试 ---
s = "banana"
sa = build_suffix_array(s)
lcp = build_lcp_array(s, sa)
print(f"LCP 数组: {lcp}")

# 输出:
# LCP 数组: [0, 1, 3, 0, 0, 2]
```

## 经典应用

### 1. 最长重复子串

**问题**：找出字符串中最长的重复子串（至少出现两次）。

**解法**：最长重复子串一定是某两个后缀的最长公共前缀。因此，答案就是 `max(LCP)`。

```python
def longest_repeated_substring(s: str) -> str:
    sa = build_suffix_array(s)
    lcp = build_lcp_array(s, sa)
    max_lcp = max(lcp)
    if max_lcp == 0:
        return ""
    idx = lcp.index(max_lcp)
    return s[sa[idx]:sa[idx] + max_lcp]

print(longest_repeated_substring("banana"))  # "ana"
```

### 2. 不同子串的数量

**问题**：统计字符串中有多少个不同的子串。

**解法**：
-   字符串的所有子串数量为 `N * (N + 1) / 2`。
-   但其中有重复的子串，重复的数量等于所有 LCP 值的和。
-   因此，不同子串的数量 = `N * (N + 1) / 2 - sum(LCP)`。

```python
def count_distinct_substrings(s: str) -> int:
    n = len(s)
    sa = build_suffix_array(s)
    lcp = build_lcp_array(s, sa)
    total = n * (n + 1) // 2
    return total - sum(lcp)

print(count_distinct_substrings("banana"))  # 15
```

### 3. 字符串匹配

**问题**：判断模式串 `P` 是否在文本串 `T` 中出现。

**解法**：在 `T` 的后缀数组中进行**二分查找**。由于后缀是排序的，我们可以在 `O(M log N)` 时间内找到所有匹配位置，其中 `M` 是模式串的长度。

## 复杂度分析

-   **构建后缀数组**: `O(N log N)` (倍增算法)。
-   **构建 LCP 数组**: `O(N)` (Kasai 算法)。
-   **空间复杂度**: `O(N)`。

## 总结

后缀数组是字符串算法中的一把瑞士军刀，它通过对后缀进行排序，将许多复杂的子串问题转化为简单的数组操作。配合 LCP 数组，它能够高效解决最长重复子串、不同子串计数、字符串匹配等一系列经典问题。

### 本文核心要点

✅ **核心概念**：后缀数组存储所有后缀的起始位置，按字典序排序。
✅ **构建算法**：倍增算法，时间复杂度 `O(N log N)`。
✅ **LCP 数组**：记录相邻后缀的最长公共前缀，用 Kasai 算法在 `O(N)` 时间内构建。
✅ **经典应用**：最长重复子串、不同子串计数、字符串匹配等。
✅ **优势**：空间高效，功能强大，是处理子串问题的利器。

掌握了后缀数组，你就拥有了解决大部分字符串子串问题的能力。在下一篇文章中，我们将学习字符串算法的终极武器——**后缀自动机 (Suffix Automaton)**，它比后缀数组更加强大和灵活。
