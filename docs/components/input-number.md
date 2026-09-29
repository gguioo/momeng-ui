# InputNumber 数字输入

只能输入数字，支持步长、精度、范围，已处理 `0.1 + 0.2` 这类浮点误差。上下方向键也能加减。

## 基础用法

<Demo src="input-number/basic">

<<< @/examples/input-number/basic.vue

</Demo>

## API

### InputNumber 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `number \| null` | — |
| min / max | 范围 | `number` | `-Infinity / Infinity` |
| step | 步长 | `number` | `1` |
| step-strictly | 只能输入步长的倍数 | `boolean` | `false` |
| precision | 精度 | `number` | — |
| controls | 按钮位置 | `'both' \| 'right' \| 'none'` | `'both'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| placeholder | 占位 | `string` | — |

### InputNumber 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 值改变 | `(value, oldValue)` |
| focus / blur | 聚焦 / 失焦 | `(e: FocusEvent)` |

