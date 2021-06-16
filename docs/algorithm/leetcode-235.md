---
title: 235. 二叉搜索树的最近公共祖先
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

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉搜索树: root = [6,2,8,0,4,7,9,null,null,3,5]

![leetcode-235](/images/leetcode/leetcode-235.png)

示例 1:
```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6
解释: 节点 2 和节点 8 的最近公共祖先是 6。
```
示例 2:
```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
```
说明:

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉搜索树中。

## 解题思路

平衡二叉树的每个节点值都满足小于右子树而大于左子树。所以，一共有三种情况。

- 如果两个 node 中都大于 root.val，则答案一定在右子树
- 如果两个 node 都小于 root.val，则答案一定在左子树
- 都不是的话，则返回 root（即两个 node 在左右，或者与 root 相等）

## 解法优化

判断两个 node 的值与 root 的值做减法后相乘，然后用返回三元表达式结果。

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
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (root === null) return root;

  console.log(root.val, p.val, q.val);
  if (p.val < root.val && q.val < root.val) {
    console.log("left");
    return lowestCommonAncestor(root.left, p, q);
  } else if (p.val > root.val && q.val > root.val) {
    console.log("right");
    return lowestCommonAncestor(root.right, p, q);
  } else {
    console.log("return");
    return root;
  }
};
```

## 改进后的代码
``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor = function(root, p, q) {
  return (root.val - p.val) * (root.val - q.val) <= 0
    ? root
    : lowestCommonAncestor(root.val >= q.val ? root.left : root.right, p, q);
};

let lowestCommonAncestor2 = function(root, p, q) {
  while ((root.val - p.val) * (root.val - q.val) > 0)
    root = p.val < root.val ? root.left : root.right;
  return root;
};
```