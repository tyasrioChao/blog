---
title: 365. 水壶问题
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

有两个容量分别为 x 升 和 y 升 的水壶以及无限多的水。请判断能否通过使用这两个水壶，从而可以得到恰好 z 升 的水？

如果可以，最后请用以上水壶中的一或两个来盛放取得的 z 升 水。

你允许：

装满任意一个水壶
清空任意一个水壶
从一个水壶向另外一个水壶倒水，直到装满或者倒空
示例 1:
```
输入: (x = 3), (y = 5), (z = 4);
输出: True;
```
示例 2:
```
输入: (x = 2), (y = 6), (z = 5);
输出: False;
```

## 解题思路

最开始的思路是比较 x 和 y 的大小，用大减去小，差值在和 x，y 进行加减，一直减到 0，然后再和 z 进行比较。然后超时了，是两个很大，但是差值很小的数，这样的话中间结果太多，导致了超时，于是将相减改为，取余数。最后看 z 能否整除中间的结果。（584ms。。。）

## 解法优化

提交后，看了前几名答案，都是在寻找最大公约数，看结果能否整除最大公约数。。。（100ms 左右）

## 代码展示
``` javascript
/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
var canMeasureWater = function(x, y, z) {
  if (z == 0) return true;
  if (x + y < z) return false;
  let fun = (a, b, arr) => {
    let max, min, minus;
    max = Math.max(a, b);
    min = a + b - max;
    minus = max - min;
    do {
      arr.push(minus);
      arr = arr.concat(
        arr.map(ele => ele + minus),
        arr.map(ele => ele - minus)
      );
      arr = [...new Set(arr)];
      max = Math.max(min, minus);
      min = Math.min(min, minus);
      //最初这里是减号minus = max - min;
      minus = max % min;
    } while (min != minus && min != 0);

    return arr;
  };
  console.log(fun(x, y, [x, y]));
  return fun(x, y, [x, y]).some(ele => z % ele == 0);
};
```

## 改进后的代码
``` javascript
/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
var canMeasureWater = function(x, y, z) {
  let gcd = (a, b) => (!b ? a : gcd(b, a % b));
  if (x + y == z) return true;
  return x + y >= z && z % gcd(x, y) == 0;
};
```