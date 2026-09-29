<script setup lang="ts">
import { computed, ref } from 'vue'
import { rateEmits, rateProps } from './rate'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'
import { clamp } from '../../utils'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoRate' })
const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)
const ns = useNamespace('rate')
const { formItem } = useFormItem()
const size = useFormSize(() => props.size)
const disabled = useFormDisabled(() => props.disabled)
const hoverValue = ref<number | null>(null)
const interactive = computed(() => !disabled.value && !props.readonly)
const current = computed(() => hoverValue.value ?? props.modelValue)
const text = computed(() => {
  const i = Math.ceil(current.value) - 1
  return i >= 0 ? (props.texts[i] ?? '') : ''
})

function fill(index: number) {
  const diff = current.value - (index - 1)
  return clamp(diff, 0, 1)
}
function pointValue(index: number, e: MouseEvent) {
  if (!props.allowHalf) return index
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  return e.clientX - rect.left < rect.width / 2 ? index - 0.5 : index
}
function onMove(index: number, e: MouseEvent) {
  if (interactive.value) hoverValue.value = pointValue(index, e)
}
function select(index: number, e: MouseEvent) {
  if (!interactive.value) return
  let v = pointValue(index, e)
  if (props.clearable && v === props.modelValue) v = 0
  emit('update:modelValue', v)
  emit('change', v)
  if (props.validateEvent) formItem?.validate('change')
}
function onKeydown(e: KeyboardEvent) {
  if (!interactive.value) return
  const step = props.allowHalf ? 0.5 : 1
  let v = props.modelValue
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v += step
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v -= step
  else return
  e.preventDefault()
  v = clamp(v, 0, props.max)
  emit('update:modelValue', v)
  emit('change', v)
}
</script>

<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('disabled', disabled), ns.is('readonly', readonly)]"
    :style="color ? { '--mo-rate-color': color } : undefined"
    role="slider"
    :tabindex="interactive ? 0 : -1"
    :aria-valuenow="modelValue"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuetext="text || `${modelValue} / ${max}`"
    @keydown="onKeydown"
    @mouseleave="hoverValue = null"
  >
    <span
      v-for="i in max"
      :key="i"
      :class="[
        ns.e('item'),
        ns.is('active', fill(i) > 0),
        ns.is('hover', hoverValue !== null && fill(i) > 0),
      ]"
      @mousemove="onMove(i, $event)"
      @click="select(i, $event)"
    >
      <MoIcon :name="icon" :class="ns.e('void')" />
      <span :class="ns.e('fill')" :style="{ width: `${fill(i) * 100}%` }">
        <MoIcon :name="icon" />
      </span>
    </span>
    <span v-if="showText" :class="ns.e('text')">{{ text }}</span>
  </div>
</template>
