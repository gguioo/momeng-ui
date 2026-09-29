# Loading 加载

默认是一笔**圆相**：一笔画圆，起笔重、收笔轻，周而复始。也可以换成打瞌睡的墨团或三颗蹦跳的墨点。
提供组件、`v-loading` 指令和 `MoLoading.service()` 三种用法。

## 三种样式

<Demo src="loading/basic">

<<< @/examples/loading/basic.vue

</Demo>

## 指令与服务

在任意元素上使用 `v-loading`，或调用 `MoLoading.service()` 打开全屏加载。

<Demo src="loading/directive">

<<< @/examples/loading/directive.vue

</Demo>

## API

### Loading 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| text | 文字 | `string` | — |
| variant | 样式 | `'enso' \| 'mascot' \| 'dots'` | `'enso'` |
| size | 尺寸 | `number` | `40` |
| background | 背景 | `string` | — |

### v-loading

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| v-loading | 是否加载 | `boolean` | — |
| v-loading.fullscreen | 全屏 | — | — |
| mo-loading-text | 文字（元素属性） | `string` | — |
| mo-loading-variant | 样式（元素属性） | `string` | — |

### MoLoading.service

| 方法 | 说明 | 参数 |
|---|---|---|
| service(options) | 返回 `{ close, setText }` | `{ target?, text?, variant?, fullscreen?, background?, lock? }` |

