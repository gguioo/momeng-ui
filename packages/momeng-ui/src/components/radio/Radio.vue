<script setup lang="ts">
import { computed, inject } from 'vue'
import { radioEmits, radioGroupKey, radioProps } from './radio'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'

defineOptions({ name: 'MoRadio' })
const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)
const ns = useNamespace('radio')
const group = inject(radioGroupKey, undefined)
const { formItem } = useFormItem()
const size = useFormSize(
  () => props.size,
  () => group?.size.value,
)
const disabled = useFormDisabled(
  () => props.disabled,
  () => group?.disabled.value,
)

const ownValue = computed(() => props.value ?? props.label)
const checked = computed(
  () => (group ? group.modelValue.value : props.modelValue) === ownValue.value,
)
const isButton = computed(() => group?.type.value === 'button')

function onChange() {
  if (disabled.value || ownValue.value === undefined) return
  if (group) return group.select(ownValue.value)
  emit('update:modelValue', ownValue.value)
  emit('change', ownValue.value)
  formItem?.validate('change')
}
</script>

<template>
  <label
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('checked', checked),
      ns.is('disabled', disabled),
      ns.is('bordered', border),
      ns.is('button', isButton),
    ]"
  >
    <input
      :class="ns.e('original')"
      type="radio"
      :name="group?.name.value ?? name"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <span v-if="!isButton" :class="ns.e('dot')" aria-hidden="true" />
    <span :class="ns.e('label')"
      ><slot>{{ label ?? (typeof value === 'boolean' ? '' : value) }}</slot></span
    >
  </label>
</template>
