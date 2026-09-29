import type { ExtractPropTypes, PropType } from 'vue'
import type { StatusType } from '../../utils'

export const timelineProps = {
  /** 倒序 */
  reverse: Boolean,
  mode: { type: String as PropType<'left' | 'alternate'>, default: 'left' },
}
export const timelineItemProps = {
  timestamp: String,
  hideTimestamp: Boolean,
  placement: { type: String as PropType<'top' | 'bottom'>, default: 'bottom' },
  type: { type: String as PropType<StatusType> },
  color: String,
  /** 节点图标 */
  icon: String,
  hollow: Boolean,
  size: { type: String as PropType<'normal' | 'large'>, default: 'normal' },
}
export type TimelineProps = ExtractPropTypes<typeof timelineProps>
export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
