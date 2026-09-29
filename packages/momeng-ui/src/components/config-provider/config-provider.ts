import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

export const configProviderProps = {
  size: { type: String as PropType<ComponentSize> },
  zIndex: Number,
  /** 局部主题 */
  theme: { type: String as PropType<'light' | 'dark'> },
  /** 工整模式：关闭手绘抖动圆角 */
  tidy: Boolean,
  /** 覆盖设计变量，如 { 'color-primary': '#5b8c5a' } */
  tokens: { type: Object as PropType<Record<string, string>> },
  tag: { type: String, default: 'div' },
}
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
