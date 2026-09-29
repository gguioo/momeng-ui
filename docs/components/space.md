# Space 间距

用 `gap` 统一处理组件之间的留白 —— 留白是中国画最重要的部分。

## 基础用法

<Demo src="space/basic">

<<< @/examples/space/basic.vue

</Demo>

## API

### Space 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距，可传 `[水平, 竖直]` | `'small' \| 'default' \| 'large' \| number \| [SpaceSize, SpaceSize]` | `'default'` |
| align | 交叉轴对齐 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | — |
| justify | 主轴对齐 | `string` | — |
| wrap | 换行 | `boolean` | `false` |
| fill | 子元素撑满 | `boolean` | `false` |

