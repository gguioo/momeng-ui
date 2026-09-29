<script setup lang="ts">
import { provide, ref } from 'vue'
import { stepsContextKey, stepsProps } from './steps'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoSteps' })
const props = defineProps(stepsProps)
const ns = useNamespace('steps')
const steps = ref<number[]>([])
provide(stepsContextKey, {
  props,
  steps,
  register: (uid) => steps.value.push(uid),
  unregister: (uid) => {
    const i = steps.value.indexOf(uid)
    if (i > -1) steps.value.splice(i, 1)
  },
})
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.is('center', alignCenter)]" role="list"><slot /></div>
</template>
