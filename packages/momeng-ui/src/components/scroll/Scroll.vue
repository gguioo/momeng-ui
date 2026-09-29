<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { scrollEmits, scrollProps } from './scroll'
import { useNamespace } from '../../composables'
import { addUnit } from '../../utils'
import MoSeal from '../seal/Seal.vue'

defineOptions({ name: 'MoScroll' })
const props = defineProps(scrollProps)
const emit = defineEmits(scrollEmits)
const ns = useNamespace('scroll')
const ready = ref(!props.animated)
onMounted(() => {
  if (props.animated) requestAnimationFrame(() => requestAnimationFrame(() => (ready.value = true)))
})
const isOpen = computed(() => props.open && ready.value)
const style = computed(() => ({
  width: addUnit(props.width),
  ...(props.silk ? { '--mo-scroll-silk': props.silk } : {}),
}))
function onTransitionEnd(e: TransitionEvent) {
  if (e.target !== e.currentTarget) return
  if (isOpen.value) emit('opened')
  else emit('closed')
}
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.is('open', isOpen)]" :style="style">
    <div
      :class="[ns.e('rod'), ns.em('rod', 'start')]"
      aria-hidden="true"
      @click="emit('update:open', !open)"
    />
    <div :class="ns.e('reel')" @transitionend="onTransitionEnd">
      <div :class="ns.e('clip')">
        <div :class="ns.e('silk')">
          <div :class="ns.e('paper')">
            <div v-if="title || $slots.title" :class="ns.e('title')">
              <slot name="title">{{ title }}</slot>
            </div>
            <div :class="ns.e('content')"><slot /></div>
            <MoSeal v-if="seal" :text="seal" :size="42" :class="ns.e('seal')" />
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[ns.e('rod'), ns.em('rod', 'end')]"
      aria-hidden="true"
      @click="emit('update:open', !open)"
    />
  </div>
</template>
