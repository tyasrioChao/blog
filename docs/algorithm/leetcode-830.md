---
title: 830. 较大分组的位置
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

在一个由小写字母构成的字符串 S 中，包含由一些连续的相同字符所构成的分组。
例如，在字符串 S = "abbxxxxzyy" 中，就含有 "a", "bb", "xxxx", "z" 和 "yy" 这样的一些分组。

我们称所有包含大于或等于三个连续字符的分组为较大分组。找到每一个较大分组的起始和终止位置。

最终结果按照字典顺序输出。

示例 1：
```
输入: "abbxxxxzzy"
输出: [[3,6]]
解释: "xxxx" 是一个起始于 3 且终止于 6 的较大分组。
```
示例 2：
```
输入: "abc"
输出: []
解释: "a","b" 和 "c" 均不是符合要求的较大分组。
```
示例 3：
```
输入: "abcdddeeeeaabbbcd";
输出: [
  [3, 5],
  [6, 9],
  [12, 14]
];
```
说明: 1 <= S.length <= 1000

## 解题思路

遍历每一个字符，当前字母出现 3 次以上并且下一个字母和当前不符时，打印开始坐标和当前坐标的数组。
※当遍历到最后一个字符时，需要额外判断一次当前的 count 数是否大于 3。

## 解法优化

提交后，大概处于 30%的位置，等空闲时补充

## 代码展示
``` javascript
/**
 * @param {string} S
 * @return {number[][]}
 */
var largeGroupPositions = function(S) {
  let arr = S.split("");
  let count = 1,
    start = 0,
    end = 0,
    tmp_cur = "";

  return arr.reduce((acc, cur, idx, src) => {
    if (cur != tmp_cur) {
      tmp_cur = cur;
      start = end = idx;
      count = 1;
    } else {
      count++;
      end++;
    }

    if (count >= 3 && src[idx + 1] != tmp_cur) {
      acc.push([start, end]);
    }

    return acc;
  }, []);
};
```

## 改进后的代码
``` javascript

```