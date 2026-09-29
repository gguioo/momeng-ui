# Form 表单

表单负责**收集、校验、提交**。内置轻量校验器（零依赖），支持必填、长度、类型（email / url / phone / number）、正则与异步自定义校验；
校验失败时输入框会轻轻「摇头」，错误文案用 ✎ 批注的口吻写在下方。

## 基础用法

<Demo src="form/basic">

<<< @/examples/form/basic.vue

</Demo>

## 行内与顶部标签

`inline` 行内排列；`label-position="top"` 标签在上方。

<Demo src="form/inline">

<<< @/examples/form/inline.vue

</Demo>

## API

### Form 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model | 表单数据 | `object` | — |
| rules | 校验规则 | `FormRules` | — |
| label-position | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |
| label-width | 标签宽度 | `string \| number` | — |
| inline | 行内 | `boolean` | `false` |
| size | 统一尺寸 | `'small' \| 'default' \| 'large'` | — |
| disabled | 统一禁用 | `boolean` | `false` |
| show-message | 显示错误文案 | `boolean` | `true` |
| hide-required-asterisk | 隐藏必填标记 | `boolean` | `false` |
| scroll-to-error | 校验失败时滚动到首个错误 | `boolean` | `false` |

### Form 方法

| 方法 | 说明 | 参数 |
|---|---|---|
| validate | 校验整个表单或指定字段 | `(props?) => Promise<{ valid, errors }>` |
| validateField | 校验指定字段 | `(props) => Promise<...>` |
| resetFields | 重置为初始值并清除校验 | `(props?) => void` |
| clearValidate | 清除校验状态 | `(props?) => void` |

### Form 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| validate | 任一字段校验后 | `(prop, valid, message)` |

### FormItem 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| label | 标签 | `string` | — |
| prop | 对应 model 的字段，支持 `a.b` 路径 | `string` | — |
| rules | 本项规则，与 Form 合并 | `FormRule \| FormRule[]` | — |
| required | 是否必填 | `boolean` | — |
| label-width | 标签宽度 | `string \| number` | — |
| error | 手动错误文案 | `string` | — |
| size | 本项尺寸 | `'small' \| 'default' \| 'large'` | — |

### FormRule

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| required | 必填 | `boolean` | — |
| message | 错误文案 | `string` | 内置可爱文案 |
| trigger | 触发时机 | `'blur' \| 'change' \| 数组` | — |
| type | 类型 | `'string' \| 'number' \| 'email' \| 'url' \| 'phone' \| 'array'` | — |
| min / max / len | 长度（按字符）或数值范围 | `number` | — |
| pattern | 正则 | `RegExp` | — |
| validator | 自定义，返回 true 通过、字符串为错误文案，支持 Promise | `(value, rule) => boolean \| string \| Promise` | — |

