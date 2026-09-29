import {
  createVNode,
  isVNode,
  render,
  type AppContext,
  type ComponentPublicInstance,
  type VNode,
} from 'vue'
import MessageComp from './Message.vue'
import type {
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageParams,
  MessageType,
} from './message'
import { isClient } from '../../utils'
import { useZIndex } from '../../composables/useZIndex'

interface Instance {
  id: string
  vnode: VNode
  handler: MessageHandler
  props: MessageOptions
}
const instances: Instance[] = []
let seed = 0
let container: HTMLElement | null = null

function getContainer() {
  if (!container || !document.body.contains(container)) {
    container = document.createElement('div')
    container.className = 'mo-message-container'
    document.body.appendChild(container)
  }
  container.style.zIndex = String(useZIndex().nextZIndex())
  return container
}

function normalize(params: MessageParams): MessageOptions {
  return typeof params === 'string' || isVNode(params) ? { message: params as any } : params
}

const message = ((params: MessageParams = {}, context?: AppContext | null): MessageHandler => {
  if (!isClient) return { close: () => {} }
  const options = normalize(params)

  if (options.grouping && typeof options.message === 'string') {
    const same = instances.find(
      (i) => i.props.message === options.message && i.props.type === (options.type ?? 'info'),
    )
    if (same) {
      const comp = same.vnode.component!
      comp.props.repeatNum = ((comp.props.repeatNum as number) || 1) + 1
      return same.handler
    }
  }

  const id = `mo-message-${seed++}`
  const holder = document.createElement('div')
  const props = {
    ...options,
    type: options.type ?? 'info',
    id,
    onClose: () => {
      const i = instances.findIndex((x) => x.id === id)
      if (i > -1) instances.splice(i, 1)
      options.onClose?.()
    },
    onDestroy: () => render(null, holder),
  }
  const vnode = createVNode(MessageComp, props)
  vnode.appContext = context ?? options.appContext ?? message._context ?? null
  render(vnode, holder)
  getContainer().appendChild(holder.firstElementChild!)

  const handler: MessageHandler = {
    close: () =>
      (vnode.component?.exposed as ComponentPublicInstance & { close: () => void })?.close?.(),
  }
  instances.push({ id, vnode, handler, props: { ...options, type: props.type } })
  return handler
}) as MessageFn

const types: MessageType[] = ['primary', 'success', 'warning', 'danger', 'info']
types.forEach((type) => {
  message[type] = (params: MessageParams, ctx?: AppContext | null) =>
    message({ ...normalize(params), type }, ctx)
})
message.closeAll = () => [...instances].forEach((i) => i.handler.close())

export default message
