import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export type TabName = string | number
export const tabsProps = {
  modelValue: { type: [String, Number] as PropType<TabName> },
  /** 墨线 / 卡片 / 书签 */
  type: { type: String as PropType<'line' | 'card' | 'bookmark'>, default: 'line' },
  closable: Boolean,
  addable: Boolean,
  stretch: Boolean,
  /** 切换前钩子，返回 false 阻止切换 */
  beforeLeave: {
    type: Function as PropType<(next: TabName, prev?: TabName) => boolean | Promise<boolean>>,
  },
}
export const tabsEmits = {
  'update:modelValue': (v: TabName) => v !== undefined,
  'tab-change': (v: TabName) => v !== undefined,
  'tab-remove': (v: TabName) => v !== undefined,
  'tab-add': () => true,
}
export const tabPaneProps = {
  name: { type: [String, Number] as PropType<TabName> },
  label: String,
  icon: String,
  disabled: Boolean,
  closable: { type: Boolean, default: undefined },
  /** 首次激活时才渲染 */
  lazy: Boolean,
}

export interface PaneState {
  uid: number
  name: TabName
  label: string
  icon?: string
  disabled: boolean
  closable?: boolean
  slots: Record<string, any>
}
export interface TabsContext {
  active: Ref<TabName | undefined>
  register: (pane: PaneState) => void
  unregister: (uid: number) => void
}
export const tabsContextKey: InjectionKey<TabsContext> = Symbol('moTabs')
export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
