import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

export type SelectValue = string | number | boolean
export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
  [key: string]: any
}

export const selectProps = {
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<SelectValue | SelectValue[] | null>,
    default: undefined,
  },
  options: { type: Array as PropType<SelectOption[]> },
  placeholder: { type: String, default: '请选择' },
  multiple: Boolean,
  /** 多选时最多选几个 */
  multipleLimit: { type: Number, default: 0 },
  clearable: Boolean,
  filterable: Boolean,
  disabled: Boolean,
  size: { type: String as PropType<ComponentSize> },
  noDataText: { type: String, default: '这里空空如也' },
  noMatchText: { type: String, default: '没有找到呢' },
  name: String,
  validateEvent: { type: Boolean, default: true },
  teleported: { type: Boolean, default: true },
}

export const selectEmits = {
  'update:modelValue': (v: any) => v !== undefined,
  change: (v: any) => v !== undefined,
  clear: () => true,
  'visible-change': (v: boolean) => typeof v === 'boolean',
  'remove-tag': (v: SelectValue) => v !== undefined,
}

export const optionProps = {
  value: { type: [String, Number, Boolean] as PropType<SelectValue>, required: true as const },
  label: String,
  disabled: Boolean,
}

export interface OptionState {
  value: SelectValue
  label: string
  disabled: boolean
}

export interface SelectContext {
  isSelected: (v: SelectValue) => boolean
  isHovered: (v: SelectValue) => boolean
  isVisible: (label: string) => boolean
  select: (option: OptionState) => void
  hover: (v: SelectValue) => void
  register: (option: OptionState) => void
  unregister: (v: SelectValue) => void
}
export const selectContextKey: InjectionKey<SelectContext> = Symbol('moSelect')

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type OptionProps = ExtractPropTypes<typeof optionProps>
