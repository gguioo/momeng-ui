# Alert 提示

页面内的静态提示。左侧一笔浓墨标出类型，文字用深一度的同色写就。

## 基础用法

<Demo src="alert/basic">

<<< @/examples/alert/basic.vue

</Demo>

## API

### Alert 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 标题 | `string` | — |
| description | 描述 | `string` | — |
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` |
| effect | 效果 | `'light' \| 'dark'` | `'light'` |
| closable | 可关闭 | `boolean` | `true` |
| close-text | 关闭按钮文字 | `string` | — |
| show-icon | 显示图标 | `boolean` | `true` |
| center | 居中 | `boolean` | `false` |

### Alert 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| close | 关闭 | `(e: MouseEvent)` |

### Alert 插槽

| 插槽 | 说明 |
|---|---|
| default | 描述 |
| title | 标题 |

