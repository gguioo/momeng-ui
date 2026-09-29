# Button 按钮

按钮是用户落下的第一笔。墨萌的按钮用**手绘不规则圆角**勾边，配一道**钤印般的错位实影**；
悬停时微微抬起，按下时像印章压到纸上，影子被「按」进去，再轻轻回弹。

## 基础用法

使用 `type`、`plain`、`round`、`circle` 定义按钮的样子。

<Demo src="button/basic">

<<< @/examples/button/basic.vue

</Demo>

## 文字与虚线按钮

`text` 去掉边框与阴影，适合次要操作；`dashed` 常用于「新增」类入口。

<Demo src="button/text">

<<< @/examples/button/text.vue

</Demo>

## 图标与加载

通过 `icon` 使用内置手绘图标，`loading` 时自动显示旋转的墨圈并禁用点击。

<Demo src="button/icon">

<<< @/examples/button/icon.vue

</Demo>

## 尺寸与块级

`size` 提供三档尺寸，`block` 撑满父容器。

<Demo src="button/size">

<<< @/examples/button/size.vue

</Demo>

## 按钮组

`MoButtonGroup` 把按钮连成一排，并统一注入 `size` 与 `type`。

<Demo src="button/group">

<<< @/examples/button/group.vue

</Demo>

## API

### Button 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| type | 语义类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| plain | 素雅（浅底 + 同色描边） | `boolean` | `false` |
| text | 文字按钮 | `boolean` | `false` |
| dashed | 虚线描边 | `boolean` | `false` |
| round | 胶囊圆角 | `boolean` | `false` |
| circle | 圆形按钮 | `boolean` | `false` |
| block | 撑满父容器 | `boolean` | `false` |
| loading | 加载中 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| icon | 左侧图标名 | `IconName` | — |
| native-type | 原生 type | `'button' \| 'submit' \| 'reset'` | `'button'` |
| tag | 渲染的标签 | `string` | `'button'` |
| autofocus | 自动聚焦 | `boolean` | `false` |

### Button 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| click | 点击时触发（禁用/加载时不触发） | `(e: MouseEvent)` |

### Button 插槽

| 插槽 | 说明 |
|---|---|
| default | 按钮文字 |
| icon | 自定义图标 |

### ButtonGroup 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 统一尺寸 | `'small' \| 'default' \| 'large'` | — |
| type | 统一类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |

