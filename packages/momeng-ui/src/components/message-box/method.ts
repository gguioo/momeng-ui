import { createVNode, render, type AppContext } from 'vue'
import MessageBoxComp from './MessageBox.vue'
import type { MessageBoxAction, MessageBoxOptions } from './message-box'

function open(options: MessageBoxOptions, context?: AppContext | null): Promise<MessageBoxAction> {
  return new Promise((resolve) => {
    const holder = document.createElement('div')
    const vnode = createVNode(MessageBoxComp, {
      options,
      onAction: (a: MessageBoxAction) => resolve(a),
      onDestroy: () => {
        render(null, holder)
        holder.remove()
      },
    })
    vnode.appContext = context ?? options.appContext ?? MessageBox._context ?? null
    document.body.appendChild(holder)
    render(vnode, holder)
  })
}

const MessageBox = Object.assign(open, {
  _context: null as AppContext | null,
  /** 确认框：用户点「确定」resolve(true)，否则 resolve(false) */
  confirm(message: string, title?: string, options: MessageBoxOptions = {}) {
    return open({ type: 'warning', ...options, message, title: title ?? options.title }).then(
      (a) => a === 'confirm',
    )
  },
  /** 提示框：只有一个按钮 */
  alert(message: string, title?: string, options: MessageBoxOptions = {}) {
    return open({
      type: 'info',
      ...options,
      message,
      title: title ?? options.title,
      showCancelButton: false,
    }).then(() => undefined)
  },
})

export default MessageBox
