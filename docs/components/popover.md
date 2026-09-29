# Popover 气泡卡片

比 Tooltip 更大一点的浮层，适合放标题、说明和操作。默认点击触发。

## 基础用法

<Demo src="popover/basic">

<<< @/examples/popover/basic.vue

</Demo>

## API

### Popover 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 标题 | `string` | — |
| content | 内容 | `string` | — |
| width | 宽度 | `string \| number` | `220` |
| trigger | 触发方式 | 同 Tooltip | `'click'` |
| placement | 方位 | `'top' \| 'bottom' \| 'left' \| 'right'` 及 `-start` / `-end` | `'bottom'` |
| 其余 | 同 Tooltip | — | — |

### Popover 插槽

| 插槽 | 说明 |
|---|---|
| default / reference | 触发元素 |
| title | 标题 |
| content | 内容 |

