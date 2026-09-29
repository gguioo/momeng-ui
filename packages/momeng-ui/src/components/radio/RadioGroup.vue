<script setup lang="ts">
import { provide, toRef } from 'vue'
import { radioGroupEmits, radioGroupKey, radioGroupProps, type RadioValue } from './radio'
import { useId, useNamespace } from '../../composables'
import { useFormItem } from '../form/useFormItem'

defineOptions({ name: 'MoRadioGroup' })
const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)
const ns = useNamespace('radio-group')
const { formItem } = useFormItem()
const autoName = useId('mo-radio')

provide(radioGroupKey, {
  modelValue: toRef(props, 'modelValue'),
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  type: toRef(props, 'type'),
  name: toRef(() => props.name ?? autoName),
  select: (v: RadioValue) => {
    if (v === props.modelValue) return
    emit('update:modelValue', v)
    emit('change', v)
    if (props.validateEvent) formItem?.validate('change')
  },
})
</script>

<template>
  <div
    :class="[ns.b(), ns.m(direction), ns.m(type)]"
    role="radiogroup"
    :aria-labelledby="formItem?.labelId"
  >
    <slot />
  </div>
</template>
