import { postcssIsolateStyles } from 'vitepress'

// 让 .vp-raw 内的组件演示不受 VitePress 文档排版样式（ul/table/a 等）影响
export default {
  plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc\.css/, /base\.css/] })],
}
