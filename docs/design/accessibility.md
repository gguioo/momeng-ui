# 无障碍

可爱的界面，也应该是**每个人都能用**的界面。

## 键盘

| 组件 | 键盘支持 |
|---|---|
| Button / Link | Tab 聚焦，Enter / Space 触发 |
| Checkbox / Radio / Switch | 原生 input / button，Space 切换 |
| Select | ↑ ↓ 移动，Enter 选择，Esc 关闭，多选 Backspace 删除最后一项 |
| Tabs | ← → 切换（自动跳过禁用项），Home / End |
| Slider | ← → ↑ ↓ 步进，PageUp / PageDown 大步，Home / End |
| Rate / InputNumber | ← → ↑ ↓ |
| Dropdown | ↑ ↓ 在菜单项间移动，Enter 选择，Esc 关闭 |
| Dialog / Drawer | Esc 关闭，Tab 焦点被限制在弹层内，关闭后焦点回到触发元素 |
| Tooltip / Popover | 聚焦触发元素即显示，Esc 关闭 |

## 焦点

所有可聚焦元素都有**朱砂色虚线聚焦环**（`:focus-visible`），只在键盘导航时出现，不打扰鼠标用户。

## 语义与 ARIA

- Switch：`role="switch"` + `aria-checked`
- Select：`role="combobox"` + `aria-expanded`，选项 `role="option"` + `aria-selected`
- Tabs：`role="tablist / tab / tabpanel"` + `aria-selected` + `aria-controls`
- Collapse：`aria-expanded` + `aria-controls` + `role="region"`
- Dialog：`role="dialog"` + `aria-modal` + `aria-labelledby`
- Pagination：`aria-current="page"`；Steps：`aria-current="step"`
- 表单：Label 与控件通过 `for / id` 关联，错误信息 `role="alert"`，控件 `aria-invalid`
- 装饰性图标 `aria-hidden`；有意义的图标传入 `label`；印章与墨团提供 `aria-label`

## 颜色

- 正文对比度 ≥ 4.5 : 1（见 [色彩](/design/color#对比度)）。
- 状态不只靠颜色：Alert、Message 同时有图标；表单错误同时有文字；Tag 可配图标。

## 动效

检测到系统开启「减少动态效果」时，墨萌自动把动画与过渡压缩到接近 0。
