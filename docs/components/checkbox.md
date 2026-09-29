# Checkbox 多选框

勾选时，对勾会**一笔写出来**。悬停时方框会俏皮地歪一下头。

## 基础用法

<Demo src="checkbox/basic">

<<< @/examples/checkbox/basic.vue

</Demo>

## 全选与限制

`indeterminate` 半选；`CheckboxGroup` 的 `min` / `max` 限制数量。

<Demo src="checkbox/indeterminate">

<<< @/examples/checkbox/indeterminate.vue

</Demo>

## API

### Checkbox 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `boolean \| string \| number` | — |
| value | 在 Group 中代表的值 | `string \| number \| boolean` | — |
| label | 文字（也作为 Group 中的值） | `string` | — |
| true-value / false-value | 选中 / 未选中时的值 | `any` | `true / false` |
| indeterminate | 半选 | `boolean` | `false` |
| border | 边框样式 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |

### CheckboxGroup 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `Array` | `[]` |
| min / max | 最少 / 最多勾选数 | `number` | — |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| disabled | 禁用 | `boolean` | `false` |

### 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 值改变 | `(value)` |

