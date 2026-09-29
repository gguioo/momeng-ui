# 色彩 · 传统色

墨萌的色板取自**中国传统色**，并按界面需要做了明度与饱和度的校准：
既保留名字里的诗意，又保证在屏幕上清晰、稳定、可访问。

点击色块可复制变量。

<ColorPalette />

## 梯度规则

每个语义色都自动派生 6 个梯度，通过 `color-mix()` 与底色（`--mo-mix-base`）混合。
暗色主题下底色变为墨色，梯度会自然地「沉」下去，无需另写一套。

| 梯度 | 混合比例 | 典型用途 |
|---|---|---|
| `-dark-2` | 80% 基础色 + 20% 墨 | 浅底上的文字（Tag、Plain 按钮） |
| 基础色 | 100% | 实心按钮、主要图标、印章 |
| `-light-3` | 70% | 悬停态 |
| `-light-5` | 50% | 描边、聚焦环 |
| `-light-7` | 30% | 聚焦投影、弱强调 |
| `-light-8` | 20% | 选中背景 |
| `-light-9` | 10% | 浅底（Alert、Plain 按钮背景） |

## 使用比例

一个健康的墨萌界面，颜色面积大致是：

<div style="display:flex;height:40px;border:2px solid var(--mo-color-ink);border-radius:10px;overflow:hidden;margin:16px 0">
  <div style="flex:70;background:var(--mo-color-paper)" title="宣纸 70%"></div>
  <div style="flex:20;background:var(--mo-color-ink)" title="墨 20%"></div>
  <div style="flex:6;background:var(--mo-color-info)" title="辅助色 6%"></div>
  <div style="flex:3;background:var(--mo-color-primary)" title="朱砂 3%"></div>
  <div style="flex:1;background:var(--mo-color-pink)" title="桃夭 1%"></div>
</div>

**宣纸 70% · 墨 20% · 辅助色 6% · 朱砂 3% · 桃夭 1%**

- **朱砂**只给最重要的行动点与当前状态。
- **桃夭**只用于腮红、爱心、胶带这类「萌点」，不用于承载信息的文字。
- 竹青、藤黄、胭脂、花青严格按语义使用：成功、警示、危险、信息。

## 对比度

| 组合 | 对比度 | 结论 |
|---|---|---|
| 松烟墨 `#2d2926` / 宣纸 `#faf5e9` | 13.9 : 1 | AAA |
| 淡墨 `#564f49` / 宣纸 | 7.4 : 1 | AAA |
| 枯墨 `#8a8078` / 宣纸 | 3.6 : 1 | 仅用于辅助说明、大字 |
| 素绢白 / 朱砂 `#cf4a37` | 4.3 : 1 | 按钮文字（≥14px 加粗）AA 大字 |
| 松烟墨 / 藤黄 `#e3a23b` | 7.6 : 1 | 藤黄实心按钮使用墨色文字 |

::: warning 注意
藤黄是浅色，它的实心按钮、标签、徽章一律使用**墨色文字**，组件已内置处理。
:::
