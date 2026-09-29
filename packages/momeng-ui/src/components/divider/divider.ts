import type { ExtractPropTypes, PropType } from 'vue'

export const dividerProps = {
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  /** 笔触：毛笔 / 细线 / 虚线 / 点 */
  variant: { type: String as PropType<'brush' | 'line' | 'dashed' | 'dotted'>, default: 'brush' },
  contentPosition: { type: String as PropType<'left' | 'center' | 'right'>, default: 'center' },
  /** 中间的纹样图标，如 'plum'、'cloud' */
  ornament: String,
  color: String,
}
export type DividerProps = ExtractPropTypes<typeof dividerProps>
