<script setup lang="ts">
import { computed } from 'vue'
import { textProps } from './text'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoText' })
const props = defineProps(textProps)
const ns = useNamespace('text')

const markColor = computed(() => (props.mark === true ? 'yellow' : props.mark || ''))
const classes = computed(() => [
  ns.b(),
  props.type && ns.m(props.type),
  props.size && ns.m(`size-${props.size}`),
  props.font !== 'body' && ns.m(`font-${props.font}`),
  ns.is('bold', props.bold),
  markColor.value && [ns.is('mark', true), ns.m(`mark-${markColor.value}`)],
  ns.is('wavy', props.wavy),
  ns.is('emphasis', props.emphasis),
  ns.is('delete', props.delete),
  ns.is('truncated', props.truncated),
  ns.is('line-clamp', !!props.lineClamp),
  ns.is('vertical', props.vertical),
])
const style = computed(() =>
  props.lineClamp ? { '-webkit-line-clamp': String(props.lineClamp) } : undefined,
)
</script>

<template>
  <component :is="tag" :class="classes" :style="style"><slot /></component>
</template>
