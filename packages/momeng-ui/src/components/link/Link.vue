<script setup lang="ts">
import { linkEmits, linkProps } from './link'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoLink' })
const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)
const ns = useNamespace('link')

function onClick(e: MouseEvent) {
  if (props.disabled) {
    e.preventDefault()
    return
  }
  emit('click', e)
}
</script>

<template>
  <a
    :class="[ns.b(), ns.m(type), ns.m(`underline-${underline}`), ns.is('disabled', disabled)]"
    :href="disabled ? undefined : href"
    :target="disabled ? undefined : target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled || undefined"
    @click="onClick"
  >
    <MoIcon v-if="icon" :name="icon" />
    <span :class="ns.e('inner')"><slot /></span>
  </a>
</template>
