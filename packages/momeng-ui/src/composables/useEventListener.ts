import { onBeforeUnmount, onMounted } from 'vue'

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Document | (() => EventTarget | null | undefined),
  event: K | string,
  handler: (e: any) => void,
  options?: AddEventListenerOptions | boolean,
) {
  let el: EventTarget | null | undefined
  onMounted(() => {
    el = typeof target === 'function' ? target() : target
    el?.addEventListener(event, handler, options)
  })
  onBeforeUnmount(() => el?.removeEventListener(event, handler, options))
}
