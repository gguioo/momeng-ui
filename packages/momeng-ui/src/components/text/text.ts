import type { ExtractPropTypes, PropType } from 'vue'
import type { StatusType } from '../../utils'

export const textProps = {
  type: { type: String as PropType<StatusType | 'secondary' | 'placeholder'> },
  size: { type: String as PropType<'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'> },
  tag: { type: String, default: 'span' },
  /** 字体：正文文楷 / 快乐体 / 行书 */
  font: { type: String as PropType<'body' | 'display' | 'brush'>, default: 'body' },
  bold: Boolean,
  /** 荧光笔划重点 */
  mark: { type: [Boolean, String] as PropType<boolean | 'pink' | 'yellow' | 'green' | 'blue'> },
  /** 手绘波浪下划线 */
  wavy: Boolean,
  /** 着重号：中文排版的「着重点」 */
  emphasis: Boolean,
  delete: Boolean,
  /** 单行省略 */
  truncated: Boolean,
  /** 多行省略的行数 */
  lineClamp: { type: [Number, String] },
  /** 竖排 */
  vertical: Boolean,
}

export type TextProps = ExtractPropTypes<typeof textProps>
