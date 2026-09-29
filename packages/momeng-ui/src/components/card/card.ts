import type { ExtractPropTypes, PropType } from 'vue'

export const cardProps = {
  /** 标题 */
  header: String,
  /** 阴影：钤印实影一直显示 / 悬停显示 / 不显示 */
  shadow: { type: String as PropType<'always' | 'hover' | 'never'>, default: 'always' },
  /** 纸张纹理 */
  textured: { type: Boolean, default: true },
  /** 右上角的「和纸胶带」装饰 */
  tape: { type: [Boolean, String] as PropType<boolean | 'pink' | 'green' | 'blue' | 'yellow'> },
  /** 右下角钤一方小印 */
  seal: String,
  bodyStyle: { type: [String, Object] as PropType<any> },
  /** 可点击卡片，悬停上浮 */
  hoverable: Boolean,
}
export type CardProps = ExtractPropTypes<typeof cardProps>
