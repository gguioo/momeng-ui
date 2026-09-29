import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useLockScroll, useZIndex } from '../../composables'
import type { ExtractPropTypes } from 'vue'
import type { overlayBaseProps } from './dialog'

type Props = ExtractPropTypes<typeof overlayBaseProps>
type Emit = (event: any, ...args: any[]) => void

/** Dialog / Drawer 共享的弹层逻辑：层级、滚动锁定、焦点管理、ESC 关闭 */
export function useOverlay(props: Props, emit: Emit) {
  const { nextZIndex } = useZIndex()
  const visible = ref(false)
  const rendered = ref(false)
  const zIndex = ref(props.zIndex ?? 0)
  // 模板中使用 ref="panel"
  const panelRef = useTemplateRef<HTMLElement>('panel')
  let lastActive: HTMLElement | null = null

  useLockScroll(visible, () => props.lockScroll)

  function open() {
    lastActive = document.activeElement as HTMLElement | null
    zIndex.value = props.zIndex ?? nextZIndex()
    rendered.value = true
    visible.value = true
    emit('open')
    nextTick(() => panelRef.value?.focus())
  }
  function doClose() {
    visible.value = false
    emit('update:modelValue', false)
    emit('close')
  }
  function requestClose() {
    if (props.beforeClose) props.beforeClose(doClose)
    else doClose()
  }
  function onAfterEnter() {
    emit('opened')
  }
  function onAfterLeave() {
    emit('closed')
    if (props.destroyOnClose) rendered.value = false
    lastActive?.focus?.()
  }
  function onModalClick() {
    if (props.closeOnClickModal) requestClose()
  }
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.closeOnPressEscape) {
      e.stopPropagation()
      requestClose()
    }
    // 简易焦点陷阱
    if (e.key === 'Tab' && panelRef.value) {
      const focusables = panelRef.value.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  watch(
    () => props.modelValue,
    (v) => {
      if (v && !visible.value) open()
      else if (!v && visible.value) {
        visible.value = false
        emit('close')
      }
    },
  )
  onMounted(() => props.modelValue && open())

  return {
    visible,
    rendered: computed(() => rendered.value || !props.destroyOnClose),
    zIndex,
    requestClose,
    onAfterEnter,
    onAfterLeave,
    onModalClick,
    onKeydown,
  }
}
