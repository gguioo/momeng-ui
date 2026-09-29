# Dropdown 下拉菜单

收纳一组操作。支持悬停 / 点击 / 右键触发，以及 ↑ ↓ Enter 键盘操作。

## 基础用法

<Demo src="dropdown/basic">

<<< @/examples/dropdown/basic.vue

</Demo>

## API

### Dropdown 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| trigger | 触发方式 | `'hover' \| 'click' \| 'contextmenu'` | `'hover'` |
| placement | 方位 | 同 Tooltip | `'bottom-start'` |
| hide-on-click | 点击后收起 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |

### Dropdown 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| command | 点击菜单项 | `(command)` |
| visible-change | 显隐变化 | `(visible)` |

### Dropdown 插槽

| 插槽 | 说明 |
|---|---|
| default | 触发元素 |
| dropdown | 菜单内容 |

### DropdownItem 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| command | 指令 | `string \| number \| object` | — |
| icon | 图标 | `IconName` | — |
| disabled | 禁用 | `boolean` | `false` |
| divided | 分隔线 | `boolean` | `false` |
| danger | 危险色 | `boolean` | `false` |

