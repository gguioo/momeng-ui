# Collapse 折叠面板

每一项前面有一朵小梅花，展开时会**转一转**。支持手风琴模式与完整的 ARIA 属性。

## 基础用法

<Demo src="collapse/basic">

<<< @/examples/collapse/basic.vue

</Demo>

## API

### Collapse 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 展开项 | `string \| number \| Array` | `[]` |
| accordion | 手风琴 | `boolean` | `false` |

### Collapse 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 展开项变化 | `(value)` |

### CollapseItem 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| name | 唯一标识 | `string \| number` | 自动生成 |
| title | 标题 | `string` | — |
| icon | 标题前图标 | `IconName` | `'plum'` |
| disabled | 禁用 | `boolean` | `false` |

### CollapseItem 插槽

| 插槽 | 说明 |
|---|---|
| default | 内容 |
| title | 标题 |

