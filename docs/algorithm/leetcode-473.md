---
title: 473. 火柴拼正方形
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

还记得童话《卖火柴的小女孩》吗？现在，你知道小女孩有多少根火柴，请找出一种能使用所有火柴拼成一个正方形的方法。不能折断火柴，可以把火柴连接起来，并且每根火柴都要用到。

输入为小女孩拥有火柴的数目，每根火柴用其长度表示。输出即为是否能用所有的火柴拼成正方形。

示例 1：
```
输入: [1,1,2,2,2]
输出: true

解释: 能拼成一个边长为2的正方形，每边两根火柴。
```
示例 2：
```
输入: [3,3,3,3,4]
输出: false

解释: 不能用所有火柴拼成一个正方形。
```
注意:

给定的火柴长度和在 0 到 10^9之间。 火柴数组的长度不超过 15。

## 解题思路

- 构建一个记录表，记录四条边的临时边长。
- 遍历记录表，当数组中下标为 index 的火柴能放到该临时边中时，递归判断 index + 1 个火柴能否填充剩余。
- 如果放入后无法填满剩余，则去掉这个火柴。
- 当火柴用完时，则成功

## 解法优化

暂无

## 代码展示
``` javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var makesquare = function(nums) {
  if (nums.length < 4) return false;
  nums.sort((a, b) => b - a);
  let len = nums.reduce((acc, cur) => acc + cur);
  if (len % 4 != 0) return false;
  len = len / 4;
  let record = [0, 0, 0, 0];
  let check = function(index) {
    if (index == nums.length) return true;
    for (let i = 0; i < 4; i++) {
      if (record[i] + nums[index] <= len) {
        record[i] += nums[index];
        if (check(index + 1)) return true;
        record[i] -= nums[index];
      }
    }
    return false;
  };
  return check(0);
};
```

## 改进后的代码
``` javascript

```