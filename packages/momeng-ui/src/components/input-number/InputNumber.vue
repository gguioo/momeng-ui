<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { inputNumberEmits, inputNumberProps } from './input-number'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'
import { clamp, getPrecision, toPrecision } from '../../utils'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoInputNumber' })
const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)
const ns = useNamespace('input-number')
const { formItem } = useFormItem()
const size = useFormSize(() => props.size)
const disabled = useFormDisabled(() => props.disabled)

const userInput = ref<string | null>(null)
const precision = computed(
  () => props.precision ?? Math.max(getPrecision(props.step), getPrecision(props.modelValue ?? 0)),
)

function normalize(v: number | null | undefined): number | null {
  if (v === null || v === undefined || Number.isNaN(v)) return null
  let n = v
  if (props.stepStrictly) n = Math.round(n / props.step) * props.step
  n = clamp(n, props.min, props.max)
  return toPrecision(n, precision.value)
}

const display = computed(() => {
  if (userInput.value !== null) return userInput.value
  const v = props.modelValue
  if (v === null || v === undefined) return ''
  return props.precision !== undefined ? v.toFixed(props.precision) : String(v)
})
const minDisabled = computed(() => disabled.value || (props.modelValue ?? 0) <= props.min)
const maxDisabled = computed(() => disabled.value || (props.modelValue ?? 0) >= props.max)

function setValue(v: number | null) {
  const old = props.modelValue
  const next = normalize(v)
  userInput.value = null
  if (next === old) return
  emit('update:modelValue', next)
  emit('change', next, old)
  if (props.validateEvent) formItem?.validate('change')
}

const step = (dir: 1 | -1) => {
  if (props.readonly || (dir > 0 ? maxDisabled.value : minDisabled.value)) return
  setValue(toPrecision((props.modelValue ?? 0) + dir * props.step, precision.value))
}

function onInput(e: Event) {
  userInput.value = (e.target as HTMLInputElement).value
}
function onChange() {
  const raw = userInput.value
  if (raw === null) return
  if (raw.trim() === '') return setValue(null)
  const n = Number(raw)
  if (Number.isNaN(n)) userInput.value = null
  else setValue(n)
}
function onBlur(e: FocusEvent) {
  onChange()
  emit('blur', e)
  if (props.validateEvent) formItem?.validate('blur')
}

watch(
  () => [props.min, props.max, props.precision],
  () => {
    if (props.modelValue === null || props.modelValue === undefined) return
    const n = normalize(props.modelValue)
    if (n !== props.modelValue) emit('update:modelValue', n)
  },
)
defineExpose({ increase: () => step(1), decrease: () => step(-1) })
</script>

<template>
  <div :class="[ns.b(), ns.m(size), ns.m(`controls-${controls}`), ns.is('disabled', disabled)]">
    <button
      v-if="controls !== 'none'"
      type="button"
      :class="[ns.e('btn'), ns.e('decrease'), ns.is('disabled', minDisabled)]"
      :disabled="minDisabled"
      aria-label="减少"
      tabindex="-1"
      @click="step(-1)"
    >
      <MoIcon :name="controls === 'right' ? 'chevron-down' : 'minus'" />
    </button>
    <input
      :id="formItem?.inputId"
      :class="ns.e('inner')"
      type="text"
      inputmode="decimal"
      role="spinbutton"
      :aria-valuenow="modelValue ?? undefined"
      :aria-valuemin="Number.isFinite(min) ? min : undefined"
      :aria-valuemax="Number.isFinite(max) ? max : undefined"
      :value="display"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      @change="onChange"
      @focus="emit('focus', $event)"
      @blur="onBlur"
      @keydown.up.prevent="step(1)"
      @keydown.down.prevent="step(-1)"
    />
    <button
      v-if="controls !== 'none'"
      type="button"
      :class="[ns.e('btn'), ns.e('increase'), ns.is('disabled', maxDisabled)]"
      :disabled="maxDisabled"
      aria-label="增加"
      tabindex="-1"
      @click="step(1)"
    >
      <MoIcon :name="controls === 'right' ? 'chevron-up' : 'plus'" />
    </button>
  </div>
</template>
