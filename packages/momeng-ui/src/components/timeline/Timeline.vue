<script setup lang="ts">
import { computed, type VNode, Fragment } from 'vue'
import { timelineProps } from './timeline'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoTimeline' })
const props = defineProps(timelineProps)
const slots = defineSlots<{ default?: () => VNode[] }>()
const ns = useNamespace('timeline')

const flatten = (nodes: VNode[]): VNode[] =>
  nodes.flatMap((n) =>
    n.type === Fragment && Array.isArray(n.children) ? flatten(n.children as VNode[]) : [n],
  )
const items = computed(() => {
  const list = flatten(slots.default?.() ?? [])
  return props.reverse ? [...list].reverse() : list
})
const Render = (p: { node: VNode }) => p.node
</script>

<template>
  <ul :class="[ns.b(), ns.m(mode)]">
    <Render v-for="(node, i) in items" :key="i" :node="node" />
  </ul>
</template>
