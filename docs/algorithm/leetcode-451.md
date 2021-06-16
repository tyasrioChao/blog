---
title: 451. 根据字符出现的频率排序
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

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

示例 1:
```
输入: "tree"

输出: "eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```
示例 2:
```
输入: "cccaaa"

输出: "cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```
示例 3:
```
输入: "Aabb"

输出: "bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

## 解题思路

将数组转化成 key 是字母，value 是次数的 map，再根据 value 排序，然后依次打印出次数个字母。

## 解法优化

将if(map[key]) map[key] = 0;优化为map[key] = map[key] || 0;后提高了 15ms 左右。

reduce 和 forEach 之间也有性能上的差别．

第一名的思路是，将 map 按照 key 转换为次数个字母的字符串数组，再按照数组的长度排序，合并数组Object.keys(map).map((key) => key.repeat(map[key])).sort((x, y) => y.length - x.length).join('')

## 代码展示
``` javascript
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  var ac = s.split("").reduce((acc, cur) => {
    acc[cur] = acc[cur] || 0;
    acc[cur]++;
    return acc;
  }, {});

  return Object.entries(ac)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, cur) => (acc += cur[0].repeat(cur[1])), "");
};
```

## 改进后的代码
``` javascript
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  let map = {};
  s.split("").forEach(c => {
    map[c] = map[c] || 0;
    map[c]++;
  });

  return Object.keys(map)
    .map(key => key.repeat(map[key]))
    .sort((x, y) => y.length - x.length)
    .join("");
};
```