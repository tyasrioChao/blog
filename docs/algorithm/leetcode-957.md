---
title: 957. N 天后的牢房
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

8 间牢房排成一排，每间牢房不是有人住就是空着。 每天，无论牢房是被占用或空置，都会根据以下规则进行更改：

如果一间牢房的两个相邻的房间都被占用或都是空的，那么该牢房就会被占用。 否则，它就会被空置。 （请注意，由于监狱中的牢房排成一行，所以行中的第一个和最后一个房间无法有两个相邻的房间。）

我们用以下方式描述监狱的当前状态：如果第 i 间牢房被占用，则 cell[i]==1，否则 cell[i]==0。

根据监狱的初始状态，在 N 天后返回监狱的状况（和上述 N 种变化）。

示例 1：
```
输入：cells = [0,1,0,1,1,0,0,1], N = 7
输出：[0,0,1,1,0,0,0,0]
解释：
下表概述了监狱每天的状况：
Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
Day 7: [0, 0, 1, 1, 0, 0, 0, 0]
```

示例 2：
```
输入：cells = [1,0,0,1,0,0,1,0], N = 1000000000
输出：[0,0,1,1,1,1,1,0]
```

提示：

1. cells.length == 8
2. cells[i] 的值为 0 或 1
3. 1 <= N <= 10^9

## 解题思路
最开始的版本毫无疑问的超时了。（每次做的第一个版本保证超时。。） 想了一下，第一天后，会将第一个和最后一个置0 中间结果在进行数次（X）变换后，回到第一天的值。 则 N 取余 X 的结果就是第 N 天的值。（如果余数为 0，则返回第 X 天的结果）

## 解法优化

## 代码展示
``` javascript
/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
var prisonAfterNDays = function(cells, N) {
  let reset = function(cells) {
    return cells.map((cur, idx, src) => {
      if (idx > 0 && idx < src.length - 1) {
        if (src[idx - 1] != src[idx + 1]) {
          return 0;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    });
  };
  for (let i = 0; i < N; i++) {
    cells = reset(cells);
  }
  return cells;
};
```

## 改进后的代码
``` javascript
/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
var prisonAfterNDays = function(cells, N) {
  let tmp = [];
  let reset = function(cells) {
    return cells.map((cur, idx, src) => {
      if (src[idx - 1] == 0 && src[idx + 1] == 0) {
        return 1;
      } else {
        return (src[idx - 1] && src[idx + 1]) || 0;
      }
    });
  };
  tmp[0] = reset(cells);
  for (let i = 1; i < N; i++) {
    tmp[i] = reset(tmp[i - 1]);
    if (tmp[i].join("") == tmp[0].join("")) {
      tmp.pop();
      return N % i == 0 ? tmp[i - 1] : tmp[(N % i) - 1];
    }
  }
  return tmp[tmp.length - 1];
};
```