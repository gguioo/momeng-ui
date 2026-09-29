# Message 消息

轻量的全局反馈，从顶部「啵」地冒出来，歪一下再站稳。函数式调用，无需在模板里写组件。

::: tip 全局挂载
`app.use(MoMeng)` 后，也可以在选项式组件中用 `this.$message.success('...')`。
:::

## 基础用法

<Demo src="message/basic">

<<< @/examples/message/basic.vue

</Demo>

## API

### Message 参数

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| message | 内容 | `string \| VNode \| () => VNode` | — |
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` |
| duration | 显示时长 (ms)，0 不自动关闭 | `number` | `3000` |
| show-close | 显示关闭按钮 | `boolean` | `false` |
| icon | 自定义图标 | `IconName` | — |
| grouping | 合并相同内容 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | — |

### Message 方法

| 方法 | 说明 | 参数 |
|---|---|---|
| MoMessage(options) | 打开消息，返回 `{ close }` | `MessageParams` |
| MoMessage.success / warning / danger / info / primary | 快捷方法 | `string \| options` |
| MoMessage.closeAll | 关闭全部 | — |

