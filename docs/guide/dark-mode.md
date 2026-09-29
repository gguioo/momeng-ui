# 暗色模式 · 墨夜

白天是宣纸上写墨字，夜里是**墨色的纸上写月光**。墨夜主题不是简单的反色：
纸张变成温暖的深褐，墨线变成米白，朱砂、竹青等传统色都**提亮一档**以保证对比度，印章在暗色下不再使用正片叠底。

## 开启

给 `html` 加上 `dark` 类即可（与 VitePress、VueUse `useDark` 的约定一致）：

```ts
document.documentElement.classList.toggle('dark')
```

点击本站右上角的「墨夜」开关体验一下。

## 局部暗色

```vue
<MoConfigProvider theme="dark">
  <!-- 这一块是墨夜 -->
</MoConfigProvider>
```

<Demo src="guide/dark">

<<< @/examples/guide/dark.vue

</Demo>
