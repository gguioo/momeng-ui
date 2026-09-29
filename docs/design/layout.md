# 间距与布局

## 4px 网格

所有间距都是 4 的倍数。常用的是 8 / 12 / 16 / 24。

<TokenTable :tokens="[
  { name: '--mo-space-1', value: '4px', desc: '图标与文字', preview: 'space' },
  { name: '--mo-space-2', value: '8px', desc: '紧凑元素之间', preview: 'space' },
  { name: '--mo-space-3', value: '12px', desc: '按钮之间（默认 Space）', preview: 'space' },
  { name: '--mo-space-4', value: '16px', desc: '卡片内边距（小）', preview: 'space' },
  { name: '--mo-space-5', value: '20px', desc: '卡片内边距', preview: 'space' },
  { name: '--mo-space-6', value: '24px', desc: '表单项之间、区块之间', preview: 'space' },
  { name: '--mo-space-8', value: '32px', desc: '大区块', preview: 'space' },
  { name: '--mo-space-10', value: '40px', desc: '页面级留白', preview: 'space' },
]" />

## 控件尺寸

| 尺寸 | 高度 | 字号 | 使用场景 |
|---|---|---|---|
| small | 28px | 13px | 表格内操作、工具栏、紧凑表单 |
| default | 36px | 14px | 绝大多数场景 |
| large | 44px | 16px | 落地页、移动端、重要的单个行动点 |

**同一行里的控件，尺寸必须一致。** 可以用 `MoConfigProvider size` 或 `MoForm size` 统一设置。

## 栅格

24 栏栅格，断点：

| 断点 | 宽度 |
|---|---|
| xs | < 768px |
| sm | ≥ 768px |
| md | ≥ 992px |
| lg | ≥ 1200px |
| xl | ≥ 1920px |

## 留白

- 卡片、对话框的内边距不小于 20px。
- 页面内容的最大宽度建议 1200px，阅读型内容（文章、诗词）建议 680px 以内。
- 与其加一条分割线，不如先加 8px 留白。
