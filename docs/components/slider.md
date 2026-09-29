# Slider 滑块

滑轨是一根墨线，滑块中心一点朱砂，拖动时会歪头并冒出数值气泡。支持范围选择、刻度与键盘操作。

## 基础用法

<Demo src="slider/basic">

<<< @/examples/slider/basic.vue

</Demo>

## API

### Slider 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `number \| [number, number]` | `0` |
| min / max / step | 范围与步长 | `number` | `0 / 100 / 1` |
| range | 范围选择 | `boolean` | `false` |
| show-tooltip | 数值气泡 | `boolean` | `true` |
| format-tooltip | 格式化气泡 | `(v: number) => string` | — |
| show-stops | 显示间断点 | `boolean` | `false` |
| marks | 刻度 | `Record<number, string>` | — |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |

### Slider 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| input | 拖动中 | `(value)` |
| change | 松手后 | `(value)` |

