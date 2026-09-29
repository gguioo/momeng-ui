# 快速上手

## 安装

::: code-group

```bash [pnpm]
pnpm add momeng-ui
```

```bash [npm]
npm i momeng-ui
```

```bash [yarn]
yarn add momeng-ui
```

:::

## 完整引入

```ts
// main.ts
import { createApp } from 'vue'
import MoMeng from 'momeng-ui'
import 'momeng-ui/style.css'
import 'momeng-ui/fonts.css' // 可选：霞鹜文楷 + 站酷快乐体 + 马善政行书（CDN 分片加载）
import App from './App.vue'

createApp(App)
  .use(MoMeng, { size: 'default', zIndex: 3000 })
  .mount('#app')
```

## 按需引入

每个组件都是独立的具名导出，配合打包工具的 Tree Shaking 只会打包用到的部分。

```vue
<script setup lang="ts">
import { MoButton, MoMessage } from 'momeng-ui'
import 'momeng-ui/style.css'
</script>

<template>
  <MoButton type="primary" @click="MoMessage.success('你好，墨萌')">落笔</MoButton>
</template>
```

## TypeScript 全局组件提示

完整引入时，在 `tsconfig.json` 中加入全局类型声明，模板里就能获得 Volar 的组件与属性提示：

```json
{
  "compilerOptions": {
    "types": ["momeng-ui/global"]
  }
}
```

## 字体

墨萌的设计以三款开源中文字体为基础，**不强制打包**，未加载时会回退到系统楷体：

| 角色 | 字体 | 用途 |
|---|---|---|
| 正文 | 霞鹜文楷 LXGW WenKai | 正文、控件文字 |
| 趣味 | 站酷快乐体 ZCOOL KuaiLe | 标题、数字 |
| 点睛 | 马善政行书 Ma Shan Zheng | 印章、汉字序号、大标题 |

引入 `momeng-ui/fonts.css` 即可使用 jsDelivr 的分片字体（按 `unicode-range` 按需下载）。
对体积敏感的项目，可以只在标题处使用自定义字体，或覆盖 `--mo-font-family*` 变量。

## 第一个页面

<Demo src="guide/hello">

<<< @/examples/guide/hello.vue

</Demo>
