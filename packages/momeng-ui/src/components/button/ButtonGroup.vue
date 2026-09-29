<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'
import { buttonGroupKey, buttonGroupProps } from './button'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoButtonGroup' })
const props = defineProps(buttonGroupProps)
const ns = useNamespace('button-group')
provide(buttonGroupKey, reactive({ size: toRef(props, 'size'), type: toRef(props, 'type') }))
</script>

<template>
  <div :class="ns.b()" role="group"><slot /></div>
</template>
