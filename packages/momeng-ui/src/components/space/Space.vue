<script setup lang="ts">
import { computed } from 'vue'
import { spaceProps, type SpaceSize } from './space'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoSpace' })
const props = defineProps(spaceProps)
const ns = useNamespace('space')
const map = { small: 8, default: 12, large: 20 } as const
const toPx = (s: SpaceSize) => `${typeof s === 'number' ? s : map[s]}px`

const style = computed(() => {
  const [col, row] = Array.isArray(props.size) ? props.size : [props.size, props.size]
  const alignMap: Record<string, string> = { start: 'flex-start', end: 'flex-end' }
  return {
    columnGap: toPx(col),
    rowGap: toPx(row),
    alignItems: props.align
      ? (alignMap[props.align] ?? props.align)
      : props.direction === 'horizontal'
        ? 'center'
        : undefined,
    justifyContent: props.justify ? (alignMap[props.justify] ?? props.justify) : undefined,
  }
})
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.is('wrap', wrap), ns.is('fill', fill)]" :style="style">
    <slot />
  </div>
</template>
