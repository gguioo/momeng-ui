import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import type { ComponentSize } from '../../utils'

export type CheckboxValue = string | number | boolean

export const checkboxProps = {
  modelValue: { type: [Boolean, String, Number] as PropType<CheckboxValue>, default: undefined },
  /** 在 CheckboxGroup 中代表的值 */
  value: { type: [String, Number, Boolean] as PropType<CheckboxValue>, default: undefined },
  label: String,
  trueValue: { type: [String, Number, Boolean] as PropType<CheckboxValue>, default: true },
  falseValue: { type: [String, Number, Boolean] as PropType<CheckboxValue>, default: false },
  indeterminate: Boolean,
  disabled: Boolean,
  /** 带边框的卡片式 */
  border: Boolean,
  size: { type: String as PropType<ComponentSize> },
  name: String,
  validateEvent: { type: Boolean, default: true },
}

export const checkboxEmits = {
  'update:modelValue': (v: CheckboxValue) => v !== undefined,
  change: (v: CheckboxValue) => v !== undefined,
}

export const checkboxGroupProps = {
  modelValue: { type: Array as PropType<CheckboxValue[]>, default: () => [] },
  disabled: Boolean,
  min: Number,
  max: Number,
  size: { type: String as PropType<ComponentSize> },
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  validateEvent: { type: Boolean, default: true },
}

export const checkboxGroupEmits = {
  'update:modelValue': (v: CheckboxValue[]) => Array.isArray(v),
  change: (v: CheckboxValue[]) => Array.isArray(v),
}

export interface CheckboxGroupContext {
  modelValue: Ref<CheckboxValue[]>
  disabled: Ref<boolean>
  min: Ref<number | undefined>
  max: Ref<number | undefined>
  size: Ref<ComponentSize | undefined>
  toggle: (value: CheckboxValue) => void
}
export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('moCheckboxGroup')

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
