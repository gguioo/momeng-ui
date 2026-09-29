<script setup lang="ts">
import { computed } from 'vue'
import { iconProps } from './icon'
import { icons } from './icons'
import { useNamespace } from '../../composables'
import { addUnit, debugWarn } from '../../utils'

defineOptions({ name: 'MoIcon' })
const props = defineProps(iconProps)
const ns = useNamespace('icon')

const inner = computed(() => {
  if (!props.name) return ''
  const svg = (icons as Record<string, string>)[props.name]
  if (!svg) debugWarn('Icon', `未找到图标 "${props.name}"`)
  return svg ?? ''
})
const style = computed(() => ({
  fontSize: addUnit(props.size),
  color: props.color,
}))
</script>

<template>
  <i
    :class="[ns.b(), ns.is('spin', spin)]"
    :style="style"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <slot>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-html="inner"
      ></svg>
    </slot>
  </i>
</template>
