import type { ExtractPropTypes, PropType } from 'vue'

export const progressProps = {
  percentage: { type: Number, default: 0, validator: (v: number) => v >= 0 && v <= 100 },
  type: { type: String as PropType<'line' | 'circle'>, default: 'line' },
  status: { type: String as PropType<'success' | 'warning' | 'danger' | 'info'> },
  strokeWidth: { type: Number, default: 10 },
  /** 圆形进度直径 */
  width: { type: Number, default: 120 },
  showText: { type: Boolean, default: true },
  /** 文字显示在进度条内部 */
  textInside: Boolean,
  color: String,
  /** 流动的笔刷条纹 */
  striped: Boolean,
  indeterminate: Boolean,
  format: { type: Function as PropType<(p: number) => string> },
}
export type ProgressProps = ExtractPropTypes<typeof progressProps>
