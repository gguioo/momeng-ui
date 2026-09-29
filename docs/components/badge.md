# Badge 徽章

像贴在角落的一枚小贴纸，歪着 6 度。

## 基础用法

<Demo src="badge/basic">

<<< @/examples/badge/basic.vue

</Demo>

## API

### Badge 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| value | 显示值 | `string \| number` | — |
| max | 最大值，超出显示 `max+` | `number` | `99` |
| is-dot | 小红点 | `boolean` | `false` |
| hidden | 隐藏 | `boolean` | `false` |
| show-zero | 值为 0 时显示 | `boolean` | `false` |
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` |
| offset | 偏移 `[x, y]` | `[number, number]` | — |
| color | 背景色 | `string` | — |

