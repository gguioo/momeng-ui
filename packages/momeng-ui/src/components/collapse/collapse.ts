import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export type CollapseName = string | number
export const collapseProps = {
  modelValue: {
    type: [Array, String, Number] as PropType<CollapseName[] | CollapseName>,
    default: () => [],
  },
  /** 手风琴模式：每次只展开一项 */
  accordion: Boolean,
}
export const collapseEmits = {
  'update:modelValue': (v: CollapseName[] | CollapseName) => v !== undefined,
  change: (v: CollapseName[] | CollapseName) => v !== undefined,
}
export const collapseItemProps = {
  name: { type: [String, Number] as PropType<CollapseName> },
  title: String,
  disabled: Boolean,
  icon: String,
}
export interface CollapseContext {
  activeNames: Ref<CollapseName[]>
  toggle: (name: CollapseName) => void
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('moCollapse')
export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
