import type { App, Directive, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

/** 为组件挂载 install 方法，支持 app.use(MoButton) */
export function withInstall<T, E extends Record<string, any> = Record<string, never>>(
  main: T,
  extra?: E,
): SFCWithInstall<T> & E {
  const comp = main as any
  comp.install = (app: App) => {
    for (const c of [main, ...Object.values(extra ?? {})]) {
      app.component((c as any).name, c as any)
    }
  }
  if (extra) {
    for (const [key, c] of Object.entries(extra)) comp[key] = c
  }
  return comp as SFCWithInstall<T> & E
}

/** 子组件：不单独注册，由父组件的 install 带出 */
export function withNoopInstall<T>(component: T): SFCWithInstall<T> {
  ;(component as any).install = () => {}
  return component as SFCWithInstall<T>
}

/** 函数式组件（如 Message）：挂到 app.config.globalProperties 上 */
export function withInstallFunction<T>(fn: T, name: string): SFCWithInstall<T> {
  ;(fn as any).install = (app: App) => {
    ;(fn as any)._context = app._context
    app.config.globalProperties[name] = fn
  }
  return fn as SFCWithInstall<T>
}

export function withInstallDirective<T extends Directive>(
  directive: T,
  name: string,
): SFCWithInstall<T> {
  ;(directive as any).install = (app: App) => {
    app.directive(name, directive)
  }
  return directive as SFCWithInstall<T>
}
