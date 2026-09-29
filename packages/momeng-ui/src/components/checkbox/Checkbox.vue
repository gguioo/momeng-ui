<script setup lang="ts">
import { computed, inject } from 'vue'
import { checkboxEmits, checkboxGroupKey, checkboxProps } from './checkbox'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'

defineOptions({ name: 'MoCheckbox' })
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const ns = useNamespace('checkbox')
const group = inject(checkboxGroupKey, undefined)
const { formItem } = useFormItem()
const size = useFormSize(
  () => props.size,
  () => group?.size.value,
)

const groupValue = computed(() => props.value ?? props.label)
const displayLabel = computed(
  () =>
    props.label ??
    (group && (typeof props.value === 'string' || typeof props.value === 'number')
      ? props.value
      : undefined),
)
const checked = computed(() => {
  if (group) return group.modelValue.value.includes(groupValue.value as any)
  return props.modelValue === props.trueValue
})
const limitDisabled = computed(() => {
  if (!group) return false
  const len = group.modelValue.value.length
  return (
    (!checked.value && group.max.value !== undefined && len >= group.max.value) ||
    (checked.value && group.min.value !== undefined && len <= group.min.value)
  )
})
const disabled = useFormDisabled(
  () => props.disabled,
  () => group?.disabled.value || limitDisabled.value,
)

function onChange(e: Event) {
  if (disabled.value) return
  if (group) {
    group.toggle(groupValue.value as any)
    return
  }
  const value = (e.target as HTMLInputElement).checked ? props.trueValue : props.falseValue
  emit('update:modelValue', value)
  emit('change', value)
  if (props.validateEvent) formItem?.validate('change')
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('checked', checked),
      ns.is('indeterminate', indeterminate),
      ns.is('disabled', disabled),
      ns.is('bordered', border),
    ]"
  >
    <span :class="ns.e('input')">
      <input
        :class="ns.e('original')"
        type="checkbox"
        :name="name"
        :checked="checked"
        :disabled="disabled"
        :aria-checked="indeterminate ? 'mixed' : checked"
        @change="onChange"
      />
      <span :class="ns.e('box')" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="indeterminate" :class="ns.e('mark')" d="M6 12.4c4-.4 8-.3 12 .1" />
          <path
            v-else
            :class="ns.e('mark')"
            d="M4.8 12.6c1.8 1.4 3.3 3 4.6 5.1 2.8-5 6.4-9.2 11.2-12.6"
          />
        </svg>
      </span>
    </span>
    <span v-if="$slots.default || displayLabel !== undefined" :class="ns.e('label')"
      ><slot>{{ displayLabel }}</slot></span
    >
  </label>
</template>
