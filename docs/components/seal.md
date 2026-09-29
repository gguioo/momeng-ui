# Seal 印章 ✦

书画作品最后一步，是钤印。`MoSeal` 用纯 SVG 生成一方**会随机做旧的印章**：
支持白文（阴刻）与朱文（阳刻）、方 / 圆 / 椭圆三种形制，按传统**自右向左、自上而下**排布印文，
并用 SVG 滤镜模拟**残破的边缘与不匀的印泥**。同一个印文，每次渲染都一样。

它可以用作 Logo、签名落款、「已完成」印记，或者任何你想盖个章的地方。

## 白文与朱文

白文 `bai`：红底留白字；朱文 `zhu`：红字红框。

<Demo src="seal/basic">

<<< @/examples/seal/basic.vue

</Demo>

## 形制与颜色

<Demo src="seal/shape">

<<< @/examples/seal/shape.vue

</Demo>

## 盖章动画

`stamp` 在挂载时播放一次「按下去」的动画。常用于完成、审批通过等时刻。

<Demo src="seal/stamp">

<<< @/examples/seal/stamp.vue

</Demo>

## API

### Seal 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| text | 印文（最多 4 字） | `string` | `'墨萌'` |
| type | 白文 / 朱文 | `'bai' \| 'zhu'` | `'bai'` |
| shape | 形制 | `'square' \| 'round' \| 'oval'` | `'square'` |
| size | 边长 | `number \| string` | `64` |
| color | 印泥颜色 | `string` | `var(--mo-color-primary)` |
| tilt | 倾斜角度；`true` 为根据印文生成的自然微倾 | `boolean \| number` | `true` |
| weathered | 斑驳做旧 | `boolean` | `true` |
| stamp | 挂载时播放盖章动画 | `boolean` | `false` |

