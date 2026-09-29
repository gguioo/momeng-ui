import { createVNode, render, type Directive, type DirectiveBinding } from 'vue'
import LoadingComp from './Loading.vue'
import type { LoadingOptions } from './loading'
import { useZIndex } from '../../composables/useZIndex'

export interface LoadingInstance {
  close: () => void
  setText: (text: string) => void
}

let fullscreenInstance: LoadingInstance | null = null

/** 函数式调用：const loading = MoLoading.service({ text: '研墨中…' }); loading.close() */
export function loadingService(options: LoadingOptions = {}): LoadingInstance {
  const fullscreen = options.fullscreen ?? !options.target
  if (fullscreen && fullscreenInstance) return fullscreenInstance
  const target =
    typeof options.target === 'string'
      ? document.querySelector<HTMLElement>(options.target)
      : options.target
  const parent = fullscreen ? document.body : (target ?? document.body)
  const holder = document.createElement('div')
  holder.className = 'mo-loading-mask'
  if (fullscreen) {
    holder.classList.add('is-fullscreen')
    holder.style.zIndex = String(useZIndex().nextZIndex())
  }
  if (options.background) holder.style.background = options.background

  const state = { text: options.text }
  const mount = () =>
    render(createVNode(LoadingComp, { text: state.text, variant: options.variant }), holder)
  mount()

  const prevPosition = parent.style.position
  if (!fullscreen && getComputedStyle(parent).position === 'static')
    parent.style.position = 'relative'
  const lock = fullscreen && options.lock !== false
  const prevOverflow = document.body.style.overflow
  if (lock) document.body.style.overflow = 'hidden'
  parent.appendChild(holder)

  const instance: LoadingInstance = {
    setText(text) {
      state.text = text
      mount()
    },
    close() {
      holder.classList.add('is-leaving')
      setTimeout(() => {
        render(null, holder)
        holder.remove()
        if (!fullscreen) parent.style.position = prevPosition
        if (lock) document.body.style.overflow = prevOverflow
      }, 200)
      if (fullscreen) fullscreenInstance = null
    },
  }
  if (fullscreen) fullscreenInstance = instance
  return instance
}

const KEY = '__moLoading__'
type El = HTMLElement & { __moLoading__?: LoadingInstance }

function toggle(el: El, binding: DirectiveBinding<boolean>) {
  const text = el.getAttribute('mo-loading-text') ?? undefined
  const variant = (el.getAttribute('mo-loading-variant') as LoadingOptions['variant']) ?? undefined
  if (binding.value && !el[KEY]) {
    el[KEY] = loadingService({
      target: el,
      text,
      variant,
      fullscreen: !!binding.modifiers.fullscreen,
    })
  } else if (!binding.value && el[KEY]) {
    el[KEY]!.close()
    delete el[KEY]
  }
}

/** 指令：<div v-loading="isLoading" mo-loading-text="加载中"> */
export const vLoading: Directive<El, boolean> = {
  mounted: toggle,
  updated(el, binding) {
    if (binding.value !== binding.oldValue) toggle(el, binding)
  },
  unmounted(el) {
    el[KEY]?.close()
  },
}
