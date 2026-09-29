import type { ExtractPropTypes, PropType } from 'vue'
import type { IconName } from './icons'

export const iconProps = {
  /** 内置图标名 */
  name: { type: String as PropType<IconName | (string & {})> },
  /** 尺寸，数字按 px 处理 */
  size: { type: [Number, String] },
  /** 颜色，默认继承 currentColor */
  color: String,
  /** 笔触粗细 */
  strokeWidth: { type: [Number, String], default: 2 },
  /** 旋转动画 */
  spin: Boolean,
  /** 无障碍标签；不传时视为装饰性图标 */
  label: String,
}

export type IconProps = ExtractPropTypes<typeof iconProps>
