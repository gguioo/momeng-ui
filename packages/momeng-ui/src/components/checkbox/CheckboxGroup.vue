<script setup lang="ts">
import { provide, toRef } from 'vue'
import {
  checkboxGroupEmits,
  checkboxGroupKey,
  checkboxGroupProps,
  type CheckboxValue,
} from './checkbox'
import { useNamespace } from '../../composables'
import { useFormItem } from '../form/useFormItem'

defineOptions({ name: 'MoCheckboxGroup' })
const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)
const ns = useNamespace('checkbox-group')
const { formItem } = useFormItem()

function toggle(value: CheckboxValue) {
  const list = [...props.modelValue]
  const i = list.indexOf(value)
  if (i > -1) list.splice(i, 1)
  else list.push(value)
  emit('update:modelValue', list)
  emit('change', list)
  if (props.validateEvent) formItem?.validate('change')
}

provide(checkboxGroupKey, {
  modelValue: toRef(props, 'modelValue'),
  disabled: toRef(props, 'disabled'),
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  size: toRef(props, 'size'),
  toggle,
})
</script>

<template>
  <div :class="[ns.b(), ns.m(direction)]" role="group" :aria-labelledby="formItem?.labelId">
    <slot />
  </div>
</template>
