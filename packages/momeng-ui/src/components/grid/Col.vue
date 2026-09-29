<script setup lang="ts">
import { computed, inject } from 'vue'
import { colProps, rowContextKey } from './grid'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoCol' })
const props = defineProps(colProps)
const ns = useNamespace('col')
const row = inject(rowContextKey, undefined)

const classes = computed(() => {
  const list: string[] = [ns.b(), `mo-col-${props.span}`]
  if (props.offset) list.push(`mo-col-offset-${props.offset}`)
  if (props.push) list.push(`mo-col-push-${props.push}`)
  if (props.pull) list.push(`mo-col-pull-${props.pull}`)
  for (const bp of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
    const v = props[bp]
    if (typeof v === 'number') list.push(`mo-col-${bp}-${v}`)
    else if (v) {
      if (v.span !== undefined) list.push(`mo-col-${bp}-${v.span}`)
      if (v.offset) list.push(`mo-col-${bp}-offset-${v.offset}`)
    }
  }
  return list
})
const style = computed(() => {
  const g = row?.gutter.value
  return g ? { paddingLeft: `${g / 2}px`, paddingRight: `${g / 2}px` } : undefined
})
</script>

<template>
  <component :is="tag" :class="classes" :style="style"><slot /></component>
</template>
