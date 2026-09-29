# Text 文字

文字组件承载中文排版里那些**好看的小细节**：荧光笔划重点、手绘波浪线、中文**着重号**，还有竖排。

## 基础用法

`type` 控制颜色，`size` 控制字号，`font` 切换正文文楷 / 快乐体 / 行书。

<Demo src="text/basic">

<<< @/examples/text/basic.vue

</Demo>

## 装饰

`mark` 荧光笔（可选 pink / yellow / green / blue）、`wavy` 波浪线、`emphasis` 着重号、`delete` 删除线。

<Demo src="text/decoration">

<<< @/examples/text/decoration.vue

</Demo>

## 竖排与省略

`vertical` 让文字像古籍一样竖排；`truncated` 单行省略，`line-clamp` 多行省略。

<Demo src="text/vertical">

<<< @/examples/text/vertical.vue

</Demo>

## API

### Text 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| type | 颜色类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary' \| 'placeholder'` | — |
| size | 字号 | `'xs' \| 'sm' \| 'base' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | — |
| font | 字体 | `'body' \| 'display' \| 'brush'` | `'body'` |
| tag | 渲染标签 | `string` | `'span'` |
| bold | 加粗 | `boolean` | `false` |
| mark | 荧光笔 | `boolean \| 'pink' \| 'yellow' \| 'green' \| 'blue'` | — |
| wavy | 波浪下划线 | `boolean` | `false` |
| emphasis | 着重号 | `boolean` | `false` |
| delete | 删除线 | `boolean` | `false` |
| truncated | 单行省略 | `boolean` | `false` |
| line-clamp | 多行省略行数 | `number` | — |
| vertical | 竖排 | `boolean` | `false` |

