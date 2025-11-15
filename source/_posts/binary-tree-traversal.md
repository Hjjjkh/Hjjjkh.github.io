---
title: 二叉树遍历算法详解
date: 2025-11-14 10:00:00
categories:
  - 数据结构与算法
tags:
  - 二叉树
  - 算法
  - 递归
  - 迭代
---

## 引言

二叉树是计算机科学中最重要的数据结构之一，掌握二叉树的遍历算法是学习数据结构的基础。本文将详细介绍二叉树的四种遍历方式及其实现。

<!-- more -->

## 二叉树节点定义

首先定义二叉树的节点结构：

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
    }
}
```

## 四种遍历方式

### 1. 前序遍历（Pre-order）

访问顺序：**根节点 → 左子树 → 右子树**

#### 递归实现

```java
public void preorderTraversal(TreeNode root) {
    if (root == null) return;
    
    System.out.print(root.val + " ");  // 访问根节点
    preorderTraversal(root.left);       // 遍历左子树
    preorderTraversal(root.right);      // 遍历右子树
}
```

#### 迭代实现（使用栈）

```java
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        result.add(node.val);
        
        // 先压右子树，再压左子树（栈是后进先出）
        if (node.right != null) stack.push(node.right);
        if (node.left != null) stack.push(node.left);
    }
    
    return result;
}
```

### 2. 中序遍历（In-order）

访问顺序：**左子树 → 根节点 → 右子树**

对于二叉搜索树，中序遍历可以得到有序序列。

#### 递归实现

```java
public void inorderTraversal(TreeNode root) {
    if (root == null) return;
    
    inorderTraversal(root.left);        // 遍历左子树
    System.out.print(root.val + " ");   // 访问根节点
    inorderTraversal(root.right);       // 遍历右子树
}
```

#### 迭代实现

```java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    
    while (current != null || !stack.isEmpty()) {
        // 一直向左走到底
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        
        // 访问节点
        current = stack.pop();
        result.add(current.val);
        
        // 转向右子树
        current = current.right;
    }
    
    return result;
}
```

### 3. 后序遍历（Post-order）

访问顺序：**左子树 → 右子树 → 根节点**

#### 递归实现

```java
public void postorderTraversal(TreeNode root) {
    if (root == null) return;
    
    postorderTraversal(root.left);      // 遍历左子树
    postorderTraversal(root.right);     // 遍历右子树
    System.out.print(root.val + " ");   // 访问根节点
}
```

### 4. 层序遍历（Level-order）

按层从上到下、从左到右访问节点。

#### 使用队列实现

```java
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        result.add(currentLevel);
    }
    
    return result;
}
```

## 示例演示

假设有以下二叉树：

```
       1
      / \
     2   3
    / \
   4   5
```

各种遍历结果：
- **前序遍历**：1 → 2 → 4 → 5 → 3
- **中序遍历**：4 → 2 → 5 → 1 → 3
- **后序遍历**：4 → 5 → 2 → 3 → 1
- **层序遍历**：1 → 2 → 3 → 4 → 5

## 时间复杂度分析

所有遍历方式的时间复杂度都是 **O(n)**，其中 n 是树中节点的数量，因为每个节点都会被访问一次。

空间复杂度：
- 递归实现：O(h)，h 为树的高度（递归调用栈）
- 迭代实现：O(h)，栈或队列的最大空间

## 实际应用

1. **前序遍历**：用于复制树、序列化树
2. **中序遍历**：用于二叉搜索树的排序
3. **后序遍历**：用于计算目录大小、删除树
4. **层序遍历**：用于寻找最短路径、打印树的层次结构

## 总结

掌握二叉树的遍历算法是学习树形结构的基础，既要理解递归实现的简洁性，也要掌握迭代实现的效率。在实际应用中，根据具体需求选择合适的遍历方式。

## 练习题推荐

- LeetCode 144: 二叉树的前序遍历
- LeetCode 94: 二叉树的中序遍历
- LeetCode 145: 二叉树的后序遍历
- LeetCode 102: 二叉树的层序遍历

