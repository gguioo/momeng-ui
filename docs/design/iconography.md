# 图标与插画

## 手绘图标绘制规范

| 项目 | 规范 |
|---|---|
| 画布 | 24 × 24，内容安全区 3 ~ 21 |
| 笔触 | 2px，`stroke-linecap: round`，`stroke-linejoin: round` |
| 填充 | 默认无填充；实心需求（评分）由组件通过 `fill: currentColor` 实现 |
| 抖动 | 直线用轻微弧度的贝塞尔曲线代替，偏移不超过 0.4px |
| 颜色 | 始终使用 `currentColor`，跟随文字 |
| 端点 | 线条不闭合时，两端留出「起笔」「收笔」的感觉 |

图标分为五组：**通用、状态、物件、萌、人文**。「人文」组（梅、云、扇、灯笼、茶盏、叶、远山、竹、卷轴、毛笔）是墨萌的特色，
适合作为装饰或品牌元素，但**不要用人文图标表达通用操作**（比如不要用扇子表示「展开」）。

<IconGallery />

## 墨团使用守则

<div style="display:flex;gap:18px;flex-wrap:wrap;margin:16px 0">
  <MoMascot mood="happy" :size="64" />
  <MoMascot mood="wink" :size="64" />
  <MoMascot mood="love" :size="64" />
  <MoMascot mood="sleepy" :size="64" />
  <MoMascot mood="surprised" :size="64" />
  <MoMascot mood="sad" :size="64" />
</div>

- **出现时机**：空状态、加载、确认框、通知、头像兜底、回到顶部。它是陪伴者，不是装饰贴纸。
- **表情与语义对应**：成功 → happy；等待 → sleepy；警示 → surprised；失败 → sad；轻松提醒 → wink；喜欢 / 收藏 → love。
- **数量**：一屏最多出现一只墨团。
- **不要**：拉伸变形、旋转超过 10°、改成与墨色差异很大的荧光色、放在正在输入的表单旁边。

## 印章使用守则

- 一个视图中**最多两方印**，大小不同、位置错开，模仿书画的「钤印」章法。
- 印文 1 ~ 4 字，优先使用有意义的短词（名字、「已阅」、「准」）。
- 印章是**结论**：放在内容的结尾处（右下角、落款处），不要放在开头。
