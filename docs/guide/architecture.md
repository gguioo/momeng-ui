# 工程化与架构

这一页写给想了解「墨萌是怎么做出来的」的同学 —— 也是我在做这个项目时的技术思考。

## 仓库结构

```text
momeng-ui/
├─ packages/
│  └─ momeng-ui/            # 组件库本体（发布到 npm）
│     ├─ src/
│     │  ├─ components/     # 45+ 组件，每个目录：xxx.ts(props/emits/类型) + Xxx.vue + index.ts + __tests__
│     │  ├─ composables/    # useNamespace / usePosition / useZIndex / useLockScroll / useClickOutside ...
│     │  ├─ theme/          # SCSS：tokens（设计变量）/ mixins / base / components/*.scss
│     │  ├─ utils/          # withInstall、数值精度、seededRandom 等
│     │  └─ index.ts        # 全量入口 + 具名导出
│     ├─ global.d.ts        # Volar 全局组件类型
│     └─ vite.config.ts     # 库模式构建：ESM + UMD + d.ts + 单 CSS
├─ docs/                    # VitePress 文档站（设计规范 + 组件示例 + 演练场）
│  └─ examples/             # 每个示例都是独立的 .vue 文件，文档与源码展示同源
├─ scripts/gen-component.mjs # 组件脚手架：pnpm gen <name>
└─ .github/workflows/       # CI：lint → typecheck → test → build；文档自动部署 Pages
```

## 组件的「四件套」

每个组件都遵循同样的组织方式，降低维护心智负担：

```text
button/
├─ button.ts        # props / emits 定义与导出类型（ButtonProps）、InjectionKey
├─ Button.vue       # <script setup> 实现，defineProps(buttonProps)
├─ index.ts         # withInstall 包装，支持 app.use(MoButton) 与具名导出
└─ __tests__/       # 单元测试
```

Props 以运行时对象定义（而不是纯类型），这样既能导出给用户做二次封装，也能在 `Tooltip / Popover` 之间通过展开复用 `popperProps`。

## 样式架构

- **BEM + 命名空间**：`useNamespace('button')` 生成 `mo-button`、`mo-button__icon`、`mo-button--primary`、`is-loading`。
- **Design Tokens**：`tokens.scss` 是唯一的视觉真相来源。语义色梯度通过 SCSS mixin 生成 `color-mix()` 声明，
  并在 `:root`、`[data-mo-theme]`、`.mo-config-provider` 三个作用域中重新声明「派生变量」，
  以解决 **CSS 自定义属性在声明处求值、子树覆盖基础色时梯度不跟随** 的问题。
- **组件级变量**：`--mo-button-bg`、`--mo-input-border` 等，状态切换只改变量，不重复写规则。

## 几个值得一提的实现

### 1. 轻量浮层定位 `usePosition`

没有引入 Popper.js / Floating UI，而是基于 `position: fixed + getBoundingClientRect` 实现了 12 方位定位、
**空间不足自动翻转**、视口边缘修正、滚动（捕获阶段）与 resize 跟随。Tooltip / Popover / Dropdown / Select / SubMenu 共用同一个 `MoPopper`。

### 2. 零依赖表单校验

`validator.ts` 支持 `required / type / min / max / len / pattern / validator(async)`，
长度按 **Unicode 字符** 计数（`Array.from`），中文与 emoji 都不会算错；FormItem 通过 provide/inject 向输入控件暴露 `validate(trigger)`。

### 3. 印章生成 `MoSeal`

纯 SVG：白文印用 `<mask>` 镂空文字，朱文印直接绘制；`feTurbulence + feDisplacementMap` 做边缘残破，
第二层高频噪声经 `feColorMatrix` 阈值化后与图形求交，模拟**印泥不匀**。
噪声种子由印文经 FNV 哈希 + mulberry32 生成（`seededRandom`），**同一印文每次渲染一致**，SSR 也不会闪烁。

### 4. 函数式组件

`MoMessage / MoNotification / MoMessageBox / MoLoading.service` 通过 `createVNode + render` 挂载，
继承 `app._context` 以便在消息中使用全局组件与 provide；Message 支持 `grouping` 合并相同内容。

### 5. 弹层基础设施

Dialog 与 Drawer 共享 `useOverlay`：`useZIndex` 保证后开的在上层、`useLockScroll` 引用计数支持嵌套、
简易**焦点陷阱**与关闭后**焦点归还**、`beforeClose(done)` 拦截。

## 质量保障

| 手段 | 工具 |
|---|---|
| 类型检查 | `vue-tsc --noEmit`（strict） |
| 单元测试 | Vitest + @vue/test-utils + jsdom |
| 代码规范 | ESLint（typescript-eslint + eslint-plugin-vue）+ Prettier |
| 构建 | Vite 库模式 + vite-plugin-dts |
| 持续集成 | GitHub Actions：lint → typecheck → test → build，文档自动部署 GitHub Pages |

## 新增一个组件

```bash
pnpm gen color-picker
```

脚手架会生成四件套、样式文件并注册导出，接着写实现、样式、测试和文档示例即可。
