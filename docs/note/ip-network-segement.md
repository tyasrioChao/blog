---
title: 根据IP进行网段的区分
date: 2019-04-23
sidebar: 'auto'
categories:
 - 笔记
tags:
- network
- js
publish: true
---

## 前提描述

在项目的运用保守的时候，想要判断用户IP是由国内还是国外访问的，分布情况是怎么样的？

最开始的时候，我想直接使用一些免费的IP查询API，但这些个网站绝大部分限制了每日的查询容量（大约在1000request/day）,最后找到一个每个月可以请求10000request的网站。但是，在实际请求的时候，开始的时候没有限制查询速度，导致出现[HTTP 429](https://developer.mozilla.org/ja/docs/Web/HTTP/Status/429)错误，最后得出的结论是，对有限制的服务器的请求，最好是每秒1个。

最后查询资料后得知，每个国家所分配的网段是固定的[GeoData](https://gisgeography.com/what-is-geodata-geospatial-data)。所以改为判断某一IP是否处于哪个地区，并在地图上显示坐标点。[Amcharts Example](https://www.amcharts.com/demos/capitals-map)

示例1:
```
输入:
IP地址
125.4.205.129,
66.79.174.78,
49.104.26.243,
177.68.211.28,
124.155.1.26,
115.37.157.163,
网段
1.0.16.0/20,
1.0.64.0/18,
1.1.64.0/18,
1.5.0.0/16
输出: true
```

## 代码展示

``` javascript
function judgeIP(ip, segement) {
  // console.log(ip)
  ip = ip.split(".")
  let mask = 0xFFFFFFFF << (32 - parseInt(segement.replace(/.*\//g, "")))
  segement = segement.replace(/\/.*/g, "").split(".")
  let ipBinary =  Number("0B" + Number(ip[0]).toString(2)) << 24
                | Number("0B" + Number(ip[1]).toString(2)) << 16
                | Number("0B" + Number(ip[2]).toString(2)) << 8
                | Number("0B" + Number(ip[3]).toString(2));
  let segBinary = Number("0B" + Number(segement[0]).toString(2)) << 24
                | Number("0B" + Number(segement[1]).toString(2)) << 16
                | Number("0B" + Number(segement[2]).toString(2)) << 8
                | Number("0B" + Number(segement[3]).toString(2))
  // console.log(ipBinary & mask, segBinary & mask)
  return (ipBinary & mask) === (segBinary & mask)
}
```