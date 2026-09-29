# Grid 栅格

24 栏栅格。`MoRow` 管行与间距，`MoCol` 管列宽，支持 `xs / sm / md / lg / xl` 响应式断点。

## 基础用法

<Demo src="grid/basic">

<<< @/examples/grid/basic.vue

</Demo>

## 响应式

拖动浏览器宽度看看。

<Demo src="grid/responsive">

<<< @/examples/grid/responsive.vue

</Demo>

## API

### Row 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| gutter | 栅格间隔 (px) | `number` | `0` |
| justify | 水平排列 | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` |
| align | 垂直对齐 | `'top' \| 'middle' \| 'bottom'` | — |
| tag | 渲染标签 | `string` | `'div'` |

### Col 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| span | 占据栏数 | `number` | `24` |
| offset | 左侧偏移栏数 | `number` | `0` |
| push / pull | 右移 / 左移 | `number` | `0` |
| xs / sm / md / lg / xl | 响应式栏数或 `{ span, offset }` | `number \| object` | — |

