# 贡献指南

感谢你愿意为墨萌落一笔 ✿

## 开发流程

1. `pnpm install`
2. `pnpm dev` 打开文档站，边写边看
3. 新组件：`pnpm gen <kebab-name>`，按提示补全注册
4. 提交前确保 `pnpm lint && pnpm typecheck && pnpm test` 全部通过

## 组件约定

- 目录四件套：`xxx.ts`（props / emits / 类型 / InjectionKey）、`Xxx.vue`、`index.ts`、`__tests__/`
- 类名一律通过 `useNamespace` 生成，遵循 BEM：`mo-block__element--modifier` + `is-state`
- 样式只消费设计变量，禁止写死颜色；新增变量先写进 `theme/tokens.scss` 并补充设计文档
- 交互组件必须：可键盘操作、有正确的 ARIA 语义、有 `:focus-visible` 样式
- 遵守 [设计规范](./docs/design/index.md)，尤其是「朱砂要省着用」与「萌而有度」

## 提交信息

采用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

```text
feat(select): 支持远程搜索
fix(tabs): 修复字体加载后墨线位置偏移
docs(design): 补充动效规范
```
