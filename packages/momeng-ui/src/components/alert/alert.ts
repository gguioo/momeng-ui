import type { ExtractPropTypes, PropType } from 'vue'
import type { StatusType } from '../../utils'

export const alertProps = {
  title: String,
  description: String,
  type: { type: String as PropType<StatusType>, default: 'info' },
  effect: { type: String as PropType<'light' | 'dark'>, default: 'light' },
  closable: { type: Boolean, default: true },
  closeText: String,
  showIcon: { type: Boolean, default: true },
  center: Boolean,
}
export const alertEmits = { close: (e: MouseEvent) => e instanceof MouseEvent }
export type AlertProps = ExtractPropTypes<typeof alertProps>

export const typeIconMap: Record<string, string> = {
  primary: 'sparkle',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  info: 'info',
}
