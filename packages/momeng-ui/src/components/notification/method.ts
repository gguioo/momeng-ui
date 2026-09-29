import { createVNode, render, type AppContext, type VNode } from 'vue'
import NotificationComp from './Notification.vue'
import type {
  NotificationFn,
  NotificationHandler,
  NotificationOptions,
  NotificationPosition,
  NotificationType,
} from './notification'
import { isClient } from '../../utils'
import { useZIndex } from '../../composables/useZIndex'

const containers = new Map<NotificationPosition, HTMLElement>()
const instances: { id: string; vnode: VNode; handler: NotificationHandler }[] = []
let seed = 0

function getContainer(position: NotificationPosition) {
  let el = containers.get(position)
  if (!el || !document.body.contains(el)) {
    el = document.createElement('div')
    el.className = `mo-notification-container mo-notification-container--${position}`
    document.body.appendChild(el)
    containers.set(position, el)
  }
  el.style.zIndex = String(useZIndex().nextZIndex())
  return el
}

const notify = ((options: NotificationOptions | string = {}, context?: AppContext | null) => {
  if (!isClient) return { close: () => {} }
  const opts: NotificationOptions = typeof options === 'string' ? { message: options } : options
  const position = opts.position ?? 'top-right'
  const id = `mo-notification-${seed++}`
  const holder = document.createElement('div')
  const vnode = createVNode(NotificationComp, {
    ...opts,
    position,
    id,
    onClose: () => {
      const i = instances.findIndex((x) => x.id === id)
      if (i > -1) instances.splice(i, 1)
      opts.onClose?.()
    },
    onDestroy: () => render(null, holder),
  })
  vnode.appContext = context ?? opts.appContext ?? notify._context ?? null
  render(vnode, holder)
  const container = getContainer(position)
  const el = holder.firstElementChild!
  position.startsWith('bottom') ? container.prepend(el) : container.appendChild(el)
  const handler = { close: () => (vnode.component?.exposed as any)?.close?.() }
  instances.push({ id, vnode, handler })
  return handler
}) as NotificationFn

;(['primary', 'success', 'warning', 'danger', 'info'] as NotificationType[]).forEach((type) => {
  notify[type] = (options, ctx) =>
    notify({ ...(typeof options === 'string' ? { message: options } : options), type }, ctx)
})
notify.closeAll = () => [...instances].forEach((i) => i.handler.close())

export default notify
