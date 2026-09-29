import type { ExtractPropTypes, PropType } from 'vue'
import { popperEmits, popperProps } from '../popper/popper'

export const tooltipProps = {
  ...popperProps,
  content: String,
  effect: { type: String as PropType<'light' | 'dark'>, default: 'dark' },
}
export const tooltipEmits = popperEmits
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
