import { getCurrentInstance, useId as useVueId } from 'vue'

let seed = 0
/** 生成唯一 id，用于 aria-* 关联；组件内使用 Vue 3.5 的 useId 保证 SSR 一致 */
export function useId(prefix = 'mo') {
  const id = getCurrentInstance() ? useVueId() : `x${seed++}`
  return `${prefix}-${id}`
}
