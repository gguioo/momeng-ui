# Input 输入框

输入框像一张素绢，聚焦时描边变成朱砂色，并在右下落一道淡淡的影子。
多行文本默认带**稿纸格线**，写字像在信笺上。已处理好中文输入法组合（composition）事件。

## 基础用法

<Demo src="input/basic">

<<< @/examples/input/basic.vue

</Demo>

## 复合输入框

通过 `prepend` / `append` 插槽在前后追加内容。

<Demo src="input/group">

<<< @/examples/input/group.vue

</Demo>

## 多行文本 · 信笺

`type="textarea"`，`autosize` 自适应高度，`show-word-limit` 显示字数。

<Demo src="input/textarea">

<<< @/examples/input/textarea.vue

</Demo>

## 尺寸

<Demo src="input/size">

<<< @/examples/input/size.vue

</Demo>

## API

### Input 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `string \| number` | — |
| type | 原生 type，`textarea` 为多行 | `string` | `'text'` |
| placeholder | 占位 | `string` | — |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| clearable | 可清空 | `boolean` | `false` |
| show-password | 显示密码切换 | `boolean` | `false` |
| prefix-icon / suffix-icon | 前后图标 | `IconName` | — |
| maxlength | 最大长度 | `number` | — |
| show-word-limit | 字数统计（按字符计） | `boolean` | `false` |
| rows | textarea 行数 | `number` | `3` |
| autosize | 自适应高度 | `boolean \| { minRows, maxRows }` | `false` |
| lined | 稿纸格线 | `boolean` | `true` |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| validate-event | 触发表单校验 | `boolean` | `true` |

### Input 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| input | 输入时 | `(value: string)` |
| change | 值改变且失焦时 | `(value: string)` |
| focus / blur | 聚焦 / 失焦 | `(e: FocusEvent)` |
| clear | 清空时 | — |

### Input 插槽

| 插槽 | 说明 |
|---|---|
| prefix / suffix | 输入框内前后内容 |
| prepend / append | 输入框外前后内容 |

### Input 方法

| 方法 | 说明 | 参数 |
|---|---|---|
| focus / blur / select | 聚焦 / 失焦 / 选中文字 | — |
| clear | 清空 | — |

