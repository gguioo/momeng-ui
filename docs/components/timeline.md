# Timeline 时间线

一条虚线墨迹串起时光，节点是一颗颗不太圆的墨点。

## 基础用法

<Demo src="timeline/basic">

<<< @/examples/timeline/basic.vue

</Demo>

## 左右交替

<Demo src="timeline/alternate">

<<< @/examples/timeline/alternate.vue

</Demo>

## API

### Timeline 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| reverse | 倒序 | `boolean` | `false` |
| mode | 排列 | `'left' \| 'alternate'` | `'left'` |

### TimelineItem 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| timestamp | 时间 | `string` | — |
| hide-timestamp | 隐藏时间 | `boolean` | `false` |
| placement | 时间位置 | `'top' \| 'bottom'` | `'bottom'` |
| type | 节点颜色 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| color | 自定义颜色 | `string` | — |
| icon | 节点图标 | `IconName` | — |
| hollow | 空心 | `boolean` | `false` |
| size | 节点大小 | `'normal' \| 'large'` | `'normal'` |

### TimelineItem 插槽

| 插槽 | 说明 |
|---|---|
| default | 内容 |
| dot | 自定义节点 |

