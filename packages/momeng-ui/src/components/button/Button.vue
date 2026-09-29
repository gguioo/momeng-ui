<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { buttonEmits, buttonGroupKey, buttonProps } from './button'
import { useNamespace, useSize } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoButton' })
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slots = defineSlots<{ default?: () => any; icon?: () => any }>()
const ns = useNamespace('button')
const group = inject(buttonGroupKey, undefined)

const size = useSize(
  () => props.size,
  () => group?.size,
)
const type = computed(() => props.type ?? group?.type ?? 'default')
const isDisabled = computed(() => props.disabled || props.loading)
const buttonRef = ref<HTMLElement>()

const classes = computed(() => [
  ns.b(),
  ns.m(type.value),
  ns.m(size.value),
  ns.is('plain', props.plain),
  ns.is('text', props.text),
  ns.is('dashed', props.dashed),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('block', props.block),
  ns.is('loading', props.loading),
  ns.is('disabled', isDisabled.value),
  ns.is('icon-only', !!(props.icon || props.loading) && !slots.default),
])

function handleClick(evt: MouseEvent) {
  if (isDisabled.value) {
    evt.preventDefault()
    return
  }
  emit('click', evt)
}

defineExpose({ ref: buttonRef, size, type, disabled: isDisabled })
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    :class="classes"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="tag === 'button' ? isDisabled : undefined"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <MoIcon v-if="loading" name="loading" spin :class="ns.e('icon')" />
    <MoIcon v-else-if="icon" :name="icon" :class="ns.e('icon')" />
    <span v-else-if="$slots.icon" :class="ns.e('icon')"><slot name="icon" /></span>
    <span v-if="$slots.default" :class="ns.e('text')"><slot /></span>
  </component>
</template>
