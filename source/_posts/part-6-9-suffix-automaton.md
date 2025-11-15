---
title: Part 6.9：后缀自动机 (SAM)——字符串算法的集大成者
categories:
  - 大学算法全体系
  - Part 6：字符串算法
tags:
  - 字符串
  - 后缀自动机
  - Suffix Automaton
  - SAM
  - 自动机
  - 算法进阶
description: >-
  后缀自动机（Suffix Automaton,
  SAM）是字符串算法领域的皇冠明珠，它是一个能够识别一个字符串所有子串的最小确定性有限自动机（DFA）。SAM
  不仅能解决后缀数组能解决的所有问题，还能处理更复杂的在线查询、动态添加字符等场景。本文将从自动机的基本概念出发，深入讲解 SAM
  的构建原理、状态转移、后缀链接等核心机制，并通过 Python 代码和实际案例，带你征服这座字符串算法的最高峰。
abbrlink: ae7bde1f
date: 2025-11-21 01:00:00
---

## 引言：字符串算法的终极武器

在前面的文章中，我们学习了 KMP、字符串哈希、Trie、AC 自动机、后缀数组等一系列强大的字符串算法。它们各有所长，但也各有局限。有没有一种数据结构，能够：
-   **识别字符串的所有子串**（像后缀数组一样）。
-   **支持在线查询**（不需要预先知道所有模式串）。
-   **动态添加字符**（字符串可以增长）。
-   **时间和空间复杂度都是线性的**。

答案是肯定的，这就是**后缀自动机 (Suffix Automaton, SAM)**。

SAM 是一个**确定性有限自动机 (DFA)**，它能够识别一个字符串的所有后缀（因此也能识别所有子串）。更重要的是，它是满足这一条件的**状态数最少**的自动机。SAM 的构建过程优雅而高效，它在字符串算法领域有着无可替代的地位。

## 核心概念

### 什么是自动机？

**自动机 (Automaton)** 是一个抽象的计算模型，由以下几部分组成：
1.  **状态集合**：自动机在任意时刻都处于某个状态。
2.  **初始状态**：自动机的起始状态。
3.  **接受状态集合**：如果自动机在读完输入后处于接受状态，则接受该输入。
4.  **转移函数**：定义了在当前状态下，读入一个字符后应该转移到哪个状态。

### 什么是后缀自动机？

对于一个字符串 `S`，它的**后缀自动机**是一个能够识别 `S` 的所有后缀的最小 DFA。

更准确地说，SAM 具有以下性质：
1.  从初始状态出发，沿着某条路径读入字符串 `T`，如果最终到达一个接受状态，则 `T` 是 `S` 的一个后缀。
2.  由于 `S` 的任意子串都是某个后缀的前缀，因此 SAM 也能识别 `S` 的所有子串（只是不一定到达接受状态）。

### SAM 的核心概念

#### 1. 状态 (State)

SAM 中的每个状态代表一个**等价类**，这个等价类包含了若干个**子串**。这些子串有一个共同的性质：**它们在 `S` 中的所有出现位置的集合是相同的**。

例如，对于字符串 `"abcbc"`：
-   子串 `"bc"` 在位置 1 和位置 3 出现。
-   子串 `"c"` 在位置 2 和位置 4 出现。
-   它们属于不同的等价类，因此对应不同的状态。

#### 2. 转移 (Transition)

从状态 `s` 沿着字符 `c` 的转移，到达状态 `t`，意味着：如果 `s` 代表的子串集合为 `{str₁, str₂, ...}`，那么 `t` 代表的子串集合为 `{str₁+c, str₂+c, ...}`。

#### 3. 后缀链接 (Suffix Link)

每个状态（除了初始状态）都有一个**后缀链接 (link)**，指向另一个状态。后缀链接的定义是：

> 状态 `s` 的后缀链接指向的状态 `t`，代表的是 `s` 所代表的最长子串的**最长真后缀**所在的等价类。

后缀链接构成了一棵**树**，称为**后缀链接树**或 **Parent Tree**。这棵树的性质非常重要，它在许多 SAM 的应用中都起着关键作用。

#### 4. 长度 (len)

每个状态 `s` 有一个属性 `len[s]`，表示该状态所代表的**最长子串的长度**。

同一个状态代表的所有子串的长度是连续的，范围是 `[len[link[s]] + 1, len[s]]`。

## 构建 SAM：在线增量算法

SAM 的构建是一个**在线**的过程，我们可以逐个字符地添加到 SAM 中。每次添加一个字符，SAM 的状态数最多增加 1 个。

### 算法步骤

假设我们已经构建了字符串 `S` 的 SAM，现在要添加一个新字符 `c`，构建 `S + c` 的 SAM。

1.  **创建新状态 `cur`**：代表以新字符 `c` 结尾的所有后缀。
2.  **从 `last` 开始，沿着后缀链接向上走**：
    -   `last` 是添加 `c` 之前的最后一个状态（代表整个字符串 `S`）。
    -   对于每个状态 `p`，如果 `p` 没有字符 `c` 的转移，就添加一个转移到 `cur`。
    -   如果遇到一个状态 `p` 已经有字符 `c` 的转移（指向状态 `q`），就停止。
3.  **处理已有的转移**：
    -   如果 `len[q] == len[p] + 1`，说明 `q` 就是 `cur` 的后缀链接。
    -   否则，需要**克隆**状态 `q`，创建一个新状态 `clone`，并调整相关的转移和后缀链接。
4.  **更新 `last`**：将 `last` 设置为 `cur`。

这个算法的正确性证明较为复杂，但它的实现却非常简洁。

## Python 实现

下面是一个完整的后缀自动机实现，包括构建和一些基本应用。

```python
class SAMNode:
    def __init__(self):
        self.trans = {}  # 转移字典: char -> SAMNode
        self.link = None  # 后缀链接
        self.len = 0      # 最长子串的长度

class SuffixAutomaton:
    def __init__(self):
        self.root = SAMNode()
        self.last = self.root
        self.nodes = [self.root]  # 所有节点的列表
    
    def extend(self, c: str) -> None:
        """向 SAM 中添加一个字符"""
        cur = SAMNode()
        cur.len = self.last.len + 1
        self.nodes.append(cur)
        
        p = self.last
        # 沿着后缀链接向上，添加转移
        while p is not None and c not in p.trans:
            p.trans[c] = cur
            p = p.link
        
        if p is None:
            # 没有找到已有的转移，cur 的后缀链接指向根
            cur.link = self.root
        else:
            q = p.trans[c]
            if q.len == p.len + 1:
                # q 正好是我们需要的状态
                cur.link = q
            else:
                # 需要克隆 q
                clone = SAMNode()
                clone.len = p.len + 1
                clone.trans = q.trans.copy()
                clone.link = q.link
                self.nodes.append(clone)
                
                # 更新后缀链接
                while p is not None and p.trans.get(c) == q:
                    p.trans[c] = clone
                    p = p.link
                
                q.link = clone
                cur.link = clone
        
        self.last = cur
    
    def build(self, s: str) -> None:
        """构建字符串 s 的后缀自动机"""
        for c in s:
            self.extend(c)
    
    def contains(self, t: str) -> bool:
        """判断子串 t 是否在原字符串中出现"""
        node = self.root
        for c in t:
            if c not in node.trans:
                return False
            node = node.trans[c]
        return True
    
    def count_distinct_substrings(self) -> int:
        """统计不同子串的数量"""
        # 每个状态代表的不同子串数量 = len[s] - len[link[s]]
        count = 0
        for node in self.nodes:
            if node != self.root:
                link_len = node.link.len if node.link else 0
                count += node.len - link_len
        return count
    
    def longest_common_substring(self, t: str) -> str:
        """找出原字符串和 t 的最长公共子串"""
        node = self.root
        length = 0
        max_length = 0
        max_pos = 0
        
        for i, c in enumerate(t):
            # 尝试沿着转移走
            while node != self.root and c not in node.trans:
                node = node.link
                length = node.len
            
            if c in node.trans:
                node = node.trans[c]
                length += 1
            else:
                node = self.root
                length = 0
            
            if length > max_length:
                max_length = length
                max_pos = i
        
        return t[max_pos - max_length + 1 : max_pos + 1]

# --- 案例测试 ---
sam = SuffixAutomaton()
s = "abcbc"
sam.build(s)

print(f"字符串: {s}")
print(f"状态数: {len(sam.nodes)}")
print(f"不同子串数量: {sam.count_distinct_substrings()}")
print(f"是否包含 'bcb': {sam.contains('bcb')}")
print(f"是否包含 'bcd': {sam.contains('bcd')}")

t = "xbcbcy"
lcs = sam.longest_common_substring(t)
print(f"与 '{t}' 的最长公共子串: '{lcs}'")

# 输出:
# 字符串: abcbc
# 状态数: 8
# 不同子串数量: 12
# 是否包含 'bcb': True
# 是否包含 'bcd': False
# 与 'xbcbcy' 的最长公共子串: 'bcbc'
```

## 复杂度分析

-   **构建时间复杂度**: `O(N)`，其中 `N` 是字符串的长度。虽然有嵌套循环，但每条边最多被访问常数次。
-   **状态数**: 最多 `2N - 1` 个状态。
-   **转移数**: 最多 `3N - 4` 条转移。
-   **空间复杂度**: `O(N * C)`，其中 `C` 是字符集的大小。

## 经典应用

### 1. 判断子串是否存在

从根节点出发，沿着转移走，如果能走完整个模式串，则该子串存在。时间复杂度 `O(M)`。

### 2. 统计不同子串的数量

每个状态代表的不同子串数量 = `len[s] - len[link[s]]`。将所有状态的贡献相加即可。

### 3. 最长公共子串

构建一个字符串的 SAM，然后用另一个字符串在 SAM 上"跑"，记录能匹配的最长长度。

### 4. 第 K 小子串

在 SAM 上进行 DFS，按字典序遍历所有子串，找到第 K 个。

### 5. 多个字符串的最长公共子串

构建第一个字符串的 SAM，然后用其他字符串在 SAM 上匹配，记录每个状态的最小匹配长度。

## SAM vs 后缀数组

| 特性 | 后缀数组 | 后缀自动机 |
|------|---------|-----------|
| 构建时间 | `O(N log N)` | `O(N)` |
| 空间复杂度 | `O(N)` | `O(N * C)` |
| 在线构建 | ❌ | ✅ |
| 子串查询 | `O(M log N)` | `O(M)` |
| 实现难度 | 中等 | 较高 |
| 功能 | 强大 | 更强大 |

## 总结

后缀自动机是字符串算法领域的巅峰之作，它将自动机理论和字符串处理完美结合，提供了一种优雅而高效的方式来处理几乎所有的子串问题。虽然它的理论较为深奥，实现也相对复杂，但一旦掌握，你就拥有了解决字符串问题的终极武器。

### 本文核心要点

✅ **核心概念**：SAM 是识别字符串所有后缀的最小 DFA。
✅ **状态**：每个状态代表一个子串等价类（出现位置集合相同）。
✅ **后缀链接**：指向最长子串的最长真后缀所在的状态，构成一棵树。
✅ **构建算法**：在线增量算法，每次添加一个字符，时间复杂度 `O(1)` 均摊。
✅ **应用广泛**：子串查询、不同子串计数、最长公共子串、第 K 小子串等。
✅ **优势**：线性时间构建，支持在线查询，功能极其强大。

掌握了后缀自动机，你就站在了字符串算法的最高峰。它不仅是算法竞赛中的大杀器，也是深入理解字符串结构的绝佳工具。

---

## Part 6 总结：字符串算法全景图

至此，我们完成了 Part 6 字符串算法的全部内容。让我们回顾一下这个系列涵盖的所有算法：

1.  **Part 6.1：暴力匹配** - 字符串匹配的起点，理解问题的本质。
2.  **Part 6.2：KMP 算法** - 单模式匹配的经典算法，`O(N+M)` 的优雅解法。
3.  **Part 6.3：BM 算法** - 实践中最快的单模式匹配算法，坏字符和好后缀规则。
4.  **Part 6.4：Manacher 算法** - 线性时间找出最长回文子串的神奇算法。
5.  **Part 6.5：字符串哈希** - `O(1)` 比较子串，Rabin-Karp 的核心。
6.  **Part 6.6：Trie 树** - 前缀查询的利器，自动补全的基础。
7.  **Part 6.7：AC 自动机** - 多模式匹配的终极武器，Trie + KMP 的完美结合。
8.  **Part 6.8：后缀数组** - 处理子串问题的瑞士军刀，排序后缀的力量。
9.  **Part 6.9：后缀自动机** - 字符串算法的集大成者，最小 DFA 的优雅。

这些算法各有所长，共同构成了字符串算法的完整体系。从简单的暴力匹配到复杂的后缀自动机，每一个算法都是人类智慧的结晶。掌握了这些算法，你就拥有了解决几乎所有字符串问题的能力。

字符串算法的学习之旅到此告一段落，但算法的探索永无止境。在接下来的 Part 7 中，我们将进入另一个激动人心的领域——**图论算法**，敬请期待！
