<script setup lang="ts">
import { computed, provide } from 'vue'
import { configProviderProps } from './config-provider'
import { configProviderKey, useNamespace } from '../../composables'

defineOptions({ name: 'MoConfigProvider' })
const props = defineProps(configProviderProps)
const ns = useNamespace('config-provider')

provide(
  configProviderKey,
  computed(() => ({ size: props.size, zIndex: props.zIndex, tidy: props.tidy })),
)

const style = computed(() => {
  if (!props.tokens) return undefined
  return Object.fromEntries(
    Object.entries(props.tokens).map(([k, v]) => [`--mo-${k.replace(/^--mo-/, '')}`, v]),
  )
})
</script>

<template>
  <component :is="tag" :class="[ns.b(), { 'mo-tidy': tidy }]" :data-mo-theme="theme" :style="style">
    <slot />
  </component>
</template>
