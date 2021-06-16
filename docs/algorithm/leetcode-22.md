---
title: 22. 括号生成
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

给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

例如，给出 n = 3，生成结果为：

``` javascript
["((()))", "(()())", "(())()", "()(())", "()()()"];
```

## 解题思路

用回溯法，每当遇到左括号和右括号的数量都等于 n 时，将括号组合添加到结果中。 每次递归时，处理流程如下：

- 判断当前右括号数量为 n 时，即匹配完成，添加结果
- 当左括号还能添加(leftCount 小于 n)，添加一个左括号
- 当右括号还能添加(rightCount 小于 leftCount 小于 n)，添加一个右括号

## 解法优化

括号总是成对出现的，即
``` javascript
n=1 res=["()"]
n=2 res=["(())", "()()"]
n=3 res=["()()()","()(())","(())()","(()())","((()))"]
```
新增加的一个是在上一个基础上追加 1 对(),懂是懂了，感觉是动态规划。。(渣算法，还没复习。。，学完之后再回来补坑)

## 代码展示
``` javascript
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if (n == 0) return "";
  let arr = [];
  let makeStr = function(str, leftCount, rightCount, n) {
    if (rightCount == n) {
      arr.push(str);
    }
    if (leftCount < n) {
      makeStr(str + "(", leftCount + 1, rightCount, n);
    }
    if (rightCount < leftCount) {
      makeStr(str + ")", leftCount, rightCount + 1, n);
    }
  };
  makeStr("", 0, 0, n);
  return arr;
};
```

## 改进后的代码

``` javascript
/**
 * @param {number} n
 * @return {string[]}
 */

let generateParenthesis = function(num) {
  let res = [];
  if (num === 0) {
    res.push("");
  }
  for (let i = 0; i < num; ++i) {
    for (let left of generateParenthesis(i)) {
      for (let right of generateParenthesis(num - i - 1)) {
        res.push(`(${left})${right}`);
      }
    }
  }
  return res;
};
```