# Card 卡片

一张带纸纹的素绢。可以贴一段**和纸胶带**、在角落**钤一方小印**，像手账里的一页。

## 基础用法

<Demo src="card/basic">

<<< @/examples/card/basic.vue

</Demo>

## API

### Card 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| header | 标题 | `string` | — |
| shadow | 阴影时机 | `'always' \| 'hover' \| 'never'` | `'always'` |
| textured | 纸张纹理 | `boolean` | `true` |
| tape | 和纸胶带 | `boolean \| 'pink' \| 'green' \| 'blue' \| 'yellow'` | — |
| seal | 右下角印章文字 | `string` | — |
| hoverable | 悬停上浮 | `boolean` | `false` |
| body-style | 内容区样式 | `string \| object` | — |

### Card 插槽

| 插槽 | 说明 |
|---|---|
| default | 内容 |
| header | 标题 |
| extra | 标题右侧 |
| footer | 底部 |

