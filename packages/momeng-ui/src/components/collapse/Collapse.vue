<script setup lang="ts">
import { computed, provide } from 'vue'
import { collapseContextKey, collapseEmits, collapseProps, type CollapseName } from './collapse'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoCollapse' })
const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)
const ns = useNamespace('collapse')
const activeNames = computed<CollapseName[]>(() => {
  const v = props.modelValue
  return Array.isArray(v) ? v : v === '' || v === undefined || v === null ? [] : [v]
})

function toggle(name: CollapseName) {
  let next: CollapseName[] | CollapseName
  if (props.accordion) next = activeNames.value[0] === name ? '' : name
  else {
    const list = [...activeNames.value]
    const i = list.indexOf(name)
    if (i > -1) list.splice(i, 1)
    else list.push(name)
    next = list
  }
  emit('update:modelValue', next)
  emit('change', next)
}
provide(collapseContextKey, { activeNames, toggle })
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
