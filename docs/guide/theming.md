# 主题定制

墨萌的所有视觉决策都沉淀为 **CSS 变量（Design Tokens）**，组件只消费变量、不写死任何颜色。
改一个变量，整套组件一起换装。

## 修改主色

只需要覆盖基础色，`light-3 / light-5 / light-7 / light-8 / light-9 / dark-2` 这些梯度会通过 `color-mix()` **自动推导**：

```css
:root {
  --mo-color-primary: #5b8c5a; /* 从朱砂换成竹青 */
}
```

去 [演练场](/playground) 实时试试。

## 局部主题

用 `MoConfigProvider` 给一片区域换主题，梯度色会在该作用域内重新计算：

```vue
<MoConfigProvider :tokens="{ 'color-primary': '#3f6a8a', 'radius-wobble': '4px' }" size="small">
  <MoButton type="primary">花青主题</MoButton>
</MoConfigProvider>
```

## 工整模式

「萌」要有分寸。在后台、数据密集或严肃场景，可以关闭手绘的不规则圆角：

```vue
<MoConfigProvider tidy> ... </MoConfigProvider>
<!-- 或者直接给容器加 class="mo-tidy" -->
```

## 常用变量

| 变量 | 默认值 | 说明 |
|---|---|---|
| `--mo-color-primary` | `#cf4a37` 朱砂 | 主色 |
| `--mo-color-success / warning / danger / info` | 竹青 / 藤黄 / 胭脂 / 花青 | 语义色 |
| `--mo-color-pink` | `#f2a7b5` 桃夭 | 萌点装饰色 |
| `--mo-color-paper / paper-light / paper-deep` | 宣纸 / 素绢 / 缃色 | 背景层级 |
| `--mo-color-ink / ink-2 / ink-3 / ink-4` | 松烟墨 → 飞白 | 文字与描边层级 |
| `--mo-font-family / -display / -brush` | 文楷 / 快乐体 / 行书 | 字体 |
| `--mo-radius-hand / -wobble / -wobble-sm` | 手绘不规则圆角 | 形状 |
| `--mo-border-width` | `2px` | 墨线粗细 |
| `--mo-shadow-stamp / -float` | 错位实影 | 阴影 |
| `--mo-ease-bounce / -ink` | Q 弹 / 舒缓 | 缓动曲线 |

完整的变量清单与设计含义见 [设计规范](/design/color)。

## 组件级变量

部分组件暴露了组件级变量，用于精细调整，比如：

```css
.my-fat-button {
  --mo-button-height: 52px;
}
.my-slider {
  --mo-slider-thumb: 28px;
}
```
