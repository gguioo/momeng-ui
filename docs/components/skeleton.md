# Skeleton 骨架屏

加载时先用淡墨勾出轮廓，每一行长短不同，像草稿。

## 基础用法

<Demo src="skeleton/basic">

<<< @/examples/skeleton/basic.vue

</Demo>

## API

### Skeleton 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| loading | 是否显示骨架 | `boolean` | `true` |
| rows | 段落行数 | `number` | `3` |
| animated | 流光动画 | `boolean` | `true` |
| avatar | 头像占位 | `boolean` | `false` |
| title | 标题占位 | `boolean` | `true` |

### Skeleton 插槽

| 插槽 | 说明 |
|---|---|
| default | 真实内容 |
| template | 自定义骨架 |

