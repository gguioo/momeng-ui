# Backtop 回到顶部

滚动一段距离后，墨团会从右下角探出头来，点一下就带你回到开头。本页右下角就有一只。

## 基础用法

<Demo src="backtop/basic">

<<< @/examples/backtop/basic.vue

</Demo>

## API

### Backtop 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| target | 滚动容器选择器 | `string` | window |
| visibility-height | 滚动多少后出现 | `number` | `200` |
| right / bottom | 位置 (px) | `number` | `40` |

### Backtop 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| click | 点击 | `(e: MouseEvent)` |

### Backtop 插槽

| 插槽 | 说明 |
|---|---|
| default | 自定义内容 |

