---
title: Part 2.2：栈与队列：两种特殊的线性表
categories:
  - 大学算法全体系
  - Part 2：基础数据结构
tags:
  - 数据结构
  - 栈
  - 队列
  - LIFO
  - FIFO
description: >-
  栈（LIFO）和队列（FIFO）是两种操作受限但应用极其广泛的线性数据结构。本文将深入剖析它们的原理、实现（数组与链表）、复杂度，并通过动画式案例讲解其在函数调用、BFS、括号匹配等经典场景中的应用。
cover: 'https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/part-2-2-cover.jpg'
abbrlink: d6b90012
date: 2025-11-15 18:30:00
---

## 引言：生活中的“后进先出”与“先进先出”

在上一篇文章中，我们学习了数组和链表这两种基础的线性结构。今天，我们将探讨它们的两个“特例”——**栈 (Stack)** 和 **队列 (Queue)**。它们本质上也是线性表，但其特殊之处在于，它们是**操作受限**的。

想象两个生活场景：

1.  **一摞盘子（栈）**：你洗好了一摞盘子，一个一个叠起来。当你要用盘子时，你总是从最上面拿。最后放上去的盘子，最先被拿走。这就是**后进先出 (Last-In, First-Out, LIFO)**。
2.  **排队买奶茶（队列）**：顾客们排成一队，先到的人先买，买完就离开。后来的人排在队尾。这就是**先进先出 (First-In, First-Out, FIFO)**。

栈和队列就是这两种思想在数据结构中的具象化。它们通过限制数据的访问方式（只能在“端点”操作），为解决特定类型的问题提供了极其高效和简洁的模型。

**为什么栈和队列如此重要？**

*   **面试价值**：栈和队列是面试中的高频考点，尤其是在算法题中。例如，“有效的括号”、“用栈实现队列”、“滑动窗口最大值”等都是经典面试题。它们能考察你对数据结构本质的理解和应用能力。
*   **工程价值**：它们是计算机系统的基石。**函数调用栈**是程序运行的基础；**消息队列**是分布式系统中解耦和异步的核心；操作系统的**进程调度**、网络数据包的**缓冲**都离不开队列。理解它们，就是理解计算机系统的工作原理。

本文将带你深入这两种“受限”却强大的数据结构，从原理、实现到应用，让你彻底掌握它们的精髓。

## 背景知识：抽象数据类型 (ADT)

在开始之前，我们需要理解一个重要的概念：**抽象数据类型 (Abstract Data Type, ADT)**。

ADT 是一种理论模型，它只**定义了数据的逻辑结构和在该结构上的一组操作**，而不关心其具体的物理实现。

*   **栈**就是一个 ADT。它定义了数据必须遵循“后进先出”的规则，并提供了 `push`（入栈）、`pop`（出栈）等操作。至于底层是用数组还是链表来实现，ADT 并不关心。
*   **队列**也是一个 ADT。它定义了“先进先出”的规则，并提供了 `enqueue`（入队）、`dequeue`（出队）等操作。

这种将“是什么”（逻辑结构）和“怎么做”（物理实现）分离的思想，是软件工程中“封装”和“解耦”的核心，也是我们学习数据结构时需要建立的重要思维模式。

## Part A：栈 (Stack) - 后进先出的艺术

### 1. 详细算法原理

#### 直觉：一个只有一个开口的“死胡同”或“羽毛球筒”

你可以把栈想象成一个只有一个开口的羽毛球筒。你只能从这个开口放入羽毛球，也只能从这个开口取出羽毛球。最后放进去的那个球，必然是第一个被取出来的。

这个唯一的开口，我们称之为**栈顶 (Top)**。

#### 严谨原理：后进先出 (LIFO)

栈是一种遵循**后进先出 (LIFO)** 原则的线性数据结构。所有的数据操作都限制在栈的一端——栈顶——进行。

**核心操作**：
*   **Push (入栈)**：在栈顶添加一个新元素。
*   **Pop (出栈)**：移除并返回栈顶的元素。
*   **Peek / Top**：查看栈顶元素，但不移除它。
*   **IsEmpty**：检查栈是否为空。

### 2. 关键图示

![栈的操作过程](https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/stack-operations.gif)
*栈的操作遵循“后进先出”（LIFO）原则*

### 3. 栈的实现方式

#### 3.1 基于数组的实现 (Array-based Stack)

**思路**：使用一个动态数组来存储数据，并用一个变量 `top` 来记录栈顶元素的索引。

**动画式案例**：

1.  **初始状态**: `arr = []`, `top = -1`
2.  **Push(10)**: `arr = [10]`, `top = 0`
3.  **Push(20)**: `arr = [10, 20]`, `top = 1`
4.  **Pop()**: 返回 `arr[1]` (即 20), `top` 变为 `0`。数组本身可以不清空，通过 `top` 指针控制有效范围。

**伪代码**：

```pseudocode
class ArrayStack:
  // 初始化
  constructor(capacity):
    this.items = new Array(capacity)
    this.top = -1
  
  // 入栈
  function push(item):
    if top >= capacity - 1: Error("Stack Overflow")
    this.top = this.top + 1
    this.items[this.top] = item
    
  // 出栈
  function pop():
    if isEmpty(): Error("Stack Underflow")
    item = this.items[this.top]
    this.top = this.top - 1
    return item
    
  // 查看栈顶
  function peek():
    if isEmpty(): Error("Stack is empty")
    return this.items[this.top]
    
  // 判空
  function isEmpty():
    return this.top == -1
```

**Python 实现**：Python 的 `list` 本身就是动态数组，其 `append()` 和 `pop()` 方法天然地实现了栈的 LIFO 特性。

```python
# 使用 Python 的 list 模拟栈
stack = []

# 入栈
stack.append(10)
stack.append(20)
stack.append(30)
print(f"Stack after pushes: {stack}")  # 输出: [10, 20, 30]

# 查看栈顶
print(f"Top element is: {stack[-1]}") # 输出: 30

# 出栈
popped_item = stack.pop()
print(f"Popped item: {popped_item}") # 输出: 30
print(f"Stack after pop: {stack}")   # 输出: [10, 20]
```

#### 3.2 基于链表的实现 (Linked-list-based Stack)

**思路**：使用一个单向链表，将链表的**头部**作为栈顶。入栈和出栈操作都只在链表头部进行。

**动画式案例**：

1.  **初始状态**: `head -> NULL`
2.  **Push(10)**: 创建新节点 `[10, NULL]`，让 `head` 指向它。 `head -> [10, NULL]`
3.  **Push(20)**: 创建新节点 `[20, next]`，让它的 `next` 指向当前的 `head` (节点10)，然后让 `head` 指向新节点。 `head -> [20, next] -> [10, NULL]`
4.  **Pop()**: 返回 `head` 的数据 (20)，然后让 `head` 指向 `head.next` (节点10)。 `head -> [10, NULL]`

**伪代码**：

```pseudocode
class LinkedListStack:
  // 初始化
  constructor():
    this.head = NULL
  
  // 入栈
  function push(data):
    newNode = new Node(data)
    newNode.next = this.head
    this.head = newNode
    
  // 出栈
  function pop():
    if isEmpty(): Error("Stack Underflow")
    data = this.head.data
    this.head = this.head.next
    return data
```

### 4. 复杂度分析与对比

| 实现方式 | Push | Pop | Peek | 空间复杂度 |
|:---|:---:|:---:|:---:|:---:|
| **数组** | `O(1)` (均摊) | `O(1)` | `O(1)` | `O(n)` |
| **链表** | `O(1)` | `O(1)` | `O(1)` | `O(n)` |

*   **数组实现的均摊 O(1)**：大部分情况下 `push` 是 `O(1)`，但当数组满时需要扩容，这是一个 `O(n)` 操作。不过，扩容的成本可以被“分摊”到多次 `push` 操作上，所以其**均摊时间复杂度**为 `O(1)`。
*   **链表实现的 O(1)**：每次 `push` 或 `pop` 都只涉及常数次指针操作，是真正的 `O(1)`。

**选择**：在大多数情况下，数组实现因其更好的缓存局部性而性能更优。只有在对最坏情况下的性能有严格要求时，链表实现才更有优势。

## Part B：队列 (Queue) - 先进先出的公平

### 1. 详细算法原理

#### 直觉：一条单向的、有进有出的“传送带”

你可以把队列想象成超市的收银台队伍，或者一条单向的传送带。物品从一端（**队尾 Rear/Tail**）放上，从另一端（**队首 Front/Head**）取下。最先放上去的物品，也最先被取下来。

#### 严谨原理：先进先出 (FIFO)

队列是一种遵循**先进先出 (FIFO)** 原则的线性数据结构。数据从一端进入，从另一端离开。

**核心操作**：
*   **Enqueue / Offer (入队)**：在队尾添加一个新元素。
*   **Dequeue / Poll (出队)**：移除并返回队首的元素。
*   **Peek / Front**：查看队首元素，但不移除它。
*   **IsEmpty**：检查队列是否为空。

### 2. 关键图示

![队列的操作过程](https://cdn.jsdelivr.net/gh/Hjjjkh/blog_images/queue-operations.gif)
*队列的操作遵循“先进先出”（FIFO）原则*

### 3. 队列的实现方式

#### 3.1 基于数组的实现：循环队列 (Circular Queue)

**问题**：如果用普通数组实现队列，`dequeue` 操作需要移除数组的第一个元素，这将导致所有后续元素向前移动，时间复杂度为 `O(n)`，效率极低。

**解决方案**：**循环队列**。使用一个固定大小的数组，并维护 `head` 和 `tail` 两个指针。当指针到达数组末尾时，它会“绕回”到数组的开头。

**动画式案例**：

1.  **初始状态**: `arr = [_, _, _, _]`, `head = 0`, `tail = 0` (size=4)
2.  **Enqueue(10)**: `arr[0] = 10`, `tail` 变为 `1`。 `arr = [10, _, _, _]`
3.  **Enqueue(20)**: `arr[1] = 20`, `tail` 变为 `2`。 `arr = [10, 20, _, _]`
4.  **Dequeue()**: 返回 `arr[0]` (即 10), `head` 变为 `1`。 `arr = [_, 20, _, _]`
5.  **Enqueue(30), Enqueue(40)**: `tail` 移动到末尾后，绕回到 `0`。
6.  **判断队满**：当 `(tail + 1) % capacity == head` 时，队列为满。

**伪代码**：

```pseudocode
class CircularQueue:
  constructor(capacity):
    this.items = new Array(capacity + 1) // 多一个空间用于区分队满和队空
    this.head = 0
    this.tail = 0
    this.capacity = capacity + 1
    
  function enqueue(item):
    if isFull(): Error("Queue is full")
    this.items[this.tail] = item
    this.tail = (this.tail + 1) % this.capacity
    
  function dequeue():
    if isEmpty(): Error("Queue is empty")
    item = this.items[this.head]
    this.head = (this.head + 1) % this.capacity
    return item
    
  function isFull():
    return (this.tail + 1) % this.capacity == this.head
    
  function isEmpty():
    return this.head == this.tail
```

#### 3.2 基于链表的实现 (Linked-list-based Queue)

**思路**：使用一个单向链表，并同时维护 `head` 和 `tail` 两个指针，分别指向链表的头部和尾部。

*   **Enqueue**：在 `tail` 端添加新节点（`O(1)`）。
*   **Dequeue**：在 `head` 端移除节点（`O(1)`）。

**Python 实现**：Python 的 `collections.deque` 是一个双端队列，它提供了高效的、线程安全的队列和栈的实现，其底层是使用双向链表实现的。

```python
from collections import deque

# 创建一个队列
queue = deque()

# 入队
queue.append(10)
queue.append(20)
queue.append(30)
print(f"Queue after appends: {queue}") # 输出: deque([10, 20, 30])

# 查看队首
print(f"Front element is: {queue[0]}") # 输出: 10

# 出队
popped_item = queue.popleft()
print(f"Popped item: {popped_item}") # 输出: 10
print(f"Queue after popleft: {queue}") # 输出: deque([20, 30])
```

### 4. 复杂度分析与对比

| 实现方式 | Enqueue | Dequeue | Peek | 空间复杂度 |
|:---|:---:|:---:|:---:|:---:|
| **循环数组** | `O(1)` | `O(1)` | `O(1)` | `O(n)` |
| **链表** | `O(1)` | `O(1)` | `O(1)` | `O(n)` |

**选择**：`collections.deque` 在 Python 中是实现队列的首选，因为它经过高度优化且线程安全。如果自己实现，链表比循环数组更简单，且没有固定容量的限制。

## 5. 栈与队列的应用场景

### 栈 (LIFO) 的应用

1.  **函数调用栈**：程序调用函数时，会将返回地址、参数、局部变量等压入栈中。函数返回时，再从栈中弹出。这就是递归为什么会消耗 `O(n)` 空间的原因。
2.  **括号匹配**：遍历字符串，遇到左括号就入栈，遇到右括号就出栈一个左括号进行匹配。如果最后栈为空，则匹配成功。
3.  **表达式求值**：将中缀表达式转换为后缀表达式（逆波兰表示法），然后用栈进行计算。
4.  **深度优先搜索 (DFS)**：DFS 的递归实现天然地使用了函数调用栈。其迭代实现也需要手动维护一个栈。
5.  **浏览器的“后退”功能**。

### 队列 (FIFO) 的应用

1.  **广度优先搜索 (BFS)**：BFS 按层级遍历图或树，队列是实现层序遍历的完美工具。
2.  **操作系统**：
    *   **任务调度**：管理等待 CPU 时间的进程队列。
    *   **I/O 缓冲**：管理磁盘、网络等 I/O 请求的缓冲区。
3.  **消息队列 (Message Queue)**：分布式系统中用于服务解耦、异步通信、流量削峰的核心组件（如 RabbitMQ, Kafka）。
4.  **打印机任务队列**。

## 总结

栈和队列虽然简单，却是计算机科学中无处不在的“螺丝钉”。它们通过“限制”操作来换取在特定场景下的高效性。

*   **栈 (Stack)**：**后进先出 (LIFO)**。像一个死胡同，只能在一端操作。核心应用是**递归**和**深度优先搜索**。
*   **队列 (Queue)**：**先进先出 (FIFO)**。像一条传送带，一进一出。核心应用是**缓冲**和**广度优先搜索**。

理解了栈的 LIFO 特性和队列的 FIFO 特性，你就掌握了解决一大类算法问题的钥匙。在后续的图论、树的遍历等章节中，我们将反复与它们打交道。

