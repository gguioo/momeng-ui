import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

type SwitchValue = boolean | string | number
export const switchProps = {
  modelValue: { type: [Boolean, String, Number] as PropType<SwitchValue>, default: false },
  activeValue: { type: [Boolean, String, Number] as PropType<SwitchValue>, default: true },
  inactiveValue: { type: [Boolean, String, Number] as PropType<SwitchValue>, default: false },
  activeText: String,
  inactiveText: String,
  /** 文字显示在轨道内 */
  inlinePrompt: Boolean,
  disabled: Boolean,
  loading: Boolean,
  size: { type: String as PropType<ComponentSize> },
  /** 切换前钩子，返回 false 或 reject 则阻止切换 */
  beforeChange: { type: Function as PropType<() => boolean | Promise<boolean>> },
  /** 滑块上的小表情 */
  face: { type: Boolean, default: true },
  name: String,
  validateEvent: { type: Boolean, default: true },
}
export const switchEmits = {
  'update:modelValue': (v: SwitchValue) => v !== undefined,
  change: (v: SwitchValue) => v !== undefined,
}
export type SwitchProps = ExtractPropTypes<typeof switchProps>
