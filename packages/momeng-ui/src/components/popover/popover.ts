import type { ExtractPropTypes, PropType } from 'vue'
import type { Placement } from '../../utils'
import { popperEmits, popperProps, type PopperTrigger } from '../popper/popper'

export const popoverProps = {
  ...popperProps,
  title: String,
  content: String,
  width: { type: [String, Number], default: 220 },
  trigger: { type: String as PropType<PopperTrigger>, default: 'click' },
  placement: { type: String as PropType<Placement>, default: 'bottom' },
  role: { type: String, default: 'dialog' },
}
export const popoverEmits = popperEmits
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
