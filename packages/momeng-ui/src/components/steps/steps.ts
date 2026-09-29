import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'
export const stepsProps = {
  active: { type: Number, default: 0 },
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  /** 当前步骤的状态 */
  processStatus: { type: String as PropType<StepStatus>, default: 'process' },
  finishStatus: { type: String as PropType<StepStatus>, default: 'finish' },
  alignCenter: Boolean,
  /** 以汉字数字标序：一、二、三 */
  chineseNumber: { type: Boolean, default: true },
}
export const stepProps = {
  title: String,
  description: String,
  icon: String,
  status: { type: String as PropType<StepStatus> },
}
export interface StepsContext {
  props: ExtractPropTypes<typeof stepsProps>
  steps: Ref<number[]>
  register: (uid: number) => void
  unregister: (uid: number) => void
}
export const stepsContextKey: InjectionKey<StepsContext> = Symbol('moSteps')
export type StepsProps = ExtractPropTypes<typeof stepsProps>
export type StepProps = ExtractPropTypes<typeof stepProps>
