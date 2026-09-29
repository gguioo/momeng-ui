import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { ComponentSize } from '../../utils'
import type { FormRule, FormRules, RuleTrigger } from './validator'

export const formProps = {
  model: { type: Object as PropType<Record<string, any>> },
  rules: { type: Object as PropType<FormRules> },
  labelPosition: { type: String as PropType<'left' | 'right' | 'top'>, default: 'right' },
  labelWidth: { type: [String, Number], default: '' },
  /** 必填星号：朱砂小点 */
  hideRequiredAsterisk: Boolean,
  showMessage: { type: Boolean, default: true },
  inline: Boolean,
  size: { type: String as PropType<ComponentSize> },
  disabled: Boolean,
  /** 校验失败时滚动到第一个错误项 */
  scrollToError: Boolean,
}

export const formEmits = {
  validate: (prop: string, valid: boolean, message: string | null) =>
    typeof prop === 'string' && !!(valid || message),
}

export const formItemProps = {
  label: String,
  prop: String,
  labelWidth: { type: [String, Number] },
  required: { type: Boolean, default: undefined },
  rules: { type: [Object, Array] as PropType<FormRule | FormRule[]> },
  /** 手动设置错误文案 */
  error: String,
  showMessage: { type: Boolean, default: true },
  size: { type: String as PropType<ComponentSize> },
}

export type ValidateState = '' | 'success' | 'error' | 'validating'

export interface FormItemContext {
  prop?: string
  inputId: string
  labelId: string
  size: ComponentSize | undefined
  validateState: ValidateState
  validate: (trigger?: RuleTrigger) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  $el?: HTMLElement
}

export interface FormContext {
  props: FormProps
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  emitValidate: (prop: string, valid: boolean, message: string | null) => void
}

export interface FormValidateResult {
  valid: boolean
  /** 失败字段 -> 提示文案 */
  errors: Record<string, string>
}

export const formContextKey: InjectionKey<FormContext> = Symbol('moForm')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('moFormItem')

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
