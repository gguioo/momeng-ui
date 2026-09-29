#!/usr/bin/env node
/**
 * 把 DOCS_PORTABLE=1 构建出的文档站改写为「相对路径 + 运行时 base」，
 * 使其可以部署在任意（甚至每次都不同的）子路径下，例如对象存储 / CDN 的版本目录。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'docs/.vitepress/dist')
const TOKEN = '/__MOMENG_BASE__/'

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name)
    return d.isDirectory() ? walk(p) : [p]
  })

let html = 0
let js = 0
for (const file of walk(dist)) {
  const rel = path.relative(dist, file).split(path.sep).join('/')
  if (file.endsWith('.html')) {
    const depth = rel.split('/').length - 1
    const prefix = depth === 0 ? './' : '../'.repeat(depth)
    let s = fs.readFileSync(file, 'utf8')
    s = s.replaceAll(TOKEN, prefix)
    const boot = `<script>(function(){var p=location.pathname.replace(/[^/]*$/,'');for(var i=0;i<${depth};i++)p=p.replace(/[^/]+\\/$/,'');window.__MOMENG_BASE__=p})()</script>`
    s = s.replace('<head>', `<head>${boot}`)
    const at = s.indexOf('window.__VP_SITE_DATA__=')
    if (at > -1) {
      const end = s.indexOf('</script>', at) + '</script>'.length
      s = `${s.slice(0, end)}<script>window.__VP_SITE_DATA__.base=window.__MOMENG_BASE__</script>${s.slice(end)}`
    }
    fs.writeFileSync(file, s)
    html++
  } else if (file.endsWith('.js')) {
    let s = fs.readFileSync(file, 'utf8')
    if (!s.includes(TOKEN)) continue
    if (/localSearchIndex/.test(file)) {
      // 搜索索引是单引号包裹的 JSON 字符串：拆开字符串，在运行时拼接 base
      s = s.replaceAll(TOKEN, "'+window.__MOMENG_BASE__+'")
      fs.writeFileSync(file, s)
      js++
      continue
    }
    s = s.replace(
      /(["'`])\/__MOMENG_BASE__\/([^"'`]*)\1/g,
      (_, q, rest) => `(window.__MOMENG_BASE__+${q}${rest}${q})`,
    )
    fs.writeFileSync(file, s)
    js++
  }
}
console.log(`✿ portable docs: rewrote ${html} html, ${js} js`)
