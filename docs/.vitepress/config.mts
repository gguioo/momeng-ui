import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { sidebar } from './sidebar'

// DOCS_PORTABLE=1：产出可部署到任意子路径的「便携版」（配合 scripts/portable-docs.mjs）
const portable = !!process.env.DOCS_PORTABLE
const base = portable ? '/__MOMENG_BASE__/' : process.env.DOCS_BASE || '/'
const fonts = [
  'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-regular.css',
  'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-bold.css',
  'https://cdn.jsdelivr.net/npm/@fontsource/zcool-kuaile/index.css',
  'https://cdn.jsdelivr.net/npm/@fontsource/ma-shan-zheng/index.css',
]

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '墨萌 MoMeng UI',
  description: '宣纸、松烟墨与朱砂印里长出来的可爱 Vue 3 组件库 —— 手绘 · 古典 · 卡哇伊',
  cleanUrls: !portable,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}logo.svg` }],
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }],
    ...fonts.map(
      (href) => ['link', { rel: 'stylesheet', href }] as [string, Record<string, string>],
    ),
    ['meta', { name: 'theme-color', content: '#cf4a37' }],
  ],
  themeConfig: {
    logo: { light: '/logo.svg', dark: '/logo-dark.svg' },
    siteTitle: '墨萌 UI',
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '设计规范', link: '/design/', activeMatch: '/design/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
      { text: '演练场', link: '/playground' },
    ],
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/gguioo/momeng-ui' }],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '墨夜',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    lastUpdated: { text: '最后更新' },
    search: {
      provider: 'local',
      options: { translations: { button: { buttonText: '搜索组件' } } },
    },
    footer: {
      message: 'MIT Licensed · 以笔墨之心，写可爱的界面',
      copyright: '© 2026 墨萌 MoMeng UI',
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^momeng-ui$/,
          replacement: fileURLToPath(
            new URL('../../packages/momeng-ui/src/index.ts', import.meta.url),
          ),
        },
        {
          find: '@momeng',
          replacement: fileURLToPath(new URL('../../packages/momeng-ui/src', import.meta.url)),
        },
        { find: '@examples', replacement: fileURLToPath(new URL('../examples', import.meta.url)) },
      ],
    },
    ssr: { noExternal: ['momeng-ui'] },
    css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
    experimental: portable
      ? {
          renderBuiltUrl(filename: string, { hostType }: { hostType: string }) {
            return hostType === 'js'
              ? { runtime: `window.__MOMENG_BASE__+${JSON.stringify(filename)}` }
              : { relative: true }
          },
        }
      : undefined,
  },
})
