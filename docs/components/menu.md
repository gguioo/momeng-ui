# Menu 菜单

竖向菜单用一点朱砂标出当前项，横向菜单则在底部写一笔横画。支持子菜单、分组与折叠。

## 竖向菜单

<Demo src="menu/vertical">

<<< @/examples/menu/vertical.vue

</Demo>

## 横向菜单

<Demo src="menu/horizontal">

<<< @/examples/menu/horizontal.vue

</Demo>

## API

### Menu 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 当前激活项 index | `string` | — |
| mode | 模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| default-openeds | 默认展开的子菜单 | `string[]` | `[]` |
| unique-opened | 子菜单手风琴 | `boolean` | `false` |
| collapse | 折叠为图标（竖向） | `boolean` | `false` |

### Menu 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| select | 选中菜单项 | `(index)` |
| open / close | 子菜单展开 / 收起 | `(index)` |

### MenuItem 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| index | 唯一标识 | `string` | — |
| icon | 图标 | `IconName` | — |
| disabled | 禁用 | `boolean` | `false` |

### SubMenu 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| index | 唯一标识 | `string` | — |
| title | 标题 | `string` | — |
| icon | 图标 | `IconName` | — |
| disabled | 禁用 | `boolean` | `false` |

### MenuItemGroup 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 分组标题 | `string` | — |

