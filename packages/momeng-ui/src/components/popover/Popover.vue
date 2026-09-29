<script setup lang="ts">
import { computed, ref } from 'vue'
import { popoverEmits, popoverProps } from './popover'
import { useNamespace } from '../../composables'
import { addUnit } from '../../utils'
import MoPopper from '../popper/Popper.vue'

defineOptions({ name: 'MoPopover' })
const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)
const ns = useNamespace('popover')
const popper = ref<InstanceType<typeof MoPopper>>()
const forward = computed(() => {
  const { title: _t, content: _c, width: _w, ...rest } = props
  return rest
})
defineExpose({ show: () => popper.value?.show(), hide: () => popper.value?.hide() })
</script>

<template>
  <MoPopper
    ref="popper"
    v-bind="forward"
    :popper-class="[ns.b(), popperClass]"
    :popper-style="[{ width: addUnit(width) }, popperStyle]"
    @update:visible="emit('update:visible', $event)"
    @show="emit('show')"
    @hide="emit('hide')"
  >
    <slot name="reference"><slot /></slot>
    <template #content>
      <div v-if="title || $slots.title" :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="ns.e('content')">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </MoPopper>
</template>
