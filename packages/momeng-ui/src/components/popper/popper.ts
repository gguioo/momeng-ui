import type { ExtractPropTypes, PropType } from 'vue'
import type { Placement } from '../../utils'

export type PopperTrigger = 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'

export const popperProps = {
  /** 受控显示，配合 v-model:visible */
  visible: { type: Boolean, default: undefined },
  trigger: { type: String as PropType<PopperTrigger>, default: 'hover' },
  placement: { type: String as PropType<Placement>, default: 'top' },
  offset: { type: Number, default: 10 },
  disabled: Boolean,
  showArrow: { type: Boolean, default: true },
  openDelay: { type: Number, default: 80 },
  closeDelay: { type: Number, default: 120 },
  /** 浮层挂载到 body */
  teleported: { type: Boolean, default: true },
  /** 墨底（dark）或纸底（light） */
  effect: { type: String as PropType<'light' | 'dark'>, default: 'light' },
  popperClass: { type: [String, Array, Object] as PropType<any> },
  popperStyle: { type: [String, Object] as PropType<any> },
  /** 浮层最小宽度与触发器一致 */
  matchWidth: Boolean,
  /** 关闭后是否保留 DOM */
  persistent: Boolean,
  role: { type: String, default: 'tooltip' },
  transition: { type: String, default: 'mo-pop' },
  /** 浮层内可交互（hover 移入浮层不关闭） */
  interactive: { type: Boolean, default: true },
}

export const popperEmits = {
  'update:visible': (v: boolean) => typeof v === 'boolean',
  show: () => true,
  hide: () => true,
}
export type PopperProps = ExtractPropTypes<typeof popperProps>
