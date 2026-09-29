# Radio 单选框

选中时，一滴朱砂在圆圈里「啵」地晕开。按钮样式像一排挂在墙上的小木牌。

## 基础用法

<Demo src="radio/basic">

<<< @/examples/radio/basic.vue

</Demo>

## API

### Radio 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值（单独使用时） | `string \| number \| boolean` | — |
| value | 单选框的值 | `string \| number \| boolean` | — |
| label | 文字 | `string` | — |
| border | 边框样式 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |

### RadioGroup 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `string \| number \| boolean` | — |
| type | 按钮样式 | `'default' \| 'button'` | `'default'` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| disabled | 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |

### 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 值改变 | `(value)` |

