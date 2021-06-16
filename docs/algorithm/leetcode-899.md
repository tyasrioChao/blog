---
title: 899. 有序队列
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

给出了一个由小写字母组成的字符串 S。然后，我们可以进行任意次数的移动。

在每次移动中，我们选择前 K 个字母中的一个（从左侧开始），将其从原位置移除，并放置在字符串的末尾。

返回我们在任意次数的移动之后可以拥有的按字典顺序排列的最小字符串。

示例 1:
```
输入：S = "cba", K = 1
输出："acb"
解释：
在第一步中，我们将第一个字符（"c"）移动到最后，获得字符串 "bac"。
在第二步中，我们将第一个字符（"b"）移动到最后，获得最终结果 "acb"。
```
示例 2:
```
输入：S = "baaca", K = 3
输出："aaabc"
解释：
在第一步中，我们将第一个字符（"b"）移动到最后，获得字符串 "aacab"。
在第二步中，我们将第三个字符（"c"）移动到最后，获得最终结果 "aaabc"。
```
提示：

1. 1 <= K <= S.length <= 1000
2. S只由小写字母组成。

## 解题思路

当 K=1 时，原字符串只有 S.length-1 种变化(即每次第一个字母挪到最后)。 当 K>=2 时，我们可以将 S 中任意一个字符插入到任意一个地方。所以可以直接返回最小字符串。

## 解法优化

有一种匹配正则表达式的算法，有机会在读一读代码。

## 代码展示
``` javascript
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var orderlyQueue = function(S, K) {
  if (K == 1) {
    return S.split("")
      .reduce(
        (arr, cur, idx) => {
          arr.push(arr[idx].slice(1) + cur);
          return arr;
        },
        [S]
      )
      .sort()[0];
  } else {
    return S.split("")
      .sort()
      .join("");
  }
};
```

## 改进后的代码
``` javascript
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var orderlyQueue = function(S, K) {
  const sA = S.split("").sort();
  if (K === 1) {
    const min = sA[0];
    const index = S.indexOf(min);
    const reg = new RegExp(`${min}{1,}[^a]*`, "gy");
    const mS = S.substring(index) + S;
    const matchS = mS.match(reg);
    for (let i = matchS.length - 2; i > -1; i--) {
      matchS[i] = matchS[i] + matchS[i + 1];
    }
    const SS = matchS.map(s => (s + S).substring(0, S.length));
    return SS.sort()[0];
  } else {
    return sA.join("");
  }
};
```