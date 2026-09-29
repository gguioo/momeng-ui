<script setup lang="ts">
import { computed, nextTick, onMounted, ref, shallowRef, useAttrs, watch } from 'vue'
import { inputEmits, inputProps } from './input'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoInput', inheritAttrs: false })
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const attrs = useAttrs()
const ns = useNamespace('input')
const { formItem } = useFormItem()
const size = useFormSize(() => props.size)
const disabled = useFormDisabled(() => props.disabled)

const inputRef = shallowRef<HTMLInputElement | HTMLTextAreaElement>()
const focused = ref(false)
const hovering = ref(false)
const passwordVisible = ref(false)
const isComposing = ref(false)

const isTextarea = computed(() => props.type === 'textarea')
const nativeValue = computed(() =>
  props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue),
)
const textLength = computed(() => Array.from(nativeValue.value).length)
const showClear = computed(
  () =>
    props.clearable &&
    !disabled.value &&
    !props.readonly &&
    !!nativeValue.value &&
    (focused.value || hovering.value),
)
const showPwdToggle = computed(() => props.showPassword && !disabled.value && !props.readonly)
const inputType = computed(() =>
  props.showPassword ? (passwordVisible.value ? 'text' : 'password') : props.type,
)
const showLimit = computed(
  () => props.showWordLimit && props.maxlength !== undefined && !disabled.value,
)
const inputId = computed(() => props.id ?? formItem?.inputId)

function setNativeValue() {
  const el = inputRef.value
  if (el && el.value !== nativeValue.value) el.value = nativeValue.value
}

function onInput(e: Event) {
  if (isComposing.value) return
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
  nextTick(setNativeValue)
  if (isTextarea.value && props.autosize) nextTick(resizeTextarea)
}
function onChange(e: Event) {
  emit('change', (e.target as HTMLInputElement).value)
  if (props.validateEvent) formItem?.validate('change')
}
function onFocus(e: FocusEvent) {
  focused.value = true
  emit('focus', e)
}
function onBlur(e: FocusEvent) {
  focused.value = false
  emit('blur', e)
  if (props.validateEvent) formItem?.validate('blur')
}
function onCompositionEnd(e: Event) {
  isComposing.value = false
  onInput(e)
}
function clear() {
  emit('update:modelValue', '')
  emit('input', '')
  emit('change', '')
  emit('clear')
  if (props.validateEvent) formItem?.validate('change')
  inputRef.value?.focus()
}

// —— textarea 自适应高度 ——
const textareaStyle = ref<Record<string, string>>({})
function resizeTextarea() {
  const el = inputRef.value as HTMLTextAreaElement | undefined
  if (!el || !isTextarea.value || !props.autosize) return
  const { minRows = 2, maxRows = Infinity } =
    typeof props.autosize === 'object' ? props.autosize : {}
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24
  const padding =
    parseFloat(getComputedStyle(el).paddingTop) + parseFloat(getComputedStyle(el).paddingBottom)
  el.style.height = 'auto'
  const height = Math.min(
    Math.max(el.scrollHeight, minRows * lineHeight + padding),
    maxRows * lineHeight + padding,
  )
  textareaStyle.value = {
    height: `${height}px`,
    overflowY: el.scrollHeight > height ? 'auto' : 'hidden',
  }
  el.style.height = ''
}

watch(nativeValue, () => {
  setNativeValue()
  nextTick(resizeTextarea)
})
onMounted(() => {
  setNativeValue()
  resizeTextarea()
})

defineExpose({
  ref: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  clear,
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('textarea', isTextarea),
      ns.is('disabled', disabled),
      ns.is('focus', focused),
      ns.is('group', !!($slots.prepend || $slots.append)),
      attrs.class as any,
    ]"
    :style="attrs.style as any"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="!isTextarea">
      <div v-if="$slots.prepend" :class="ns.e('prepend')"><slot name="prepend" /></div>
      <div :class="ns.e('wrapper')">
        <span v-if="prefixIcon || $slots.prefix" :class="ns.e('prefix')">
          <slot name="prefix"><MoIcon :name="prefixIcon" /></slot>
        </span>
        <input
          :id="inputId"
          ref="inputRef"
          v-bind="{ ...attrs, class: undefined, style: undefined }"
          :class="ns.e('inner')"
          :type="inputType"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :autocomplete="autocomplete"
          :name="name"
          :autofocus="autofocus"
          :aria-label="ariaLabel"
          :aria-invalid="formItem?.validateState === 'error' || undefined"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="emit('keydown', $event)"
          @compositionstart="isComposing = true"
          @compositionend="onCompositionEnd"
        />
        <span
          v-if="showClear || showPwdToggle || showLimit || suffixIcon || $slots.suffix"
          :class="ns.e('suffix')"
        >
          <button
            v-if="showClear"
            type="button"
            :class="ns.e('clear')"
            aria-label="清空"
            tabindex="-1"
            @mousedown.prevent
            @click="clear"
          >
            <MoIcon name="close" />
          </button>
          <button
            v-if="showPwdToggle"
            type="button"
            :class="ns.e('password')"
            :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
            @mousedown.prevent
            @click="passwordVisible = !passwordVisible"
          >
            <MoIcon :name="passwordVisible ? 'eye' : 'eye-off'" />
          </button>
          <span v-if="showLimit" :class="ns.e('count')">{{ textLength }}/{{ maxlength }}</span>
          <slot name="suffix"><MoIcon v-if="suffixIcon" :name="suffixIcon" /></slot>
        </span>
      </div>
      <div v-if="$slots.append" :class="ns.e('append')"><slot name="append" /></div>
    </template>

    <template v-else>
      <textarea
        :id="inputId"
        ref="inputRef"
        v-bind="{ ...attrs, class: undefined, style: undefined }"
        :class="[ns.e('textarea'), ns.is('lined', lined)]"
        :style="{ ...textareaStyle, resize }"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :name="name"
        :autofocus="autofocus"
        :aria-label="ariaLabel"
        :aria-invalid="formItem?.validateState === 'error' || undefined"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="emit('keydown', $event)"
        @compositionstart="isComposing = true"
        @compositionend="onCompositionEnd"
      ></textarea>
      <span v-if="showLimit" :class="[ns.e('count'), ns.e('count--textarea')]"
        >{{ textLength }}/{{ maxlength }}</span
      >
    </template>
  </div>
</template>
