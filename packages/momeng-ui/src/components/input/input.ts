import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../utils'

export const inputProps = {
  modelValue: { type: [String, Number] as PropType<string | number | null>, default: '' },
  type: { type: String, default: 'text' },
  placeholder: String,
  size: { type: String as PropType<ComponentSize> },
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  /** 密码框显示「小眼睛」切换 */
  showPassword: Boolean,
  prefixIcon: String,
  suffixIcon: String,
  maxlength: { type: [Number, String] },
  /** 显示字数统计 */
  showWordLimit: Boolean,
  /** textarea 行数 */
  rows: { type: Number, default: 3 },
  /** textarea 自适应高度 */
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
  },
  /** textarea 的稿纸格线 */
  lined: { type: Boolean, default: true },
  resize: { type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'> },
  autocomplete: { type: String, default: 'off' },
  name: String,
  id: String,
  autofocus: Boolean,
  /** 触发表单校验 */
  validateEvent: { type: Boolean, default: true },
  ariaLabel: String,
}

export const inputEmits = {
  'update:modelValue': (v: string) => typeof v === 'string',
  input: (v: string) => typeof v === 'string',
  change: (v: string) => typeof v === 'string',
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  clear: () => true,
  keydown: (e: KeyboardEvent | Event) => !!e,
}

export type InputProps = ExtractPropTypes<typeof inputProps>
