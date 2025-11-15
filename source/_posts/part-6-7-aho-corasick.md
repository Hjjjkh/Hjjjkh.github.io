---
title: Part 6.7：AC 自动机——多模式匹配的终极武器
categories:
  - 大学算法全体系
  - Part 6：字符串算法
tags:
  - 字符串
  - AC自动机
  - Aho-Corasick
  - 多模式匹配
  - Trie
  - KMP
  - 算法进阶
description: >-
  AC 自动机（Aho-Corasick Automaton）是字符串匹配领域的一座高峰，它巧妙地融合了 Trie 树和 KMP
  算法的精髓，能够在一次扫描中同时匹配多个模式串。无论是敏感词过滤、病毒特征码检测，还是文本挖掘，AC 自动机都是不可或缺的利器。本文将从零开始，带你理解
  AC 自动机的构建原理、失配指针的奥秘，以及如何用 Python 实现一个完整的 AC 自动机。
abbrlink: a948c7b3
date: 2025-11-19 01:00:00
---

## 引言：当 KMP 遇到多个模式串

在 Part 6.2 中，我们学习了 KMP 算法，它能在 `O(N+M)` 的时间内在一个文本串中查找一个模式串。但如果我们有**成百上千个模式串**需要在同一个文本中查找呢？

一个朴素的方法是对每个模式串都跑一次 KMP，总时间复杂度为 `O(N * K + M₁ + M₂ + ... + Mₖ)`，其中 `K` 是模式串的数量，`N` 是文本串的长度。当 `K` 很大时，这个方法显然不够高效。

有没有一种算法，能让我们**只扫描一次文本串**，就能找出所有模式串的所有出现位置呢？

答案是肯定的，这就是 **AC 自动机 (Aho-Corasick Automaton)**。它由 Alfred V. Aho 和 Margaret J. Corasick 在 1975 年提出，是多模式匹配问题的经典解决方案。

## 核心思想：Trie + KMP 的完美结合

AC 自动机的核心思想可以概括为：
1.  **用 Trie 树存储所有模式串**，这样可以复用公共前缀。
2.  **为 Trie 树的每个节点构建一个"失配指针" (Fail Pointer)**，这个指针的作用类似于 KMP 中的 `next` 数组，当匹配失败时，它告诉我们应该跳到哪个节点继续匹配。

这样，当我们在文本串上移动时，如果当前字符匹配失败，我们不需要回溯文本串的指针，而是通过失配指针在 Trie 树上跳转，从而实现 `O(N)` 的文本扫描。

## 构建 AC 自动机的三个步骤

### 步骤 1：构建 Trie 树

首先，我们将所有模式串插入到一个 Trie 树中。这一步和我们在 Part 6.6 中学习的 Trie 树完全一样。

例如，对于模式串集合 `["she", "he", "say", "her", "shr"]`，我们构建的 Trie 树如下：

```
        (root)
       /   |   \
     s     h    ...
    / \    |
   a   h   e*
   |   |   |
   y*  e*  r*
       |
       r*
```

`*` 表示一个单词的结尾。

### 步骤 2：构建失配指针 (Fail Pointer)

失配指针的构建是 AC 自动机的核心。它的定义是：

> **对于 Trie 树中的节点 `u`，其失配指针 `fail[u]` 指向另一个节点 `v`，使得从根到 `v` 的路径是从根到 `u` 的路径的**最长真后缀**。**

这个定义和 KMP 中的 `next` 数组非常相似。

**构建方法**：我们使用 **BFS (广度优先搜索)** 来构建失配指针。

1.  **根节点的所有子节点的失配指针都指向根节点**。
2.  对于其他节点 `u`，假设它的父节点是 `p`，从父节点到 `u` 的边对应的字符是 `c`：
    -   我们先找到 `p` 的失配指针指向的节点 `q = fail[p]`。
    -   如果 `q` 有一个字符为 `c` 的子节点 `v`，那么 `fail[u] = v`。
    -   否则，我们继续沿着 `q` 的失配指针向上跳，直到找到一个节点有字符 `c` 的子节点，或者跳到根节点为止。

### 步骤 3：在文本串上进行匹配

有了 Trie 树和失配指针，我们就可以在文本串上进行匹配了。

1.  从根节点开始，逐个读取文本串的字符。
2.  如果当前节点有对应字符的子节点，就移动到该子节点。
3.  如果没有，就沿着失配指针跳转，直到找到一个节点有对应字符的子节点，或者跳回根节点。
4.  每到达一个节点，我们检查该节点以及沿着失配指针能到达的所有节点，看它们是否是某个模式串的结尾。如果是，就记录下这个匹配。

## Python 实现

下面是一个完整的 AC 自动机实现，包括 Trie 构建、失配指针构建和文本匹配。

```python
from collections import deque, defaultdict

class ACNode:
    def __init__(self):
        self.children = {}  # 子节点字典
        self.fail = None    # 失配指针
        self.output = []    # 在该节点结束的模式串列表

class AhoCorasick:
    def __init__(self):
        self.root = ACNode()

    def insert(self, pattern: str) -> None:
        """将一个模式串插入到 Trie 树中"""
        node = self.root
        for char in pattern:
            if char not in node.children:
                node.children[char] = ACNode()
            node = node.children[char]
        node.output.append(pattern)

    def build_fail_pointers(self) -> None:
        """使用 BFS 构建失配指针"""
        queue = deque()
        
        # 第一层（根的子节点）的失配指针都指向根
        for child in self.root.children.values():
            child.fail = self.root
            queue.append(child)
        
        # BFS 构建其他节点的失配指针
        while queue:
            current = queue.popleft()
            
            for char, child in current.children.items():
                queue.append(child)
                
                # 沿着父节点的失配指针向上找
                fail_node = current.fail
                while fail_node is not None and char not in fail_node.children:
                    fail_node = fail_node.fail
                
                # 设置失配指针
                if fail_node is None:
                    child.fail = self.root
                else:
                    child.fail = fail_node.children[char]
                
                # 合并 output（继承失配节点的输出）
                child.output.extend(child.fail.output)

    def search(self, text: str) -> dict:
        """在文本中搜索所有模式串的出现位置"""
        result = defaultdict(list)
        node = self.root
        
        for i, char in enumerate(text):
            # 沿着失配指针找到一个有对应字符子节点的节点
            while node is not None and char not in node.children:
                node = node.fail
            
            if node is None:
                node = self.root
                continue
            
            node = node.children[char]
            
            # 记录所有在当前位置结束的模式串
            for pattern in node.output:
                # i 是结束位置，i - len(pattern) + 1 是开始位置
                result[pattern].append(i - len(pattern) + 1)
        
        return result

# --- 案例测试 ---
ac = AhoCorasick()

# 插入模式串
patterns = ["she", "he", "say", "her", "shr"]
for pattern in patterns:
    ac.insert(pattern)

# 构建失配指针
ac.build_fail_pointers()

# 在文本中搜索
text = "she says he wants to share"
matches = ac.search(text)

print("匹配结果:")
for pattern, positions in matches.items():
    print(f"  '{pattern}' 出现在位置: {positions}")

# 输出:
# 匹配结果:
#   'she' 出现在位置: [0]
#   'he' 出现在位置: [1, 10]
#   'say' 出现在位置: [4]
#   'shr' 出现在位置: [21]
#   'her' 出现在位置: [23]
```

## 复杂度分析

假设我们有 `K` 个模式串，它们的总长度为 `M`，文本串的长度为 `N`。

-   **构建 Trie 树**: `O(M)`。我们需要遍历所有模式串的所有字符。
-   **构建失配指针**: `O(M)`。虽然看起来有嵌套循环，但每个节点最多被访问常数次。
-   **文本匹配**: `O(N)`。虽然有 `while` 循环，但失配指针的跳转次数是均摊 `O(1)` 的（类似 KMP 的分析）。
-   **总时间复杂度**: `O(M + N)`。这是多模式匹配的最优复杂度。
-   **空间复杂度**: `O(M * C)`，其中 `C` 是字符集的大小。

## 优势 / 劣势 / 易错点

### 优势
1.  **一次扫描，多模式匹配**：只需扫描一次文本串，就能找到所有模式串的所有出现位置。
2.  **时间复杂度最优**：`O(M + N)` 是多模式匹配的理论下界。
3.  **应用广泛**：敏感词过滤、病毒特征码检测、日志分析等场景的首选算法。

### 劣势
1.  **实现复杂**：相比单模式匹配算法，AC 自动机的实现要复杂得多。
2.  **空间开销大**：需要存储整个 Trie 树和失配指针。

### 易错点
1.  **失配指针的构建顺序**：必须使用 BFS，不能使用 DFS。因为子节点的失配指针依赖于父节点的失配指针。
2.  **output 的继承**：一个节点的 `output` 不仅包含在该节点结束的模式串，还应该包含沿着失配指针能到达的所有节点的 `output`。
3.  **匹配时的跳转**：当当前节点没有对应字符的子节点时，要沿着失配指针跳转，而不是直接跳回根节点。

## 经典应用

1.  **敏感词过滤**：在社交媒体、论坛等场景中，需要实时检测用户输入的文本是否包含敏感词。AC 自动机可以一次性检测成千上万个敏感词。
2.  **病毒特征码检测**：杀毒软件需要在文件中查找多个病毒特征码。AC 自动机可以大大提高检测速度。
3.  **DNA 序列匹配**：在生物信息学中，需要在基因序列中查找多个已知的模式。
4.  **日志分析**：在海量日志中查找多个关键字或错误模式。

## 总结

AC 自动机是字符串算法领域的一座里程碑，它将 Trie 树的前缀复用和 KMP 的失配跳转完美结合，实现了多模式匹配的最优解。虽然它的实现相对复杂，但一旦掌握，你就拥有了解决一大类字符串问题的终极武器。

### 本文核心要点

✅ **核心思想**：Trie 树 + 失配指针 = AC 自动机。
✅ **失配指针**：指向当前节点路径的最长真后缀对应的节点。
✅ **构建方法**：使用 BFS 构建失配指针，并继承 `output`。
✅ **时间复杂度**：`O(M + N)`，其中 `M` 是所有模式串的总长度，`N` 是文本串的长度。
✅ **应用场景**：敏感词过滤、病毒检测、DNA 序列匹配等多模式匹配问题。

理解了 AC 自动机，你就掌握了多模式匹配的精髓。在接下来的文章中，我们将继续探索字符串算法的更深层次——**后缀数组**和**后缀自动机**，它们将带你进入字符串算法的终极领域。
