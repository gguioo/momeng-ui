# Notification 通知

从角落飞来的一张便笺，顶部贴着一截彩色纸胶带。`mascot` 让墨团亲自来送信。

## 基础用法

<Demo src="notification/basic">

<<< @/examples/notification/basic.vue

</Demo>

## API

### Notification 参数

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 标题 | `string` | — |
| message | 内容 | `string \| VNode` | — |
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| duration | 时长 (ms)，0 不自动关闭 | `number` | `4500` |
| position | 位置 | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` |
| show-close | 关闭按钮 | `boolean` | `true` |
| icon | 自定义图标 | `IconName` | — |
| mascot | 用墨团代替图标 | `boolean` | `false` |
| onClick / onClose | 回调 | `() => void` | — |

### Notification 方法

| 方法 | 说明 | 参数 |
|---|---|---|
| MoNotification(options) | 打开通知，返回 `{ close }` | — |
| MoNotification.success 等 | 快捷方法 | — |
| MoNotification.closeAll | 关闭全部 | — |

