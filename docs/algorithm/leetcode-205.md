---
title: 205. 同构字符串
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

给定两个字符串s和t，判断它们是否是同构的。

如果s中的字符可以被替换得到t，那么这两个字符串是同构的。

所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。

示例 1:
```
输入: (s = "egg"), (t = "add");
输出: true;
```
示例 2:
```
输入: (s = "foo"), (t = "bar");
输出: false;
```
示例 3:
```
输入: (s = "paper"), (t = "title");
输出: true;
```
说明:

你可以假设 s 和 t 具有相同的长度。

## 解题思路

将每个单词的字母出现的位置统计到 map 中，在比较这两个 map 的值。

## 解法优化

不存储位置，改为相同位置，每个单词的字母分别作为键值对，当出现不匹配时，则不是同构的。

## 代码展示
``` javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  let map = {},
    map1 = {};
  for (let i = 0; i < s.length; i++) {
    let sChar = s[i];
    let tChar = t[i];
    map[sChar] = map[sChar] || [];
    map1[tChar] = map1[tChar] || [];
    map[sChar].push(i);
    map1[tChar].push(i);
  }
  let r1 = Object.values(map);
  let r2 = Object.values(map1);
  if (r1.length != r2.length) return false;
  return r1.sort().toString() == r2.sort().toString();
};
```

## 改进后的代码
``` javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  for (let i = 0, map1 = {}, map2 = {}; i < s.length; ++i) {
    if (!map1[s[i]]) map1[s[i]] = t[i];
    if (!map2[t[i]]) map2[t[i]] = s[i];
    if (map1[s[i]] != t[i] || map2[t[i]] != s[i]) return false;
  }
  return true;
};
```