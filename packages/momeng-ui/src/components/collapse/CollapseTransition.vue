<script setup lang="ts">
defineOptions({ name: 'MoCollapseTransition' })

const reset = (el: Element) => {
  const s = (el as HTMLElement).style
  s.height = ''
  s.overflow = ''
}
const on = {
  beforeEnter(el: Element) {
    const s = (el as HTMLElement).style
    s.height = '0'
    s.overflow = 'hidden'
  },
  enter(el: Element) {
    const e = el as HTMLElement
    e.style.height = `${e.scrollHeight}px`
  },
  afterEnter: reset,
  enterCancelled: reset,
  beforeLeave(el: Element) {
    const e = el as HTMLElement
    e.style.height = `${e.scrollHeight}px`
    e.style.overflow = 'hidden'
  },
  leave(el: Element) {
    const e = el as HTMLElement
    void e.offsetHeight
    e.style.height = '0'
  },
  afterLeave: reset,
  leaveCancelled: reset,
}
</script>

<template>
  <Transition name="mo-collapse-transition" v-on="on">
    <slot />
  </Transition>
</template>
