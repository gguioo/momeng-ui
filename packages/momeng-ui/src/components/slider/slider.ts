import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

export const sliderProps = {
  modelValue: { type: [Number, Array] as PropType<number | [number, number]>, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  /** 范围选择 */
  range: Boolean,
  disabled: Boolean,
  showTooltip: { type: Boolean, default: true },
  formatTooltip: { type: Function as PropType<(v: number) => string | number> },
  /** 显示间断点 */
  showStops: Boolean,
  /** 刻度标记，如 { 0: '晨', 50: '午', 100: '暮' } */
  marks: { type: Object as PropType<Record<number, string>> },
  size: { type: String as PropType<ComponentSize> },
  ariaLabel: String,
  validateEvent: { type: Boolean, default: true },
}

export const sliderEmits = {
  'update:modelValue': (v: number | [number, number]) => v !== undefined,
  change: (v: number | [number, number]) => v !== undefined,
  input: (v: number | [number, number]) => v !== undefined,
}
export type SliderProps = ExtractPropTypes<typeof sliderProps>
