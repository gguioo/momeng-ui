import type { ExtractPropTypes } from 'vue'

export const backtopProps = {
  /** 滚动容器选择器，默认 window */
  target: String,
  /** 滚动超过多少像素后出现 */
  visibilityHeight: { type: Number, default: 200 },
  right: { type: Number, default: 40 },
  bottom: { type: Number, default: 40 },
}
export const backtopEmits = { click: (e: MouseEvent) => e instanceof MouseEvent }
export type BacktopProps = ExtractPropTypes<typeof backtopProps>
