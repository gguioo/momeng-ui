# Steps 步骤条

默认以**汉字数字**标序：一、二、三。进行中的那一步会变成一方歪着的朱印。

## 基础用法

<Demo src="steps/basic">

<<< @/examples/steps/basic.vue

</Demo>

## 居中、竖向与状态

<Demo src="steps/more">

<<< @/examples/steps/more.vue

</Demo>

## API

### Steps 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| active | 当前步骤（从 0 开始） | `number` | `0` |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| align-center | 居中 | `boolean` | `false` |
| process-status / finish-status | 当前 / 完成步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'process' / 'finish'` |
| chinese-number | 汉字序号 | `boolean` | `true` |

### Step 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 标题 | `string` | — |
| description | 描述 | `string` | — |
| icon | 图标 | `IconName` | — |
| status | 单独设置状态 | 同上 | — |

### Step 插槽

| 插槽 | 说明 |
|---|---|
| icon / title / description | 自定义内容 |

