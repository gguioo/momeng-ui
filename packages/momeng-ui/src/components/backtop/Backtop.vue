<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { backtopEmits, backtopProps } from './backtop'
import { useNamespace } from '../../composables'
import MoMascot from '../mascot/Mascot.vue'

defineOptions({ name: 'MoBacktop' })
const props = defineProps(backtopProps)
const emit = defineEmits(backtopEmits)
const ns = useNamespace('backtop')
const visible = ref(false)
const container = shallowRef<HTMLElement | Window>()

const getTop = () =>
  container.value instanceof Window ? window.scrollY : (container.value?.scrollTop ?? 0)
const onScroll = () => (visible.value = getTop() >= props.visibilityHeight)

onMounted(() => {
  container.value = props.target
    ? (document.querySelector<HTMLElement>(props.target) ?? window)
    : window
  container.value.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => container.value?.removeEventListener('scroll', onScroll))

function onClick(e: MouseEvent) {
  container.value?.scrollTo({ top: 0, behavior: 'smooth' })
  emit('click', e)
}
</script>

<template>
  <Transition name="mo-backtop">
    <button
      v-if="visible"
      type="button"
      :class="ns.b()"
      :style="{ right: `${right}px`, bottom: `${bottom}px` }"
      aria-label="回到顶部"
      @click="onClick"
    >
      <slot
        ><MoMascot mood="wink" :size="44" :animated="false" /><span :class="ns.e('text')"
          >回顶</span
        ></slot
      >
    </button>
  </Transition>
</template>
