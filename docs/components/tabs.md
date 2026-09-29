# Tabs 标签页

三种样式：`line` 一笔**毛笔下划线**跟着你滑动、`card` 档案夹、`bookmark` 夹在书页边的**彩色书签**。支持 ←/→/Home/End 键盘切换、懒渲染、增删与切换拦截。

## 三种样式

<Demo src="tabs/basic">

<<< @/examples/tabs/basic.vue

</Demo>

## 增删标签

<Demo src="tabs/editable">

<<< @/examples/tabs/editable.vue

</Demo>

## API

### Tabs 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 当前标签 name | `string \| number` | 第一个 |
| type | 样式 | `'line' \| 'card' \| 'bookmark'` | `'line'` |
| closable | 可关闭 | `boolean` | `false` |
| addable | 可新增 | `boolean` | `false` |
| stretch | 标签撑满 | `boolean` | `false` |
| before-leave | 切换前钩子，返回 false 阻止 | `(next, prev) => boolean \| Promise<boolean>` | — |

### Tabs 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| tab-change | 切换后 | `(name)` |
| tab-remove | 点击关闭 | `(name)` |
| tab-add | 点击新增 | — |

### TabPane 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| name | 标识 | `string \| number` | — |
| label | 标题 | `string` | — |
| icon | 图标 | `IconName` | — |
| disabled | 禁用 | `boolean` | `false` |
| closable | 单独控制可关闭 | `boolean` | — |
| lazy | 首次激活才渲染 | `boolean` | `false` |

### TabPane 插槽

| 插槽 | 说明 |
|---|---|
| default | 内容 |
| label | 自定义标题 |

