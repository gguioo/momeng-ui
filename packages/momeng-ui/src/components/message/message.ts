import type { AppContext, ExtractPropTypes, PropType, VNode } from 'vue'

export type MessageType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export const messageProps = {
  id: { type: String, default: '' },
  message: {
    type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>,
    default: '',
  },
  type: { type: String as PropType<MessageType>, default: 'info' },
  /** 显示时长，0 表示不自动关闭 */
  duration: { type: Number, default: 3000 },
  showClose: Boolean,
  icon: String,
  /** 合并相同内容的消息 */
  grouping: Boolean,
  repeatNum: { type: Number, default: 1 },
  onClose: { type: Function as PropType<() => void> },
}
export type MessageProps = ExtractPropTypes<typeof messageProps>

export interface MessageOptions {
  message?: string | VNode | (() => VNode)
  type?: MessageType
  duration?: number
  showClose?: boolean
  icon?: string
  grouping?: boolean
  onClose?: () => void
  appContext?: AppContext | null
}
export interface MessageHandler {
  close: () => void
}
export type MessageParams = string | MessageOptions
export type MessageFn = {
  (options: MessageParams, appContext?: AppContext | null): MessageHandler
  closeAll: () => void
  _context?: AppContext | null
} & {
  [K in MessageType]: (options: MessageParams, appContext?: AppContext | null) => MessageHandler
}
