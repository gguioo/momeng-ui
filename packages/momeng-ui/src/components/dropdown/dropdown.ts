import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { Placement } from '../../utils'
import type { PopperTrigger } from '../popper/popper'

export type DropdownCommand = string | number | Record<string, any>
export const dropdownProps = {
  trigger: { type: String as PropType<PopperTrigger>, default: 'hover' },
  placement: { type: String as PropType<Placement>, default: 'bottom-start' },
  disabled: Boolean,
  /** 点击菜单项后收起 */
  hideOnClick: { type: Boolean, default: true },
  teleported: { type: Boolean, default: true },
}
export const dropdownEmits = {
  command: (c: DropdownCommand) => c !== undefined,
  'visible-change': (v: boolean) => typeof v === 'boolean',
}
export const dropdownItemProps = {
  command: { type: [String, Number, Object] as PropType<DropdownCommand> },
  icon: String,
  disabled: Boolean,
  /** 顶部分隔线 */
  divided: Boolean,
  danger: Boolean,
}
export interface DropdownContext {
  onCommand: (c: DropdownCommand | undefined) => void
}
export const dropdownContextKey: InjectionKey<DropdownContext> = Symbol('moDropdown')
export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
