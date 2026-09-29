import type { ExtractPropTypes, PropType } from 'vue'
import type { StatusType } from '../../utils'

export const linkProps = {
  type: { type: String as PropType<StatusType | 'default'>, default: 'default' },
  href: String,
  target: String,
  /** 下划线：hover 出现 / 一直显示 / 从不 */
  underline: { type: String as PropType<'hover' | 'always' | 'never'>, default: 'hover' },
  disabled: Boolean,
  icon: String,
}
export const linkEmits = { click: (e: MouseEvent) => e instanceof MouseEvent }
export type LinkProps = ExtractPropTypes<typeof linkProps>
