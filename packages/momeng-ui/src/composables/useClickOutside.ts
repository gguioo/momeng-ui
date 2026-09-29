import { onBeforeUnmount, onMounted, unref, type Ref } from 'vue'

type El = HTMLElement | null | undefined

export function useClickOutside(
  targets: Array<Ref<El> | (() => El)>,
  handler: (e: MouseEvent) => void,
) {
  const listener = (e: MouseEvent) => {
    const path = e.composedPath()
    const inside = targets.some((t) => {
      const el = typeof t === 'function' ? t() : unref(t)
      return el && (path.includes(el) || el.contains(e.target as Node))
    })
    if (!inside) handler(e)
  }
  onMounted(() => document.addEventListener('mousedown', listener, true))
  onBeforeUnmount(() => document.removeEventListener('mousedown', listener, true))
}
