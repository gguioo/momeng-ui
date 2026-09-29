import { nextTick, onBeforeUnmount, ref, watch, type Ref } from 'vue'
import type { Placement } from '../utils/types'

export interface PositionOptions {
  placement: () => Placement
  offset?: () => number
  /** 空间不足时自动翻转到对侧 */
  flip?: () => boolean
  /** 浮层宽度与触发器一致（Select 使用） */
  matchWidth?: () => boolean
}

const opposite: Record<string, string> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

export function computePosition(
  refRect: DOMRect,
  floatRect: { width: number; height: number },
  placement: Placement,
  offset: number,
) {
  const [side, align = 'center'] = placement.split('-') as [string, string?]
  let top = 0
  let left = 0
  if (side === 'top' || side === 'bottom') {
    top = side === 'top' ? refRect.top - floatRect.height - offset : refRect.bottom + offset
    if (align === 'start') left = refRect.left
    else if (align === 'end') left = refRect.right - floatRect.width
    else left = refRect.left + refRect.width / 2 - floatRect.width / 2
  } else {
    left = side === 'left' ? refRect.left - floatRect.width - offset : refRect.right + offset
    if (align === 'start') top = refRect.top
    else if (align === 'end') top = refRect.bottom - floatRect.height
    else top = refRect.top + refRect.height / 2 - floatRect.height / 2
  }
  return { top, left }
}

/**
 * 轻量浮层定位：position: fixed + getBoundingClientRect，
 * 支持 12 个方位、自动翻转、视口边缘修正与滚动/缩放跟随。
 */
export function usePosition(
  reference: Ref<HTMLElement | null | undefined>,
  floating: Ref<HTMLElement | null | undefined>,
  visible: Ref<boolean>,
  options: PositionOptions,
) {
  const style = ref<Record<string, string>>({ top: '0px', left: '0px' })
  const actualPlacement = ref<Placement>(options.placement())

  const update = () => {
    const refEl = reference.value
    const floatEl = floating.value
    if (!refEl || !floatEl) return
    const refRect = refEl.getBoundingClientRect()
    if (options.matchWidth?.()) floatEl.style.minWidth = `${refRect.width}px`
    const floatRect = { width: floatEl.offsetWidth, height: floatEl.offsetHeight }
    const offset = options.offset?.() ?? 8
    let placement = options.placement()
    let pos = computePosition(refRect, floatRect, placement, offset)
    const vw = window.innerWidth
    const vh = window.innerHeight

    if (options.flip?.() ?? true) {
      const side = placement.split('-')[0]
      const overflow =
        (side === 'top' && pos.top < 0) ||
        (side === 'bottom' && pos.top + floatRect.height > vh) ||
        (side === 'left' && pos.left < 0) ||
        (side === 'right' && pos.left + floatRect.width > vw)
      if (overflow) {
        const flipped = placement.replace(side, opposite[side]) as Placement
        const next = computePosition(refRect, floatRect, flipped, offset)
        const fits =
          next.top >= 0 &&
          next.top + floatRect.height <= vh &&
          next.left >= 0 &&
          next.left + floatRect.width <= vw
        if (fits) {
          placement = flipped
          pos = next
        }
      }
    }
    // 视口边缘修正，留 6px 呼吸
    pos.left = Math.min(Math.max(6, pos.left), Math.max(6, vw - floatRect.width - 6))
    pos.top = Math.min(Math.max(6, pos.top), Math.max(6, vh - floatRect.height - 6))

    actualPlacement.value = placement
    style.value = { top: `${Math.round(pos.top)}px`, left: `${Math.round(pos.left)}px` }
  }

  const onChange = () => visible.value && update()
  let bound = false
  const bind = () => {
    if (bound) return
    window.addEventListener('scroll', onChange, true)
    window.addEventListener('resize', onChange)
    bound = true
  }
  const unbind = () => {
    if (!bound) return
    window.removeEventListener('scroll', onChange, true)
    window.removeEventListener('resize', onChange)
    bound = false
  }

  watch(
    visible,
    async (v) => {
      if (v) {
        await nextTick()
        update()
        bind()
      } else unbind()
    },
    { immediate: true },
  )
  onBeforeUnmount(unbind)

  return { style, actualPlacement, update }
}
