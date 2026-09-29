<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  useSlots,
  watch,
} from 'vue'
import {
  formContextKey,
  formItemContextKey,
  formItemProps,
  type FormItemContext,
  type ValidateState,
} from './form'
import { getByPath, setByPath, validateRules, type FormRule, type RuleTrigger } from './validator'
import { useId, useNamespace } from '../../composables'
import { addUnit } from '../../utils'

defineOptions({ name: 'MoFormItem' })
const props = defineProps(formItemProps)
const ns = useNamespace('form-item')
const form = inject(formContextKey, undefined)
const instance = getCurrentInstance()
const slots = useSlots()

const validateState = ref<ValidateState>('')
const validateMessage = ref('')
const inputId = useId('mo-field')
const labelId = `${inputId}-label`
let initialValue: unknown

const fieldValue = computed(() =>
  form?.props.model && props.prop ? getByPath(form.props.model, props.prop) : undefined,
)

const rules = computed<FormRule[]>(() => {
  const list: FormRule[] = []
  const own = props.rules
  if (own) list.push(...(Array.isArray(own) ? own : [own]))
  const formRules = props.prop ? form?.props.rules?.[props.prop] : undefined
  if (formRules) list.push(...(Array.isArray(formRules) ? formRules : [formRules]))
  if (props.required !== undefined) {
    const hasRequired = list.some((r) => r.required)
    if (props.required && !hasRequired) list.unshift({ required: true })
  }
  return list
})
const isRequired = computed(() => props.required ?? rules.value.some((r) => r.required))

const labelStyle = computed(() => {
  const w = props.labelWidth ?? form?.props.labelWidth
  if (!w || form?.props.labelPosition === 'top') return undefined
  return { width: addUnit(w) }
})

const contentStyle = computed(() => {
  if (props.label || slots.label) return undefined
  const w = props.labelWidth ?? form?.props.labelWidth
  if (!w || form?.props.labelPosition === 'top' || form?.props.inline) return undefined
  return { marginLeft: addUnit(w) }
})

const hasTrigger = (rule: FormRule, trigger?: RuleTrigger) => {
  if (!trigger || !rule.trigger) return true
  return Array.isArray(rule.trigger) ? rule.trigger.includes(trigger) : rule.trigger === trigger
}

async function validate(trigger?: RuleTrigger) {
  const active = rules.value.filter((r) => hasTrigger(r, trigger))
  if (!active.length) return true
  validateState.value = 'validating'
  const msg = await validateRules(fieldValue.value, active, props.label ?? '此项')
  validateState.value = msg ? 'error' : 'success'
  validateMessage.value = msg ?? ''
  props.prop && form?.emitValidate(props.prop, !msg, msg)
  return !msg
}

function clearValidate() {
  validateState.value = ''
  validateMessage.value = ''
}
function resetField() {
  if (form?.props.model && props.prop) {
    setByPath(
      form.props.model,
      props.prop,
      Array.isArray(initialValue) ? [...initialValue] : initialValue,
    )
  }
  nextTick(clearValidate)
}

watch(
  () => props.error,
  (v) => {
    validateMessage.value = v ?? ''
    validateState.value = v ? 'error' : ''
  },
  { immediate: true },
)

const context: FormItemContext = reactive({
  prop: toRef(props, 'prop'),
  inputId,
  labelId,
  size: toRef(props, 'size'),
  validateState,
  validate,
  resetField,
  clearValidate,
  $el: undefined as HTMLElement | undefined,
}) as FormItemContext
provide(formItemContextKey, context)

onMounted(() => {
  initialValue = Array.isArray(fieldValue.value) ? [...fieldValue.value] : fieldValue.value
  context.$el = instance?.proxy?.$el as HTMLElement
  if (props.prop) form?.addField(context)
})
onBeforeUnmount(() => form?.removeField(context))

const showMessage = computed(() => props.showMessage && (form?.props.showMessage ?? true))
defineExpose({ validate, resetField, clearValidate, validateState, validateMessage })
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('required', isRequired && !form?.props.hideRequiredAsterisk),
      ns.is('error', validateState === 'error'),
      ns.is('success', validateState === 'success'),
      ns.is('validating', validateState === 'validating'),
    ]"
  >
    <label
      v-if="label || $slots.label"
      :id="labelId"
      :for="inputId"
      :class="ns.e('label')"
      :style="labelStyle"
    >
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div :class="ns.e('content')" :style="contentStyle">
      <slot />
      <Transition name="mo-form-error">
        <div v-if="showMessage && validateState === 'error'" :class="ns.e('error')" role="alert">
          <slot name="error" :error="validateMessage">{{ validateMessage }}</slot>
        </div>
      </Transition>
    </div>
  </div>
</template>
