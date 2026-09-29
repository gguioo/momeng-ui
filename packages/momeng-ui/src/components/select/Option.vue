<script setup lang="ts">
import { computed, inject, onBeforeUnmount, reactive, watchEffect } from 'vue'
import { optionProps, selectContextKey, type OptionState } from './select'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoOption' })
const props = defineProps(optionProps)
const ns = useNamespace('option')
const select = inject(selectContextKey)!

const state: OptionState = reactive({
  value: props.value,
  label: props.label ?? String(props.value),
  disabled: props.disabled,
})
watchEffect(() => {
  state.value = props.value
  state.label = props.label ?? String(props.value)
  state.disabled = props.disabled
})
select.register(state)
onBeforeUnmount(() => select.unregister(props.value))

const selected = computed(() => select.isSelected(props.value))
const visible = computed(() => select.isVisible(state.label))
</script>

<template>
  <li
    v-show="visible"
    :class="[
      ns.b(),
      ns.is('selected', selected),
      ns.is('hovered', select.isHovered(value)),
      ns.is('disabled', disabled),
    ]"
    role="option"
    :aria-selected="selected"
    :aria-disabled="disabled || undefined"
    :data-value="String(value)"
    @mouseenter="!disabled && select.hover(value)"
    @click.stop="!disabled && select.select(state)"
  >
    <span :class="ns.e('label')"
      ><slot>{{ state.label }}</slot></span
    >
    <MoIcon v-if="selected" name="check" :class="ns.e('check')" />
  </li>
</template>
