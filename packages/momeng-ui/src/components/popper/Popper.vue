<script setup lang="ts">
import { computed, mergeProps, onBeforeUnmount, ref, useAttrs, watch } from 'vue'
import { popperEmits, popperProps } from './popper'
import { useClickOutside, useId, useNamespace, usePosition, useZIndex } from '../../composables'

defineOptions({ name: 'MoPopper', inheritAttrs: false })
const props = defineProps(popperProps)
const emit = defineEmits(popperEmits)
const ns = useNamespace('popper')
const attrs = useAttrs()
const id = useId('mo-popper')
const { nextZIndex } = useZIndex()

const referenceRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const innerVisible = ref(false)
const zIndex = ref(0)
const visible = computed(
  () => (props.visible !== undefined ? props.visible : innerVisible.value) && !props.disabled,
)

const {
  style: positionStyle,
  actualPlacement,
  update,
} = usePosition(referenceRef, contentRef, visible, {
  placement: () => props.placement,
  offset: () => props.offset,
  matchWidth: () => props.matchWidth,
})

let timer: ReturnType<typeof setTimeout> | undefined
const setVisible = (v: boolean) => {
  if (v === visible.value) return
  innerVisible.value = v
  emit('update:visible', v)
}
const clear = () => timer && clearTimeout(timer)
function show(delay = 0) {
  if (props.disabled) return
  clear()
  if (delay <= 0) setVisible(true)
  else timer = setTimeout(() => setVisible(true), delay)
}
function hide(delay = 0) {
  clear()
  if (delay <= 0) setVisible(false)
  else timer = setTimeout(() => setVisible(false), delay)
}
const toggle = () => (visible.value ? hide() : show())

watch(visible, (v) => {
  if (v) {
    zIndex.value = nextZIndex()
    emit('show')
  } else emit('hide')
})

// —— 触发方式 ——
const referenceEvents = computed(() => {
  switch (props.trigger) {
    case 'hover':
      return {
        onMouseenter: () => show(props.openDelay),
        onMouseleave: () => hide(props.closeDelay),
        onFocusin: () => show(),
        onFocusout: () => hide(props.closeDelay),
      }
    case 'click':
      return { onClick: toggle }
    case 'focus':
      return { onFocusin: () => show(), onFocusout: () => hide(props.closeDelay) }
    case 'contextmenu':
      return {
        onContextmenu: (e: MouseEvent) => {
          e.preventDefault()
          show()
        },
      }
    default:
      return {}
  }
})
const referenceBindings = computed(() => mergeProps(attrs, referenceEvents.value))
const contentEvents = computed(() =>
  props.trigger === 'hover' && props.interactive
    ? { onMouseenter: () => clear(), onMouseleave: () => hide(props.closeDelay) }
    : {},
)

useClickOutside([referenceRef, contentRef], () => {
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    if (visible.value) hide()
  }
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && visible.value && props.trigger !== 'manual') hide()
}

onBeforeUnmount(clear)
defineExpose({ show, hide, toggle, update, referenceRef, contentRef, visible })
</script>

<template>
  <span
    ref="referenceRef"
    :class="ns.e('reference')"
    :aria-describedby="visible ? id : undefined"
    v-bind="referenceBindings"
    @keydown="onKeydown"
  >
    <slot />
  </span>
  <Teleport to="body" :disabled="!teleported">
    <Transition :name="transition" @after-leave="update">
      <div
        v-if="persistent || visible"
        v-show="visible"
        :id="id"
        ref="contentRef"
        :class="[ns.b(), ns.m(effect), ns.m(actualPlacement.split('-')[0]), popperClass]"
        :style="[positionStyle, { zIndex }, popperStyle]"
        :role="role"
        :data-placement="actualPlacement"
        v-bind="contentEvents"
        @keydown="onKeydown"
      >
        <slot name="content" />
        <span v-if="showArrow" :class="ns.e('arrow')" />
      </div>
    </Transition>
  </Teleport>
</template>
