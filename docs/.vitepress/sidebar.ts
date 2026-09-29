export const componentGroups = [
  {
    text: '基础 Basic',
    items: [
      ['button', 'Button 按钮'],
      ['icon', 'Icon 图标'],
      ['text', 'Text 文字'],
      ['link', 'Link 链接'],
      ['divider', 'Divider 分割线'],
      ['space', 'Space 间距'],
      ['grid', 'Grid 栅格'],
      ['seal', 'Seal 印章 ✦'],
      ['mascot', 'Mascot 墨团 ✦'],
      ['config-provider', 'ConfigProvider 全局配置'],
    ],
  },
  {
    text: '表单 Form',
    items: [
      ['input', 'Input 输入框'],
      ['input-number', 'InputNumber 数字输入'],
      ['checkbox', 'Checkbox 多选框'],
      ['radio', 'Radio 单选框'],
      ['switch', 'Switch 开关'],
      ['slider', 'Slider 滑块'],
      ['rate', 'Rate 评分'],
      ['select', 'Select 选择器'],
      ['form', 'Form 表单'],
    ],
  },
  {
    text: '数据展示 Data',
    items: [
      ['card', 'Card 卡片'],
      ['tag', 'Tag 标签'],
      ['badge', 'Badge 徽章'],
      ['avatar', 'Avatar 头像'],
      ['tooltip', 'Tooltip 文字提示'],
      ['popover', 'Popover 气泡卡片'],
      ['collapse', 'Collapse 折叠面板'],
      ['tabs', 'Tabs 标签页'],
      ['timeline', 'Timeline 时间线'],
      ['table', 'Table 表格'],
      ['pagination', 'Pagination 分页'],
      ['progress', 'Progress 进度条'],
      ['empty', 'Empty 空状态'],
      ['skeleton', 'Skeleton 骨架屏'],
      ['scroll', 'Scroll 卷轴 ✦'],
    ],
  },
  {
    text: '反馈 Feedback',
    items: [
      ['alert', 'Alert 提示'],
      ['message', 'Message 消息'],
      ['notification', 'Notification 通知'],
      ['message-box', 'MessageBox 确认框'],
      ['dialog', 'Dialog 对话框'],
      ['drawer', 'Drawer 抽屉'],
      ['loading', 'Loading 加载'],
    ],
  },
  {
    text: '导航 Navigation',
    items: [
      ['breadcrumb', 'Breadcrumb 面包屑'],
      ['steps', 'Steps 步骤条'],
      ['dropdown', 'Dropdown 下拉菜单'],
      ['menu', 'Menu 菜单'],
      ['backtop', 'Backtop 回到顶部'],
    ],
  },
]

export const sidebar = {
  '/guide/': [
    {
      text: '开始',
      items: [
        { text: '介绍', link: '/guide/' },
        { text: '快速上手', link: '/guide/quickstart' },
        { text: '主题定制', link: '/guide/theming' },
        { text: '暗色模式 · 墨夜', link: '/guide/dark-mode' },
        { text: '工程化与架构', link: '/guide/architecture' },
        { text: '更新日志', link: '/guide/changelog' },
      ],
    },
  ],
  '/design/': [
    {
      text: '设计规范',
      items: [
        { text: '设计理念', link: '/design/' },
        { text: '设计原则', link: '/design/principles' },
        { text: '色彩 · 传统色', link: '/design/color' },
        { text: '字体与排版', link: '/design/typography' },
        { text: '形状 · 描边 · 阴影', link: '/design/shape' },
        { text: '间距与布局', link: '/design/layout' },
        { text: '动效', link: '/design/motion' },
        { text: '图标与插画', link: '/design/iconography' },
        { text: '文案语气', link: '/design/voice' },
        { text: '无障碍', link: '/design/accessibility' },
        { text: '使用原则 · 宜与忌', link: '/design/usage' },
      ],
    },
  ],
  '/components/': [
    { text: '组件总览', items: [{ text: '全部组件', link: '/components/' }] },
    ...componentGroups.map((g) => ({
      text: g.text,
      items: g.items.map(([slug, text]) => ({ text, link: `/components/${slug}` })),
    })),
  ],
}
