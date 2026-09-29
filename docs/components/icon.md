# Icon 图标

墨萌自带一套**手绘图标**：24×24 画布、2px 圆头笔触，每一根线条都故意带一点点抖。
除通用图标外，还有「梅、云、扇、灯笼、茶盏、竹、卷轴」等**人文图标**。点击下方图标可复制代码。

## 基础用法

通过 `name` 指定图标，`size`、`color` 控制大小与颜色，默认继承文字颜色。

<Demo src="icon/basic">

<<< @/examples/icon/basic.vue

</Demo>

## 图标一览

<IconGallery />

## API

### Icon 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| name | 图标名 | `IconName` | — |
| size | 尺寸，数字按 px | `number \| string` | 继承字号 |
| color | 颜色 | `string` | `currentColor` |
| stroke-width | 笔触粗细 | `number` | `2` |
| spin | 旋转 | `boolean` | `false` |
| label | 无障碍标签，不传视为装饰 | `string` | — |

### Icon 插槽

| 插槽 | 说明 |
|---|---|
| default | 自定义 SVG |

