<script setup lang="ts">
import { provide, reactive } from 'vue'
import {
  formContextKey,
  formEmits,
  formProps,
  type FormItemContext,
  type FormValidateResult,
} from './form'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoForm' })
const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const ns = useNamespace('form')
const fields: FormItemContext[] = []

const filterFields = (propsList?: string | string[]) => {
  if (!propsList) return fields
  const list = Array.isArray(propsList) ? propsList : [propsList]
  return fields.filter((f) => f.prop && list.includes(f.prop))
}

/** 校验整个表单（或指定字段），返回 { valid, errors } */
async function validate(propsList?: string | string[]): Promise<FormValidateResult> {
  const targets = filterFields(propsList).filter((f) => f.prop)
  const results = await Promise.all(targets.map((f) => f.validate()))
  const errors: Record<string, string> = {}
  targets.forEach((f, i) => {
    if (!results[i])
      errors[f.prop!] = f.$el?.querySelector('.mo-form-item__error')?.textContent?.trim() ?? ''
  })
  const valid = results.every(Boolean)
  if (!valid && props.scrollToError) {
    const first = targets.find((_, i) => !results[i])
    first?.$el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return { valid, errors }
}
const validateField = (prop: string | string[]) => validate(prop)
const resetFields = (propsList?: string | string[]) =>
  filterFields(propsList).forEach((f) => f.resetField())
const clearValidate = (propsList?: string | string[]) =>
  filterFields(propsList).forEach((f) => f.clearValidate())

provide(
  formContextKey,
  reactive({
    props,
    addField: (f: FormItemContext) => fields.push(f),
    removeField: (f: FormItemContext) => {
      const i = fields.indexOf(f)
      if (i > -1) fields.splice(i, 1)
    },
    emitValidate: (prop: string, valid: boolean, message: string | null) =>
      emit('validate', prop, valid, message),
  }),
)

defineExpose({ validate, validateField, resetFields, clearValidate })
</script>

<template>
  <form
    :class="[ns.b(), ns.m(`label-${labelPosition}`), ns.is('inline', inline)]"
    novalidate
    @submit.prevent
  >
    <slot />
  </form>
</template>
