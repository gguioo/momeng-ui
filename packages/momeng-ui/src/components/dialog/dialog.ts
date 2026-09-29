import type { ExtractPropTypes, PropType } from 'vue'

export const overlayBaseProps = {
  modelValue: Boolean,
  title: String,
  /** 点击遮罩关闭 */
  closeOnClickModal: { type: Boolean, default: true },
  closeOnPressEscape: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  modal: { type: Boolean, default: true },
  lockScroll: { type: Boolean, default: true },
  appendToBody: { type: Boolean, default: true },
  destroyOnClose: Boolean,
  /** 关闭前钩子：调用 done() 才真正关闭 */
  beforeClose: { type: Function as PropType<(done: () => void) => void> },
  zIndex: Number,
}

export const dialogProps = {
  ...overlayBaseProps,
  width: { type: [String, Number], default: '480px' },
  top: { type: String, default: '14vh' },
  center: Boolean,
  alignCenter: Boolean,
  fullscreen: Boolean,
  /** 信笺竖格纹 */
  lined: Boolean,
  /** 标题旁钤印 */
  seal: String,
}

export const overlayEmits = {
  'update:modelValue': (v: boolean) => typeof v === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
