import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import type { ComponentSize } from '../../utils'

export type RadioValue = string | number | boolean

export const radioProps = {
  modelValue: { type: [String, Number, Boolean] as PropType<RadioValue>, default: undefined },
  value: { type: [String, Number, Boolean] as PropType<RadioValue>, default: undefined },
  label: String,
  disabled: Boolean,
  border: Boolean,
  size: { type: String as PropType<ComponentSize> },
  name: String,
}
export const radioEmits = {
  'update:modelValue': (v: RadioValue) => v !== undefined,
  change: (v: RadioValue) => v !== undefined,
}

export const radioGroupProps = {
  modelValue: { type: [String, Number, Boolean] as PropType<RadioValue>, default: undefined },
  disabled: Boolean,
  size: { type: String as PropType<ComponentSize> },
  /** 按钮样式：像一排小木牌 */
  type: { type: String as PropType<'default' | 'button'>, default: 'default' },
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  name: String,
  validateEvent: { type: Boolean, default: true },
}
export const radioGroupEmits = radioEmits

export interface RadioGroupContext {
  modelValue: Ref<RadioValue | undefined>
  disabled: Ref<boolean>
  size: Ref<ComponentSize | undefined>
  type: Ref<'default' | 'button'>
  name: Ref<string | undefined>
  select: (v: RadioValue) => void
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('moRadioGroup')

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
