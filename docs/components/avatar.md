# Avatar 头像

没有图片时，墨团会替你出镜。

## 基础用法

<Demo src="avatar/basic">

<<< @/examples/avatar/basic.vue

</Demo>

## API

### Avatar 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| src | 图片地址 | `string` | — |
| alt | 替代文字 | `string` | — |
| size | 尺寸 | `number \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 形状 | `'circle' \| 'square'` | `'circle'` |
| icon | 图标 | `IconName` | — |
| fit | 图片填充 | `string` | `'cover'` |
| color | 背景色 | `string` | 桃夭 |

### Avatar 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| error | 图片加载失败 | `(e: Event)` |

