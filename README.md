# marqueejs

跑马灯，滚动字幕

[在线例子](https://mengdu.github.io/marqueejs/example/index.html)

```js
const mq = new Marquee(boxEl, targetEl, options)
```

## 参数

+ **boxEl** `dom` 盒子元素
+ **targetEl** `dom` 盒子元素
+ **options** `object` 配置
+ **options.setp** `number` 滚动步长，默认 1（px）
+ **options.autoPlay** `boolean` 自动开始滚动， 默认 false
+ **options.start** `number` 开始值停留位置 0（px）
+ **options.direction** 滚动方向，纵 vertical, 横 horizontal 默认 vertical

## 方法

+ **start** 开始
+ **stop** 停止
+ **reset** 重置
+ **show** 显示
+ **hide** 隐藏
