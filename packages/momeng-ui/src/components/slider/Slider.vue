<script setup lang="ts">
import { computed, ref } from 'vue'
import { sliderEmits, sliderProps } from './slider'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'
import { clamp, getPrecision, toPrecision } from '../../utils'

defineOptions({ name: 'MoSlider' })
const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)
const ns = useNamespace('slider')
const { formItem } = useFormItem()
const size = useFormSize(() => props.size)
const disabled = useFormDisabled(() => props.disabled)

const trackRef = ref<HTMLElement>()
const dragging = ref<number | null>(null)
const focused = ref<number | null>(null)

const values = computed<number[]>(() => {
  const v = props.modelValue
  if (props.range) return Array.isArray(v) ? [v[0], v[1]] : [props.min, props.max]
  return [typeof v === 'number' ? v : props.min]
})
const span = computed(() => props.max - props.min || 1)
const percent = (v: number) => ((clamp(v, props.min, props.max) - props.min) / span.value) * 100
const barStyle = computed(() => {
  const [a, b] = props.range
    ? [...values.value].sort((x, y) => x - y)
    : [props.min, values.value[0]]
  return { left: `${percent(a)}%`, width: `${percent(b) - percent(a)}%` }
})
const stops = computed(() => {
  if (!props.showStops || props.step <= 0) return []
  const count = Math.floor(span.value / props.step)
  if (count > 100) return []
  return Array.from({ length: count - 1 }, (_, i) => ((i + 1) * props.step * 100) / span.value)
})
const markList = computed(() =>
  Object.entries(props.marks ?? {}).map(([k, label]) => ({
    value: Number(k),
    label,
    pos: percent(Number(k)),
  })),
)
const format = (v: number) => (props.formatTooltip ? props.formatTooltip(v) : v)

function snap(v: number) {
  const stepped = Math.round((v - props.min) / props.step) * props.step + props.min
  return toPrecision(clamp(stepped, props.min, props.max), getPrecision(props.step))
}

function output(list: number[], commit = false) {
  const value: number | [number, number] = props.range
    ? ([Math.min(list[0], list[1]), Math.max(list[0], list[1])] as [number, number])
    : list[0]
  emit('update:modelValue', value)
  emit('input', value)
  if (commit) {
    emit('change', value)
    if (props.validateEvent) formItem?.validate('change')
  }
}

function setThumb(index: number, raw: number, commit = false) {
  const list = [...values.value]
  list[index] = snap(raw)
  output(list, commit)
}

function valueFromPointer(e: PointerEvent) {
  const rect = trackRef.value!.getBoundingClientRect()
  return props.min + ((e.clientX - rect.left) / rect.width) * span.value
}

function onTrackDown(e: PointerEvent) {
  if (disabled.value || !trackRef.value) return
  const v = valueFromPointer(e)
  let index = 0
  if (props.range) index = Math.abs(v - values.value[0]) <= Math.abs(v - values.value[1]) ? 0 : 1
  setThumb(index, v)
  startDrag(index, e)
}

function startDrag(index: number, e: PointerEvent) {
  if (disabled.value) return
  e.preventDefault()
  dragging.value = index
  const move = (ev: PointerEvent) => setThumb(index, valueFromPointer(ev))
  const up = () => {
    dragging.value = null
    output(values.value, true)
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

function onKeydown(index: number, e: KeyboardEvent) {
  if (disabled.value) return
  const v = values.value[index]
  const big = props.step * 10
  const map: Record<string, number> = {
    ArrowRight: v + props.step,
    ArrowUp: v + props.step,
    ArrowLeft: v - props.step,
    ArrowDown: v - props.step,
    PageUp: v + big,
    PageDown: v - big,
    Home: props.min,
    End: props.max,
  }
  if (e.key in map) {
    e.preventDefault()
    setThumb(index, map[e.key], true)
  }
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('dragging', dragging !== null),
      ns.is('marked', !!markList.length),
    ]"
  >
    <div ref="trackRef" :class="ns.e('track')" @pointerdown="onTrackDown">
      <div :class="ns.e('bar')" :style="barStyle" />
      <span v-for="s in stops" :key="s" :class="ns.e('stop')" :style="{ left: `${s}%` }" />
      <span
        v-for="m in markList"
        :key="m.value"
        :class="[ns.e('stop'), ns.e('mark-dot')]"
        :style="{ left: `${m.pos}%` }"
      />
      <div
        v-for="(v, i) in values"
        :key="i"
        :class="[ns.e('thumb'), ns.is('active', dragging === i || focused === i)]"
        :style="{ left: `${percent(v)}%` }"
        role="slider"
        :tabindex="disabled ? -1 : 0"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="v"
        :aria-label="ariaLabel"
        :aria-disabled="disabled || undefined"
        @pointerdown.stop="startDrag(i, $event)"
        @keydown="onKeydown(i, $event)"
        @focus="focused = i"
        @blur="focused = null"
      >
        <span v-if="showTooltip" :class="ns.e('tooltip')">{{ format(v) }}</span>
      </div>
    </div>
    <div v-if="markList.length" :class="ns.e('marks')">
      <span
        v-for="m in markList"
        :key="m.value"
        :class="ns.e('mark')"
        :style="{ left: `${m.pos}%` }"
        >{{ m.label }}</span
      >
    </div>
  </div>
</template>
