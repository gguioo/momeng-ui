# Select 选择器

下拉选择。支持 `options` 数组或 `<MoOption>` 插槽两种写法、多选标签、搜索过滤、清空，以及完整的键盘操作（↑ ↓ Enter Esc）。

## 基础用法

<Demo src="select/basic">

<<< @/examples/select/basic.vue

</Demo>

## 多选与搜索

<Demo src="select/multiple">

<<< @/examples/select/multiple.vue

</Demo>

## API

### Select 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `string \| number \| boolean \| Array` | — |
| options | 选项 | `{ label, value, disabled? }[]` | — |
| multiple | 多选 | `boolean` | `false` |
| multiple-limit | 最多选几个，0 为不限 | `number` | `0` |
| filterable | 可搜索 | `boolean` | `false` |
| clearable | 可清空 | `boolean` | `false` |
| placeholder | 占位 | `string` | `'请选择'` |
| no-data-text / no-match-text | 空数据 / 无匹配文案 | `string` | — |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |
| teleported | 下拉层挂到 body | `boolean` | `true` |

### Option 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| value | 值 | `string \| number \| boolean` | — |
| label | 文字 | `string` | — |
| disabled | 禁用 | `boolean` | `false` |

### Select 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 值改变 | `(value)` |
| visible-change | 下拉显隐 | `(visible: boolean)` |
| remove-tag | 多选移除标签 | `(value)` |
| clear | 清空 | — |

