# Rate 评分

星星、爱心、梅花……选一个你喜欢的图标来打分。悬停预览、半星、键盘操作都已支持。

## 基础用法

<Demo src="rate/basic">

<<< @/examples/rate/basic.vue

</Demo>

## API

### Rate 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `number` | `0` |
| max | 最大分值 | `number` | `5` |
| icon | 图标 | `IconName` | `'star'` |
| allow-half | 允许半分 | `boolean` | `false` |
| clearable | 再次点击同值清零 | `boolean` | `false` |
| show-text | 显示文案 | `boolean` | `false` |
| texts | 文案 | `string[]` | `[不太行, 还可以, 挺好的, 很喜欢, 超级爱]` |
| color | 高亮颜色 | `string` | 藤黄 |
| readonly / disabled | 只读 / 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |

### Rate 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 分值改变 | `(value: number)` |

