# 字体与排版

## 三款字体，各司其职

<div class="demo-block" style="padding: 24px 28px">
  <p><MoText size="2xl">霞鹜文楷 · 正文</MoText><br /><MoText type="secondary">温润的楷体，有书卷气，也足够清晰。用于正文、表单、按钮等绝大多数文字。</MoText></p>
  <MoDivider variant="dashed" />
  <p><MoText size="2xl" font="display">站酷快乐体 · 趣味 0123</MoText><br /><MoText type="secondary">圆滚滚的手写感，用于标题、卡片抬头、徽章与数字。</MoText></p>
  <MoDivider variant="dashed" />
  <p><MoText size="2xl" font="brush">马善政行书 · 点睛</MoText><br /><MoText type="secondary">毛笔行书，只用于印章、汉字序号与大标题，一屏最多一处。</MoText></p>
</div>

| 变量 | 首选字体 | 回退 |
|---|---|---|
| `--mo-font-family` | LXGW WenKai | Kaiti SC → STKaiti → KaiTi → Noto Serif SC |
| `--mo-font-family-display` | ZCOOL KuaiLe | LXGW WenKai → 楷体 |
| `--mo-font-family-brush` | Ma Shan Zheng | Zhi Mang Xing → STXingkai → 楷体 |
| `--mo-font-family-mono` | JetBrains Mono | Fira Code → Menlo |

## 字号阶梯

以 14px 为基准，比例约 1.2（小三度）：

<TokenTable :tokens="[
  { name: '--mo-font-size-xs', value: '12px', desc: '辅助说明、徽章、时间戳' },
  { name: '--mo-font-size-sm', value: '13px', desc: '次要文字、提示' },
  { name: '--mo-font-size-base', value: '14px', desc: '正文、控件（默认）' },
  { name: '--mo-font-size-md', value: '16px', desc: '强调正文、大号控件' },
  { name: '--mo-font-size-lg', value: '18px', desc: '卡片标题' },
  { name: '--mo-font-size-xl', value: '22px', desc: '对话框标题' },
  { name: '--mo-font-size-2xl', value: '28px', desc: '页面标题' },
  { name: '--mo-font-size-3xl', value: '36px', desc: '展示标题' },
]" />

正文行高 `--mo-line-height: 1.7`；楷体的字面偏小，比常规黑体界面略高的行高更易读。

## 中文排版细节

墨萌把一些**中文特有的排版习惯**做成了组件能力：

- **着重号**：`<MoText emphasis>` 使用 CSS `text-emphasis`，在字下方加点，替代西文的斜体强调。
- **竖排**：`<MoText vertical>` 使用 `writing-mode: vertical-rl`，适合诗词、落款、侧边标题。
- **汉字数字**：`MoSteps` 与 `MoTable` 的序号列默认使用「一、二、三」。
- **字间距**：按钮与标题使用 `0.04em ~ 0.12em` 的字距，楷体更舒展。
- **标点**：文案统一使用全角中文标点与直角引号「」。

<DoDont do-text="用着重号或荧光笔强调中文。" dont-text="对中文使用斜体，字形会被机械地拉歪。">
  <template #do><span style="font-size:16px">人生<MoText emphasis>若只如初见</MoText>，何事<MoText mark>秋风悲画扇</MoText></span></template>
  <template #dont><span style="font-size:16px">人生<i>若只如初见</i>，何事<i>秋风悲画扇</i></span></template>
</DoDont>
