import type { ExtractPropTypes, PropType } from 'vue'

export const loadingProps = {
  text: String,
  /** 圆相（一笔画圆）/ 墨团 / 三点 */
  variant: { type: String as PropType<'enso' | 'mascot' | 'dots'>, default: 'enso' },
  size: { type: Number, default: 40 },
  fullscreen: Boolean,
  /** 遮罩背景 */
  background: String,
}
export type LoadingProps = ExtractPropTypes<typeof loadingProps>

export interface LoadingOptions {
  target?: HTMLElement | string
  text?: string
  variant?: 'enso' | 'mascot' | 'dots'
  fullscreen?: boolean
  background?: string
  lock?: boolean
}
