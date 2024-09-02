---
date: 2023/6/27
title: 滑动拼图
category: 练习
tags:
  - 小游戏
  - 算法
---

前段时间在便利店等待结账时，看到有小孩在玩一个拼图相关的玩具，通过利用地图上的一个空位来不断挪动其它拼图的位置，最终复原出被打乱的拼图。

想起自己小时候也玩过类似的玩具，不过那时候正常拼怎么都拼不出来，后来用的暴力拆装法，直接把拼图全抠出来，再按顺序装回去。现在我尝试动手做了一版，终于是能够正常拼出来了 😎。

## 试玩

## 日志

### 实现开局乱序

### 实现自动求解

## 后记

突然知道小时候拼不出的一大原因了，因为相对于移动数字来说，移动图片要更难些（至少对我来说） 😭。
在移动数字时，我可以很轻松地获取到如下信息：

- 某个数字块最终应该移动到哪个格子
- 两个数字块最终的相对位置：谁在上，谁在下，谁在左，谁在右

而换成图片，我就不能直观的获取到这些信息，脑海中得先做一层将图片到数字的转换，难度自然就上去了。

## 参考链接

- [15 puzzle | 维基百科](https://en.wikipedia.org/wiki/15_Puzzle)
- [773. 滑动谜题 | 力扣](https://leetcode.cn/problems/sliding-puzzle/)
- [implementing-a-star-to-solve-n-puzzle](https://algorithmsinsight.wordpress.com/graph-theory-2/a-star-in-general/implementing-a-star-to-solve-n-puzzle/)
