<script setup lang="ts">
import { computed, provide } from 'vue'
import { rowContextKey, rowProps } from './grid'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoRow' })
const props = defineProps(rowProps)
const ns = useNamespace('row')
provide(rowContextKey, { gutter: computed(() => props.gutter) })
const style = computed(() =>
  props.gutter
    ? {
        marginLeft: `-${props.gutter / 2}px`,
        marginRight: `-${props.gutter / 2}px`,
        rowGap: `${props.gutter}px`,
      }
    : undefined,
)
</script>

<template>
  <component
    :is="tag"
    :class="[
      ns.b(),
      justify !== 'start' && ns.m(`justify-${justify}`),
      align && ns.m(`align-${align}`),
    ]"
    :style="style"
  >
    <slot />
  </component>
</template>
