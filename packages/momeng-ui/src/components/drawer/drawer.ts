import type { ExtractPropTypes, PropType } from 'vue'
import { overlayBaseProps, overlayEmits } from '../dialog/dialog'

export const drawerProps = {
  ...overlayBaseProps,
  /** 从哪边滑出：rtl 右 / ltr 左 / ttb 上 / btt 下 */
  direction: { type: String as PropType<'rtl' | 'ltr' | 'ttb' | 'btt'>, default: 'rtl' },
  size: { type: [String, Number], default: '30%' },
  withHeader: { type: Boolean, default: true },
}
export const drawerEmits = overlayEmits
export type DrawerProps = ExtractPropTypes<typeof drawerProps>
