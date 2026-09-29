import type { ExtractPropTypes, PropType } from 'vue'
import type { StatusType } from '../../utils'

export const badgeProps = {
  value: { type: [String, Number], default: '' },
  max: { type: Number, default: 99 },
  isDot: Boolean,
  hidden: Boolean,
  type: { type: String as PropType<StatusType>, default: 'danger' },
  /** 为 0 时是否显示 */
  showZero: { type: Boolean, default: false },
  offset: { type: Array as unknown as PropType<[number, number]> },
  color: String,
}
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
