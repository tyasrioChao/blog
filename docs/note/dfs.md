---
title: 深度优先搜索(Depth-First-Search)
date: 2019-01-07
sidebar: 'auto'
categories:
 - 笔记
tags:
- dfs
- algorithm
- js
publish: true
---

## 算法描述

深度优先搜索算法是一种用于遍历或搜索树或图的算法。沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点v的所在边都己被探寻过，搜索将回溯到发现节点v的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止。属于盲目搜索。

## 伪代码

非递归实现版本:

``` javascript
无
```

## 解法优化

排名第一的思路相同，但由于我使用了`shift()`方法，导致速度上有所下降，改进为定义两个`index`，每次向res数组添加时，改为`index`的增加。

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
    while(nums1.length != 0 &amp;&amp; nums2.length != 0) {
        if(nums1[0] &lt; nums2[0]){
            res.push(nums1.shift());
        }else if(nums1[0] &gt; nums2[0]){
            res.push(nums2.shift());
        }else{
            res.push(nums1.shift());
            res.push(nums2.shift());
        }
    }
    res = res.concat(nums1, nums2);
    return flg?(res[avg]+res[avg - 1])/2:res[avg];
};
```