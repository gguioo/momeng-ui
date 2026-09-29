# Scroll 卷轴 ✦

一幅会**缓缓展开**的立轴 / 手卷：紫檀轴杆、淡青绫边、宣纸心，落款处可以钤一方印。
适合做活动页、诗词展示、个人签名档、「关于我」卡片……点击轴杆可以卷起 / 展开。

## 立轴

<Demo src="scroll/basic">

<<< @/examples/scroll/basic.vue

</Demo>

## 手卷

<Demo src="scroll/horizontal">

<<< @/examples/scroll/horizontal.vue

</Demo>

## API

### Scroll 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 引首标题 | `string` | — |
| direction | 立轴 / 手卷 | `'vertical' \| 'horizontal'` | `'vertical'` |
| open / v-model:open | 是否展开 | `boolean` | `true` |
| animated | 挂载时播放展开动画 | `boolean` | `true` |
| seal | 落款印章文字 | `string` | — |
| silk | 绫边颜色 | `string` | `'#a9bfb7'` |
| width | 宽度 | `string \| number` | — |

### Scroll 事件

| 事件 | 说明 | 回调参数 |
|---|---|---|
| opened | 展开完成 | — |
| closed | 卷起完成 | — |

### Scroll 插槽

| 插槽 | 说明 |
|---|---|
| default | 画心内容 |
| title | 标题 |

