---
title: 100. 相同的树
date: 2019-01-07
sidebar: 'auto'
categories:
 - 算法
tags:
- leetcode
- algorithm
- js
publish: true
---

## 题目描述

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:
```
输入:       1         1
           / \       / \
          2   3     2   3

         [1,2,3],   [1,2,3]

输出: true
```
示例 2:
```
输入:       1         1
           / \       / \
          2   1     1   2

         [1,2,1],   [1,1,2]

输出: false
```

## 解题思路

依次判断，当前结点的值是否相等，左右节点是否存在，若存在再递归判断子节点。

## 解法优化

なし

## 代码展示
``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if (p == null && q == null) return true;
  else if (p == null || q == null) return false;
  else if (q.val != p.val) return false;
  else return isSameTree(q.left, p.left) && isSameTree(q.right, p.right);
};
```

## 改进后的代码
``` javascript

```