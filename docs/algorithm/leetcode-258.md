---
title: 258. 各位相加
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

给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。

示例:
``` 
输入: 38
输出: 2
解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
```
进阶: 你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？

## 解题思路

循环 num=dr(num),直到 num 的位数为 1。

## 解法优化

在 O(1)时间复杂度的话，你就需要上网查查是不是什么数学公式吧。。
根据 [Digital root](https://en.wikipedia.org/wiki/Digital_root)所说的，整理一下：

- 一个数可以被分解成 num = d1 + 10 _ d2 + 102 _ d3 + ... + 10m-1 * dm
- 转写后为 num = (d1 + d2 + ... + dm) + (9 _ d2 + 99 _ d3 + 999 * d4 + ...)
- 后面括号为 0,得 num mod(9) = (d1 + d2 + ... + dm)
- 所以一个数的数根为这个数取余 9
- 由于当 num mod(9) = 0 时，树根为 num，所以 dr(num) = 1 + (num - 1) % 9

## 代码展示
``` javascript
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
  num += "";
  while (num.length != 1) {
    num = num.split("").reduce((acc, cur) => acc + parseInt(cur), 0) + "";
  }
  return num;
};
```

## 改进后的代码
``` javascript
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
  return 1 + ((num - 1) % 9);
};
```