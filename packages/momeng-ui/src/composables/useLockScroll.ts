import { watch, onBeforeUnmount, type Ref } from 'vue'
import { isClient } from '../utils/helpers'

let lockCount = 0
let originalOverflow = ''

/** 弹层打开时锁定 body 滚动，支持多层嵌套 */
export function useLockScroll(trigger: Ref<boolean>, enabled: () => boolean = () => true) {
  let locked = false
  const lock = () => {
    if (!isClient || locked || !enabled()) return
    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
    locked = true
  }
  const unlock = () => {
    if (!isClient || !locked) return
    lockCount--
    locked = false
    if (lockCount === 0) document.body.style.overflow = originalOverflow
  }
  watch(trigger, (v) => (v ? lock() : unlock()), { immediate: true })
  onBeforeUnmount(unlock)
}
