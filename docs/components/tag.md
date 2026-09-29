# Tag 标签

小标签像夹在书页里的签条。三种效果：`light` 淡彩、`dark` 浓墨、`plain` 白描虚线。

## 基础用法

<Demo src="tag/basic">

<<< @/examples/tag/basic.vue

</Demo>

## API

### Tag 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| type | 类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| effect | 效果 | `'light' \| 'dark' \| 'plain'` | `'light'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |
| closable | 可关闭 | `boolean` | `false` |
| round | 胶囊 | `boolean` | `false` |
| color | 自定义颜色 | `string` | — |
| icon | 图标 | `IconName` | — |

### Tag 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| close | 点击关闭 | `(e: MouseEvent)` |
| click | 点击 | `(e: MouseEvent)` |

