import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export type MenuIndex = string
export const menuProps = {
  /** 当前激活菜单，支持 v-model */
  modelValue: String,
  mode: { type: String as PropType<'vertical' | 'horizontal'>, default: 'vertical' },
  /** 默认展开的子菜单 */
  defaultOpeneds: { type: Array as PropType<MenuIndex[]>, default: () => [] },
  /** 子菜单手风琴 */
  uniqueOpened: Boolean,
  /** 折叠为仅图标（vertical） */
  collapse: Boolean,
}
export const menuEmits = {
  'update:modelValue': (v: MenuIndex) => typeof v === 'string',
  select: (v: MenuIndex) => typeof v === 'string',
  open: (v: MenuIndex) => typeof v === 'string',
  close: (v: MenuIndex) => typeof v === 'string',
}
export const menuItemProps = {
  index: { type: String, required: true as const },
  icon: String,
  disabled: Boolean,
}
export const subMenuProps = {
  index: { type: String, required: true as const },
  title: String,
  icon: String,
  disabled: Boolean,
}
export const menuItemGroupProps = { title: String } as const

export interface MenuContext {
  active: Ref<MenuIndex | undefined>
  openeds: Ref<MenuIndex[]>
  mode: Ref<'vertical' | 'horizontal'>
  collapse: Ref<boolean>
  select: (index: MenuIndex) => void
  toggleSub: (index: MenuIndex) => void
}
export const menuContextKey: InjectionKey<MenuContext> = Symbol('moMenu')
export const subMenuLevelKey: InjectionKey<number> = Symbol('moSubMenuLevel')
export const subMenuContextKey: InjectionKey<{ close: () => void }> = Symbol('moSubMenu')
export type MenuProps = ExtractPropTypes<typeof menuProps>
