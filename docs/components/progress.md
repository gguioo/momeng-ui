# Progress 进度条

线形与环形两种。`striped` 让进度条带上**流动的笔刷条纹**，`indeterminate` 表示进度未知。

## 基础用法

<Demo src="progress/basic">

<<< @/examples/progress/basic.vue

</Demo>

## 环形

<Demo src="progress/circle">

<<< @/examples/progress/circle.vue

</Demo>

## API

### Progress 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| percentage | 百分比 | `number` | `0` |
| type | 类型 | `'line' \| 'circle'` | `'line'` |
| status | 状态 | `'success' \| 'warning' \| 'danger' \| 'info'` | — |
| stroke-width | 粗细 | `number` | `10` |
| width | 环形直径 | `number` | `120` |
| show-text | 显示文字 | `boolean` | `true` |
| text-inside | 文字在条内 | `boolean` | `false` |
| color | 颜色 | `string` | 朱砂 |
| striped | 笔刷条纹 | `boolean` | `false` |
| indeterminate | 不确定进度 | `boolean` | `false` |
| format | 自定义文字 | `(p) => string` | — |

