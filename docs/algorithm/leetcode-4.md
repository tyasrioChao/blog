---
title: 4. 寻找两个有序数组的中位数
date: 2019-01-07
sidebar: 'auto'
categories:
 - 算法
tags:
- leetcode easy/medium/hard
- algorithm
- js
publish: true
---

## 题目描述

给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1：
``` javascript
nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

示例 2：
``` javascript
nums1 = [1, 2];
nums2 = [3, 4];

则中位数是(2 + 3) / 2 = 2.5;
```

## 解题思路

由于是两个排好序的数组，所以将两个数组合并，再找中位数就好了。（这难度不像是苦难啊。。）

## 解法优化

排名第一的思路相同，但由于我使用了`shift()`方法，导致速度上有所下降，改进为定义两个`index`，每次向 res 数组添加时，改为`index`的增加。

## 代码展示
``` javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let len1 = nums1.length;
  let len2 = nums2.length;
  let avg = (len1 + len2) / 2;
  let flg = avg == parseInt(avg);
  avg = parseInt(avg);

  let res = [];
  while (nums1.length != 0 && nums2.length != 0) {
    if (nums1[0] < nums2[0]) {
      res.push(nums1.shift());
    } else if (nums1[0] > nums2[0]) {
      res.push(nums2.shift());
    } else {
      res.push(nums1.shift());
      res.push(nums2.shift());
    }
  }
  res = res.concat(nums1, nums2);
  return flg ? (res[avg] + res[avg - 1]) / 2 : res[avg];
};
```