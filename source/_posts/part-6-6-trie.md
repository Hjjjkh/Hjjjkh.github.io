---
title: Part 6.6：Trie (字典树)——高效的前缀查询神器
categories:
  - 大学算法全体系
  - Part 6：字符串算法
tags:
  - 字符串
  - Trie
  - 字典树
  - 前缀树
  - 数据结构
description: >-
  Trie
  树，又称字典树或前缀树，是处理字符串前缀问题的终极数据结构。它通过将字符串集合的公共前缀进行复用，实现了对词频统计、自动补全、敏感词过滤等场景的极速查询。本文将从
  Trie 的节点结构入手，通过图解和 Python 代码，带你一步步实现一个完整的 Trie，并深入探讨其在各类问题中的应用。
abbrlink: 64113fb
date: 2025-11-18 01:00:00
---

## 引言：当自动补全成为刚需

当你在搜索引擎中输入 `"algo"` 时，它会立刻提示 `"algorithm"`、`"algorithmic trading"` 等可能的补全选项。这种“前缀搜索”功能在现代应用中无处不在。我们如何高效地存储一个词典，并快速找出所有以特定前缀开头的单词呢？

使用哈希表或平衡二叉树虽然可行，但它们在处理“前缀”这一特定结构时并非最优。哈希表无法利用前缀信息，而平衡树也需要进行多次复杂的比较。

为了解决这类问题，一种专门为此而生的数据结构应运而生——**Trie 树**，又名**字典树**或**前缀树**。它是一种树形结构，通过巧妙地利用字符串的公共前缀，来达到高效查询和插入的目的。

## 核心思想：空间换时间，用路径表示字符串

Trie 的核心思想非常直观：

1.  它有一个空的根节点，不代表任何字符。
2.  从根节点出发，沿着一条路径到达某个节点，路径上经过的字符连接起来，就代表一个字符串（通常是某个单词的前缀）。
3.  每个节点包含一个指向子节点的指针数组（或哈希表），数组的索引对应一个字符。例如，一个只包含小写字母的 Trie，每个节点就会有 26 个指向子节点的指针。
4.  每个节点还有一个标记，用于标识从根到当前节点的路径是否构成一个完整的单词。

> **图示：插入 `"sea"`, `"sell"`, `"see"`**
>
> ```
>      (root)
>        | 's'
>        (s)
>       /   \
>   'e' /     \ 'o'
>     (se)      (so)
>    /    \
> 'a'/      \'e'
> (sea)*      (see)*
>   | 'l'
>   (sel)
>     | 'l'
>     (sell)*
> ```
> `*` 标记表示一个单词的结尾。

从图中可以看出，`"sea"`, `"sell"`, `"see"` 复用了共同的前缀 `"se"`，从而节省了存储空间，并为快速前缀查询打下了基础。

## Python 实现

下面我们用 Python 来实现一个 Trie。每个节点 `TrieNode` 包含两个核心部分：`children`（子节点）和一个 `is_end_of_word`（单词结束标记）。

```python
class TrieNode:
    def __init__(self):
        # 使用字典存储子节点，键是字符，值是 TrieNode
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        """初始化一个空的 Trie 树"""
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        """向 Trie 树中插入一个单词"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        """查找一个单词是否在 Trie 树中"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        """查找 Trie 树中是否存在以指定前缀开头的单词"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# --- 案例测试 ---
trie = Trie()
trie.insert("apple")
print(f"Search 'apple': {trie.search('apple')}")     # True
print(f"Search 'app': {trie.search('app')}")         # False
print(f"Starts with 'app': {trie.starts_with('app')}") # True
trie.insert("app")
print(f"Search 'app' after insert: {trie.search('app')}") # True
```

## 复杂度分析

假设 `L` 是我们操作的字符串（单词或前缀）的长度。

-   **插入 (Insert)**: 时间复杂度 `O(L)`。我们需要遍历字符串的每一个字符，并在 Trie 中移动或创建节点。
-   **查找 (Search)**: 时间复杂度 `O(L)`。与插入类似，我们顺着路径向下查找。
-   **前缀查找 (Starts With)**: 时间复杂度 `O(L)`。与查找完全相同。
-   **空间复杂度**: `O(S * C)`，其中 `S` 是所有插入字符串的总长度，`C` 是字符集的大小。这是最坏情况，当没有公共前缀时。有公共前缀时，空间会大大减少。

## 优势 / 劣势 / 易错点

### 优势
1.  **极速的前缀相关操作**：所有操作的时间复杂度都只与查询串的长度有关，与 Trie 中存储的单词数量无关。
2.  **结构清晰**：可以很方便地实现词频统计（在节点上增加计数器）、自动补全等功能。
3.  **排序输出**：可以对 Trie 进行一次遍历（如 DFS），以字典序输出所有单词。

### 劣势
1.  **空间消耗大**：如果字符集很大，或者字符串没有公共前缀，Trie 的空间开销会非常大。每个节点可能需要存储一个庞大的指针数组。
2.  **不适用于动态变化**：对于频繁删除操作的场景，Trie 的维护相对复杂。

### 易错点
1.  **`search` 和 `starts_with` 的区别**：`search` 不仅要求路径存在，还要求路径的终点是一个单词的结尾（`is_end_of_word` 为 `True`）。而 `starts_with` 只要求路径存在。
2.  **节点设计**：忘记在节点中加入 `is_end_of_word` 标记，导致无法区分前缀和完整的单词。

## 经典应用

1.  **自动补全/搜索建议**：最经典的应用。输入一个前缀，快速返回所有可能的单词。
2.  **词频统计**：在 `TrieNode` 中增加一个 `count` 属性，`insert` 时沿途递增，即可统计每个前缀或单词出现的次数。
3.  **敏感词过滤**：将所有敏感词构建成一个 Trie。当文本流经过时，可以高效地判断是否匹配到任何敏感词的前缀。
4.  **IP 路由**：路由器的路由表可以用 Trie 结构来存储，以实现最长前缀匹配。
5.  **异或最大值问题**：将数字的二进制表示看作字符串，插入 Trie 中，可以巧妙地解决“在一个数组中找两个数，使其异或值最大”的问题。

## 总结

Trie 树是一种看似简单但功能强大的数据结构，它完美地诠释了“用空间换时间”的算法思想。通过将字符串的结构映射到树的路径上，它将前缀相关的查询操作优化到了极致。

### 本文核心要点

✅ **核心思想**：用树的路径表示字符串，并复用公共前缀。
✅ **节点结构**：`children` 指针数组/字典 + `is_end_of_word` 标记。
✅ **核心操作**：`insert`, `search`, `starts_with` 的时间复杂度均为 `O(L)`。
✅ **应用场景**：自动补全、词频统计、敏感词过滤等前缀密集型问题。

理解了 Trie，你就掌握了解决一系列字符串前缀问题的钥匙。在下一篇文章中，我们将学习 Trie 的一个强大扩展——**AC 自动机**，看看如何将 Trie 和 KMP 算法结合，实现多模式匹配的终极解决方案。
