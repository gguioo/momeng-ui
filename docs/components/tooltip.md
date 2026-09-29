# Tooltip 文字提示

一张浓墨小纸条，「啵」地弹出。支持 12 个方位、空间不足时自动翻转、ESC 关闭，并通过 `aria-describedby` 关联触发元素。

## 基础用法

<Demo src="tooltip/basic">

<<< @/examples/tooltip/basic.vue

</Demo>

## API

### Tooltip 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| content | 内容 | `string` | — |
| placement | 方位 | `'top' \| 'bottom' \| 'left' \| 'right'` 及 `-start` / `-end` | `'top'` |
| effect | 墨底 / 纸底 | `'dark' \| 'light'` | `'dark'` |
| trigger | 触发方式 | `'hover' \| 'click' \| 'focus' \| 'contextmenu' \| 'manual'` | `'hover'` |
| visible / v-model:visible | 手动控制显示 | `boolean` | — |
| disabled | 禁用 | `boolean` | `false` |
| offset | 偏移 | `number` | `10` |
| show-arrow | 箭头 | `boolean` | `true` |
| open-delay / close-delay | 延迟 (ms) | `number` | `80 / 120` |
| teleported | 挂到 body | `boolean` | `true` |

### Tooltip 插槽

| 插槽 | 说明 |
|---|---|
| default | 触发元素 |
| content | 提示内容 |

