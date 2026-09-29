import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { ComponentSize, ComponentType } from '../../utils'

export const buttonProps = {
  /** 语义类型 */
  type: { type: String as PropType<ComponentType>, default: undefined },
  size: { type: String as PropType<ComponentSize> },
  /** 素雅：浅底 + 同色描边 */
  plain: Boolean,
  /** 文字按钮：没有边框与阴影 */
  text: Boolean,
  /** 虚线描边，常用于「新增」 */
  dashed: Boolean,
  /** 胶囊圆角 */
  round: Boolean,
  /** 圆形按钮，配合 icon 使用 */
  circle: Boolean,
  /** 撑满父容器宽度 */
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  /** 左侧图标名 */
  icon: String,
  /** 原生 type */
  nativeType: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
  /** 渲染的标签，比如 'a' */
  tag: { type: String, default: 'button' },
  autofocus: Boolean,
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export interface ButtonGroupContext {
  size?: ComponentSize
  type?: ComponentType
}
export const buttonGroupKey: InjectionKey<ButtonGroupContext> = Symbol('moButtonGroup')

export const buttonGroupProps = {
  size: { type: String as PropType<ComponentSize> },
  type: { type: String as PropType<ComponentType> },
}
