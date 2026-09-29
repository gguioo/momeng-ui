import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

export const rateProps = {
  modelValue: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  /** 图标：星星、爱心、梅花…… */
  icon: { type: String, default: 'star' },
  allowHalf: Boolean,
  /** 再次点击相同值可清空 */
  clearable: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  showText: Boolean,
  texts: {
    type: Array as PropType<string[]>,
    default: () => ['不太行', '还可以', '挺好的', '很喜欢', '超级爱'],
  },
  /** 高亮颜色 */
  color: String,
  size: { type: String as PropType<ComponentSize> },
  validateEvent: { type: Boolean, default: true },
}
export const rateEmits = {
  'update:modelValue': (v: number) => typeof v === 'number',
  change: (v: number) => typeof v === 'number',
}
export type RateProps = ExtractPropTypes<typeof rateProps>
