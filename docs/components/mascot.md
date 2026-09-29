# Mascot 墨团 ✦

墨团是墨萌的吉祥物：一滴不太圆的墨，头顶一撇像毛笔收锋，脸上有两团桃夭色的腮红。
它出现在空状态、加载、通知、确认框、头像兜底里 —— **只在需要安慰和陪伴的时候出现**。

## 七种心情

<Demo src="mascot/basic">

<<< @/examples/mascot/basic.vue

</Demo>

## 换一种墨色

`color` 修改身体颜色，`animated` 控制浮动。

<Demo src="mascot/color">

<<< @/examples/mascot/color.vue

</Demo>

## API

### Mascot 属性

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| mood | 心情 | `'happy' \| 'calm' \| 'wink' \| 'love' \| 'sleepy' \| 'surprised' \| 'sad'` | `'happy'` |
| size | 尺寸 | `number \| string` | `96` |
| color | 身体颜色 | `string` | 松烟墨 |
| animated | 浮动动画 | `boolean` | `true` |

