<script setup lang="ts">
import { computed } from 'vue'
import { badgeProps } from './badge'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoBadge' })
const props = defineProps(badgeProps)
const ns = useNamespace('badge')
const content = computed(() => {
  if (props.isDot) return ''
  if (typeof props.value === 'number' && props.value > props.max) return `${props.max}+`
  return String(props.value)
})
const show = computed(() => {
  if (props.hidden) return false
  if (props.isDot) return true
  if (props.value === 0 || props.value === '0') return props.showZero
  return content.value !== ''
})
const style = computed(() => ({
  ...(props.offset
    ? { marginRight: `${-props.offset[0]}px`, marginTop: `${props.offset[1]}px` }
    : {}),
  ...(props.color ? { backgroundColor: props.color } : {}),
}))
</script>

<template>
  <span :class="[ns.b(), ns.is('standalone', !$slots.default)]">
    <slot />
    <Transition name="mo-badge-pop">
      <sup v-show="show" :class="[ns.e('content'), ns.m(type), ns.is('dot', isDot)]" :style="style">
        <slot name="content" :value="content">{{ content }}</slot>
      </sup>
    </Transition>
  </span>
</template>
