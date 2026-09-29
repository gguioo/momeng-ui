# Switch 开关

滑块上住着一张小脸：关着时面无表情，打开就**眯眼笑、脸红**。按住时滑块会被「挤扁」一点。

## 基础用法

<Demo src="switch/basic">

<<< @/examples/switch/basic.vue

</Demo>

## 切换前确认

`before-change` 返回 `false` 或 Promise reject 时阻止切换，等待期间显示加载。

<Demo src="switch/before">

<<< @/examples/switch/before.vue

</Demo>

## API

### Switch 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 绑定值 | `boolean \| string \| number` | `false` |
| active-value / inactive-value | 打开 / 关闭时的值 | `any` | `true / false` |
| active-text / inactive-text | 文字 | `string` | — |
| inline-prompt | 文字显示在轨道内 | `boolean` | `false` |
| face | 滑块小表情 | `boolean` | `true` |
| before-change | 切换前钩子 | `() => boolean \| Promise<boolean>` | — |
| loading / disabled | 加载 / 禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | — |

### Switch 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| change | 切换后 | `(value)` |

