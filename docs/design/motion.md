# 动效

墨萌的动效只有两种性格：

<TokenTable :tokens="[
  { name: '--mo-ease-ink', value: 'cubic-bezier(.22,.61,.36,1)', desc: '「雅」：像墨在纸上晕开，先快后慢。用于颜色、透明度、尺寸、位移', preview: 'ease' },
  { name: '--mo-ease-bounce', value: 'cubic-bezier(.34,1.56,.64,1)', desc: '「萌」：略微冲过头再回来。只用于用户操作后的回应', preview: 'ease' },
]" />

<p><MoText type="secondary" size="sm">把鼠标移到表格行上看小圆点的运动。</MoText></p>

## 时长

| 变量 | 时长 | 用途 |
|---|---|---|
| `--mo-duration-fast` | 150ms | 悬停、按下、颜色变化 |
| `--mo-duration` | 250ms | 展开、弹出、切换 |
| `--mo-duration-slow` | 420ms | 大面积位移、下划线跟随、笔画绘制 |

## 签名动效

| 动效 | 组件 | 说明 |
|---|---|---|
| 钤印按压 | Button、Card | 悬停抬起，按下时阴影被「按」进纸里 |
| 一笔写出 | Checkbox | `stroke-dashoffset` 让对勾从起笔画到收笔 |
| 朱砂晕开 | Radio | 圆点以 bounce 曲线从 0 放大 |
| 毛笔跟随 | Tabs | 下划线以 bounce 曲线滑到新标签，宽度同步变化 |
| 盖章 | Seal `stamp` | 从 1.9 倍大小落下、轻微模糊到清晰 |
| 卷轴展开 | Scroll | `grid-template-rows: 0fr → 1fr`，轴杆随之移动 |
| 圆相 | Loading | 一笔画圆，笔触由粗到细 |
| 浮动 | Mascot | 墨团缓慢上下浮动、微微摇摆 |

## 规则

1. **动效服务于因果**：只有用户操作之后才出现 bounce；页面加载时不要让一堆东西弹来弹去。
2. **一次只动一处**：同一时刻最多一个吸引注意力的动效。
3. **可以被关掉**：检测到 `prefers-reduced-motion: reduce` 时，所有 `mo-` 前缀元素的动画与过渡会被压缩到接近 0。
