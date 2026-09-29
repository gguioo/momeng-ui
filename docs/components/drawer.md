# Drawer 抽屉

从屏幕边缘滑出的一张纸，边上带一道朱砂色的影子。与 Dialog 共享同一套弹层逻辑。

## 基础用法

<Demo src="drawer/basic">

<<< @/examples/drawer/basic.vue

</Demo>

## API

### Drawer 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 是否显示 | `boolean` | `false` |
| direction | 方向 | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` |
| size | 宽度或高度 | `string \| number` | `'30%'` |
| title | 标题 | `string` | — |
| with-header | 显示头部 | `boolean` | `true` |
| 其余 | 同 Dialog：modal / before-close / close-on-click-modal 等 | — | — |

### Drawer 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| open / opened / close / closed | 同 Dialog | — |

### Drawer 插槽

| 插槽 | 说明 |
|---|---|
| default | 内容 |
| header | 标题 |
| footer | 底部 |

