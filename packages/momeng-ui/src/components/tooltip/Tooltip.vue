<script setup lang="ts">
import { ref } from 'vue'
import { tooltipEmits, tooltipProps } from './tooltip'
import MoPopper from '../popper/Popper.vue'

defineOptions({ name: 'MoTooltip' })
const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)
const popper = ref<InstanceType<typeof MoPopper>>()
defineExpose({ show: () => popper.value?.show(), hide: () => popper.value?.hide() })
</script>

<template>
  <MoPopper
    ref="popper"
    v-bind="props"
    :popper-class="['mo-tooltip', popperClass]"
    @update:visible="emit('update:visible', $event)"
    @show="emit('show')"
    @hide="emit('hide')"
  >
    <slot />
    <template #content>
      <slot name="content">{{ content }}</slot>
    </template>
  </MoPopper>
</template>
