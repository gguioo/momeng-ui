# Divider 分割线

默认是一笔**毛笔横画**：起笔重、收笔轻，两端自然变细。也可以放一枚纹样在正中，像古书里的花饰。

## 基础用法

<Demo src="divider/basic">

<<< @/examples/divider/basic.vue

</Demo>

## 竖向分割

<Demo src="divider/vertical">

<<< @/examples/divider/vertical.vue

</Demo>

## API

### Divider 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| variant | 笔触 | `'brush' \| 'line' \| 'dashed' \| 'dotted'` | `'brush'` |
| content-position | 文字位置 | `'left' \| 'center' \| 'right'` | `'center'` |
| ornament | 中间纹样图标 | `IconName` | — |
| color | 线条颜色 | `string` | — |

