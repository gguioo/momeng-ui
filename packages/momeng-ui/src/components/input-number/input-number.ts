import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

export const inputNumberProps = {
  modelValue: { type: Number as PropType<number | null> },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  /** 只能输入 step 的倍数 */
  stepStrictly: Boolean,
  precision: Number,
  size: { type: String as PropType<ComponentSize> },
  disabled: Boolean,
  readonly: Boolean,
  placeholder: String,
  /** 按钮位置：两侧 / 右侧 / 不显示 */
  controls: { type: String as PropType<'both' | 'right' | 'none'>, default: 'both' },
  validateEvent: { type: Boolean, default: true },
}

export const inputNumberEmits = {
  'update:modelValue': (v: number | null) => v === null || typeof v === 'number',
  change: (v: number | null, old: number | null | undefined) =>
    v === null || typeof v === 'number' || old === undefined,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
}
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
