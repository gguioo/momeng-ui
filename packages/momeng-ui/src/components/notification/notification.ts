import type { AppContext, ExtractPropTypes, PropType, VNode } from 'vue'

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export type NotificationType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const notificationProps = {
  id: { type: String, default: '' },
  title: String,
  message: {
    type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>,
    default: '',
  },
  type: { type: String as PropType<NotificationType> },
  duration: { type: Number, default: 4500 },
  position: { type: String as PropType<NotificationPosition>, default: 'top-right' },
  showClose: { type: Boolean, default: true },
  icon: String,
  /** 用墨团代替图标 */
  mascot: Boolean,
  onClick: { type: Function as PropType<() => void> },
  onClose: { type: Function as PropType<() => void> },
}
export type NotificationProps = ExtractPropTypes<typeof notificationProps>

export interface NotificationOptions {
  title?: string
  message?: string | VNode | (() => VNode)
  type?: NotificationType
  duration?: number
  position?: NotificationPosition
  showClose?: boolean
  icon?: string
  mascot?: boolean
  onClick?: () => void
  onClose?: () => void
  appContext?: AppContext | null
}
export interface NotificationHandler {
  close: () => void
}
export type NotificationFn = {
  (options: NotificationOptions | string, appContext?: AppContext | null): NotificationHandler
  closeAll: () => void
  _context?: AppContext | null
} & {
  [K in NotificationType]: (
    options: NotificationOptions | string,
    appContext?: AppContext | null,
  ) => NotificationHandler
}
