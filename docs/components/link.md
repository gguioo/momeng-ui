# Link 链接

悬停时，一条**手绘波浪线**从左往右慢慢写出来。

## 基础用法

<Demo src="link/basic">

<<< @/examples/link/basic.vue

</Demo>

## API

### Link 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| type | 类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| href | 链接地址 | `string` | — |
| target | 打开方式 | `string` | — |
| underline | 下划线时机 | `'hover' \| 'always' \| 'never'` | `'hover'` |
| disabled | 禁用 | `boolean` | `false` |
| icon | 图标 | `IconName` | — |

### Link 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| click | 点击 | `(e: MouseEvent)` |

