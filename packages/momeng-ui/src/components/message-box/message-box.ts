import type { AppContext } from 'vue'
import type { StatusType } from '../../utils'

export type MessageBoxAction = 'confirm' | 'cancel' | 'close'

export interface MessageBoxOptions {
  title?: string
  message?: string
  type?: StatusType
  confirmButtonText?: string
  cancelButtonText?: string
  showCancelButton?: boolean
  /** 危险操作：确认按钮变为胭脂色 */
  danger?: boolean
  closeOnClickModal?: boolean
  /** 确认前的异步钩子，返回 false 阻止关闭 */
  beforeConfirm?: () => boolean | Promise<boolean>
  appContext?: AppContext | null
}
