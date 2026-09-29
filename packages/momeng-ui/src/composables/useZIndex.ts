import { ref } from 'vue'
import { useGlobalConfig } from './useConfig'

const zIndex = ref(0)

/** 统一管理弹层层级，保证后打开的弹层总在最上面 */
export function useZIndex() {
  const config = useGlobalConfig()
  const initial = config.value.zIndex ?? 2000
  const nextZIndex = () => {
    zIndex.value++
    return initial + zIndex.value
  }
  const currentZIndex = () => initial + zIndex.value
  return { nextZIndex, currentZIndex }
}
