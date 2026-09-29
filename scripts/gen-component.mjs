#!/usr/bin/env node
/**
 * 组件脚手架：pnpm gen color-picker
 * 生成 props 定义 / SFC / 入口 / 测试 / 样式 / 文档示例，并注册到导出与样式入口。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const name = process.argv[2]
if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('用法：pnpm gen <kebab-name>，例如 pnpm gen color-picker')
  process.exit(1)
}
const pascal = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())
const camel = pascal[0].toLowerCase() + pascal.slice(1)
const src = path.join(root, 'packages/momeng-ui/src')
const dir = path.join(src, 'components', name)
if (fs.existsSync(dir)) {
  console.error(`组件 ${name} 已存在`)
  process.exit(1)
}

const files = {
  [`${name}.ts`]: `import type { ExtractPropTypes } from 'vue'

export const ${camel}Props = {
  disabled: Boolean,
}
export const ${camel}Emits = {}
export type ${pascal}Props = ExtractPropTypes<typeof ${camel}Props>
`,
  [`${pascal}.vue`]: `<script setup lang="ts">
import { ${camel}Emits, ${camel}Props } from './${name}'
import { useNamespace } from '../../composables'

defineOptions({ name: 'Mo${pascal}' })
defineProps(${camel}Props)
defineEmits(${camel}Emits)
const ns = useNamespace('${name}')
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]"><slot /></div>
</template>
`,
  'index.ts': `import { withInstall } from '../../utils'
import ${pascal} from './${pascal}.vue'

export const Mo${pascal} = withInstall(${pascal})
export default Mo${pascal}
export * from './${name}'
`,
  [`__tests__/${name}.test.ts`]: `import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ${pascal} from '../${pascal}.vue'

describe('${pascal}', () => {
  it('渲染', () => {
    const w = mount(${pascal}, { slots: { default: '墨萌' } })
    expect(w.classes()).toContain('mo-${name}')
    expect(w.text()).toBe('墨萌')
  })
})
`,
}

fs.mkdirSync(path.join(dir, '__tests__'), { recursive: true })
for (const [file, content] of Object.entries(files)) fs.writeFileSync(path.join(dir, file), content)

fs.writeFileSync(path.join(src, 'theme/components', `${name}.scss`), `.mo-${name} {\n}\n`)
fs.appendFileSync(path.join(src, 'theme/index.scss'), `@use 'components/${name}';\n`)
fs.appendFileSync(path.join(src, 'components/index.ts'), `export * from './${name}'\n`)

const exampleDir = path.join(root, 'docs/examples', name)
fs.mkdirSync(exampleDir, { recursive: true })
fs.writeFileSync(
  path.join(exampleDir, 'basic.vue'),
  `<template>\n  <Mo${pascal}>Hello</Mo${pascal}>\n</template>\n`,
)
fs.writeFileSync(
  path.join(root, 'docs/components', `${name}.md`),
  `# ${pascal}\n\n## 基础用法\n\n<Demo src="${name}/basic">\n\n<<< @/examples/${name}/basic.vue\n\n</Demo>\n`,
)

console.log(`✿ 已生成 Mo${pascal}
  - packages/momeng-ui/src/components/${name}/
  - packages/momeng-ui/src/theme/components/${name}.scss
  - docs/components/${name}.md
别忘了：在 src/index.ts 的 plugins 中注册、在 docs/.vitepress/sidebar.ts 中加入导航、在 global.d.ts 中加入类型。`)
