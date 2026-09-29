# 形状 · 描边 · 阴影

## 手绘圆角

墨萌不使用四角相等的圆角。每个角的横向、纵向半径都略有不同，看起来像**用笔描出来**的：

<TokenTable :tokens="[
  { name: '--mo-radius-hand', value: '16 22 14 24 / 22 14 24 16', desc: '按钮、标签等小控件', preview: 'radius' },
  { name: '--mo-radius-hand-alt', value: '镜像', desc: '输入框、选择器（与按钮相邻时不「撞脸」）', preview: 'radius' },
  { name: '--mo-radius-wobble', value: '12 16 10 18 / 16 10 18 12', desc: '卡片、对话框、表格', preview: 'radius' },
  { name: '--mo-radius-wobble-sm', value: '4 6 3 7 / 6 3 7 4', desc: '复选框、选项、小色块', preview: 'radius' },
  { name: '--mo-radius-round', value: '999px', desc: '胶囊按钮、标签', preview: 'radius' },
]" />

**规则：** 同一类组件使用同一个圆角变量；不要自行随机生成圆角。开启 [工整模式](/guide/theming#工整模式) 后，所有手绘圆角会统一为 `--mo-radius-md`。

## 墨线

- 可交互控件使用 **2px 松烟墨** 描边（`--mo-border`），这是墨萌最核心的识别特征。
- 分隔与弱边界使用 **1.5px 虚线界格色**（`--mo-color-line`），像稿纸上的格线。
- 强调状态（聚焦、选中）把描边换成朱砂色，**不加粗**。

## 钤印实影

墨萌的阴影不是模糊的「悬浮」，而是**向右下错开的实心墨影**，像印章在纸上留下的厚度：

<TokenTable :tokens="[
  { name: '--mo-shadow-stamp-sm', value: '2px 2px 0', desc: '表格、小卡片', preview: 'shadow' },
  { name: '--mo-shadow-stamp', value: '3px 4px 0', desc: '卡片、悬停抬起', preview: 'shadow' },
  { name: '--mo-shadow-stamp-lg', value: '5px 6px 0', desc: '对话框、重点卡片', preview: 'shadow' },
  { name: '--mo-shadow-float', value: '实影 + 柔影', desc: '浮层（Tooltip / Select 下拉）', preview: 'shadow' },
]" />

**交互中的阴影：** 悬停时元素上移 `(-1px, -2px)`、阴影加深；按下时元素下移 `(2px, 2px)`、阴影归零 —— 就像把印章按进纸里。

## 纹理

`--mo-texture-paper` 是一张 160px 的 SVG 噪声贴图，透明度 9%，用于卡片、对话框、演示区，模拟宣纸的纤维感。
纹理只放在「纸」上，不放在按钮、输入框等控件上。
