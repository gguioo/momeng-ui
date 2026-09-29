# MessageBox 确认框

需要用户**停下来想一想**的时候使用。墨团会根据类型换上相应的表情。返回 Promise，写起来像 `window.confirm` 一样顺手。

## 基础用法

<Demo src="message-box/basic">

<<< @/examples/message-box/basic.vue

</Demo>

## API

### MessageBox 参数

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 标题 | `string` | `'提示'` |
| message | 内容 | `string` | — |
| type | 类型（决定墨团表情） | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| confirmButtonText / cancelButtonText | 按钮文字 | `string` | `'好的' / '再想想'` |
| showCancelButton | 显示取消 | `boolean` | `true` |
| danger | 危险操作 | `boolean` | `false` |
| closeOnClickModal | 点遮罩关闭 | `boolean` | `false` |
| beforeConfirm | 确认前异步钩子 | `() => boolean \| Promise<boolean>` | — |

### MessageBox 方法

| 方法 | 说明 | 参数 |
|---|---|---|
| MoMessageBox(options) | 打开，resolve `'confirm' \| 'cancel' \| 'close'` | — |
| MoMessageBox.confirm(msg, title?, opts?) | 确认框，resolve `boolean` | — |
| MoMessageBox.alert(msg, title?, opts?) | 提示框 | — |

