import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '../../utils'

export const tagProps = {
  type: { type: String as PropType<ComponentType>, default: 'default' },
  /** 浅色 / 实心 / 描边 */
  effect: { type: String as PropType<'light' | 'dark' | 'plain'>, default: 'light' },
  size: { type: String as PropType<ComponentSize> },
  closable: Boolean,
  round: Boolean,
  /** 自定义颜色 */
  color: String,
  icon: String,
  disableTransitions: Boolean,
}
export const tagEmits = {
  close: (e: MouseEvent) => e instanceof MouseEvent,
  click: (e: MouseEvent) => e instanceof MouseEvent,
}
export type TagProps = ExtractPropTypes<typeof tagProps>
