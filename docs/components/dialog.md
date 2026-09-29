# Dialog 对话框

对话框是一页信笺。打开时从上方轻轻落下、带一点旋转；支持 ESC 关闭、焦点陷阱、关闭后焦点归还、多层叠加与滚动锁定。
`lined` 开启**朱丝栏**竖格，`seal` 在标题旁钤印。

## 基础用法

<Demo src="dialog/basic">

<<< @/examples/dialog/basic.vue

</Demo>

## 关闭前确认

`before-close` 接管关闭，调用 `done()` 才真正关闭。

<Demo src="dialog/before">

<<< @/examples/dialog/before.vue

</Demo>

## API

### Dialog 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| model-value / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| width | 宽度 | `string \| number` | `'480px'` |
| top | 距顶部 | `string` | `'14vh'` |
| align-center | 垂直居中 | `boolean` | `false` |
| center | 内容居中 | `boolean` | `false` |
| fullscreen | 全屏 | `boolean` | `false` |
| lined | 朱丝栏竖格 | `boolean` | `false` |
| seal | 标题旁印章 | `string` | — |
| modal | 遮罩 | `boolean` | `true` |
| close-on-click-modal | 点遮罩关闭 | `boolean` | `true` |
| close-on-press-escape | ESC 关闭 | `boolean` | `true` |
| show-close | 关闭按钮 | `boolean` | `true` |
| before-close | 关闭前钩子 | `(done) => void` | — |
| lock-scroll | 锁定滚动 | `boolean` | `true` |
| append-to-body | 挂到 body | `boolean` | `true` |
| destroy-on-close | 关闭时销毁内容 | `boolean` | `false` |
| z-index | 层级 | `number` | 自动 |

### Dialog 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| open / opened | 打开 / 动画结束 | — |
| close / closed | 关闭 / 动画结束 | — |

### Dialog 插槽

| 插槽 | 说明 |
|---|---|
| default | 内容 |
| header | 标题，参数 `{ close }` |
| footer | 底部，参数 `{ close }` |

