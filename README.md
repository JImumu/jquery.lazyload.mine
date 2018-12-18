# jquery.lazyload.mine
```
$(selector).lazyload({
  threshold       : 0, // 距离窗口多少时开始加载
  failure_limit   : 0, // 额外加载窗口外多少张图片
  event           : "scroll", // 触发才加载的事件
  effect          : "show", // 载入使用何种效果
  container       : window, // 滚动的容器
  data_attribute  : "original", // 原始连接存放的属性名
  skip_invisible  : true, // 是否跳过隐藏图片
  appear          : null, // 图片出现时（appear）的回调
  load            : null, // 图片加载完毕（load）的回调
  timeout         : 10000, // 图片加载超时时间（单位：ms）
  errorholder     : '', // 图片加载超时显示的占位图
  placeholder     : '' // 图片加载中显示的占位图
})
```
