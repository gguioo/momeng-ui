<script setup lang="ts">
import { computed, nextTick, provide, reactive, ref, watch } from 'vue'
import {
  selectContextKey,
  selectEmits,
  selectProps,
  type OptionState,
  type SelectValue,
} from './select'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'
import MoPopper from '../popper/Popper.vue'
import MoOption from './Option.vue'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoSelect' })
const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)
const ns = useNamespace('select')
const { formItem } = useFormItem()
const size = useFormSize(() => props.size)
const disabled = useFormDisabled(() => props.disabled)

const popper = ref<InstanceType<typeof MoPopper>>()
const filterInput = ref<HTMLInputElement>()
const visible = ref(false)
const hovering = ref(false)
const query = ref('')
const hovered = ref<SelectValue>()
const options = reactive(new Map<SelectValue, OptionState>())

const values = computed<SelectValue[]>(() => {
  const v = props.modelValue
  if (props.multiple) return Array.isArray(v) ? v : []
  return v === undefined || v === null || v === '' ? [] : [v as SelectValue]
})
const selectedOptions = computed(() =>
  values.value.map((v) => options.get(v) ?? { value: v, label: String(v), disabled: false }),
)
const optionList = computed(() => Array.from(options.values()))
const visibleOptions = computed(() => optionList.value.filter((o) => ctx.isVisible(o.label)))
const inputPlaceholder = computed(() =>
  props.multiple
    ? values.value.length
      ? ''
      : props.placeholder
    : (selectedOptions.value[0]?.label ?? props.placeholder),
)
const showClear = computed(
  () => props.clearable && !disabled.value && hovering.value && values.value.length > 0,
)
const emptyText = computed(() => {
  if (!optionList.value.length) return props.noDataText
  if (!visibleOptions.value.length) return props.noMatchText
  return ''
})

function emitValue(v: any) {
  emit('update:modelValue', v)
  emit('change', v)
  if (props.validateEvent) formItem?.validate('change')
}

const ctx = {
  isSelected: (v: SelectValue) => values.value.includes(v),
  isHovered: (v: SelectValue) => hovered.value === v,
  isVisible: (label: string) =>
    !props.filterable ||
    !query.value ||
    label.toLowerCase().includes(query.value.trim().toLowerCase()),
  hover: (v: SelectValue) => (hovered.value = v),
  register: (o: OptionState) => options.set(o.value, o),
  unregister: (v: SelectValue) => options.delete(v),
  select(option: OptionState) {
    if (props.multiple) {
      const list = [...values.value]
      const i = list.indexOf(option.value)
      if (i > -1) list.splice(i, 1)
      else if (!props.multipleLimit || list.length < props.multipleLimit) list.push(option.value)
      emitValue(list)
      if (props.filterable) {
        query.value = ''
        filterInput.value?.focus()
      }
    } else {
      if (option.value !== props.modelValue) emitValue(option.value)
      close()
    }
  },
}
provide(selectContextKey, ctx)

function open() {
  if (disabled.value) return
  popper.value?.show()
}
function close() {
  popper.value?.hide()
}
function toggle() {
  if (disabled.value) return
  visible.value ? close() : open()
}
function clear() {
  emitValue(props.multiple ? [] : null)
  emit('clear')
}
function removeTag(v: SelectValue) {
  if (disabled.value) return
  emitValue(values.value.filter((x) => x !== v))
  emit('remove-tag', v)
}

function onKeydown(e: KeyboardEvent) {
  if (disabled.value) return
  const list = visibleOptions.value.filter((o) => !o.disabled)
  const idx = list.findIndex((o) => o.value === hovered.value)
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowUp': {
      e.preventDefault()
      if (!visible.value) return open()
      if (!list.length) return
      const next =
        e.key === 'ArrowDown' ? (idx + 1) % list.length : (idx - 1 + list.length) % list.length
      hovered.value = list[next].value
      break
    }
    case 'Enter':
    case ' ':
      if (e.key === ' ' && props.filterable) return
      e.preventDefault()
      if (!visible.value) return open()
      if (idx > -1) ctx.select(list[idx])
      break
    case 'Escape':
      close()
      break
    case 'Backspace':
      if (props.multiple && props.filterable && !query.value && values.value.length) {
        removeTag(values.value[values.value.length - 1])
      }
      break
  }
}

watch(visible, (v) => {
  emit('visible-change', v)
  if (v) {
    hovered.value = values.value[0] ?? visibleOptions.value.find((o) => !o.disabled)?.value
    if (props.filterable) nextTick(() => filterInput.value?.focus())
  } else {
    query.value = ''
    if (props.validateEvent) formItem?.validate('blur')
  }
})
watch(query, () => {
  if (props.filterable && !visible.value && query.value) open()
  hovered.value = visibleOptions.value.find((o) => !o.disabled)?.value
})

defineExpose({ open, close, focus: () => filterInput.value?.focus() })
</script>

<template>
  <MoPopper
    ref="popper"
    v-model:visible="visible"
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('open', visible),
      ns.is('multiple', multiple),
    ]"
    trigger="manual"
    placement="bottom-start"
    :offset="6"
    :show-arrow="false"
    :teleported="teleported"
    persistent
    match-width
    role="listbox"
    :popper-class="ns.e('dropdown')"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      :id="formItem?.inputId"
      :class="ns.e('wrapper')"
      :tabindex="disabled || filterable ? -1 : 0"
      role="combobox"
      :aria-expanded="visible"
      :aria-disabled="disabled || undefined"
      @click="filterable && visible ? filterInput?.focus() : toggle()"
      @keydown="onKeydown"
      @blur="!filterable && visible && close()"
    >
      <div :class="ns.e('selection')">
        <template v-if="multiple">
          <span v-for="o in selectedOptions" :key="String(o.value)" :class="ns.e('tag')">
            {{ o.label }}
            <MoIcon name="close" :class="ns.e('tag-close')" @click.stop="removeTag(o.value)" />
          </span>
        </template>
        <span
          v-if="!multiple && selectedOptions[0] && !(filterable && visible)"
          :class="ns.e('value')"
        >
          {{ selectedOptions[0].label }}
        </span>
        <input
          v-if="filterable"
          v-show="multiple || visible || !selectedOptions[0]"
          ref="filterInput"
          v-model="query"
          :class="ns.e('input')"
          :disabled="disabled"
          :placeholder="inputPlaceholder"
          autocomplete="off"
          @focus="open"
          @blur="close"
          @keydown="onKeydown"
        />
        <span v-if="!filterable && !values.length" :class="ns.e('placeholder')">{{
          placeholder
        }}</span>
      </div>
      <span :class="ns.e('suffix')">
        <MoIcon v-if="showClear" name="close" :class="ns.e('clear')" @click.stop="clear" />
        <MoIcon v-else name="chevron-down" :class="ns.e('arrow')" />
      </span>
    </div>

    <template #content>
      <ul :class="ns.e('list')" @mousedown.prevent>
        <template v-if="options">
          <MoOption
            v-for="o in props.options"
            :key="String(o.value)"
            :value="o.value"
            :label="o.label"
            :disabled="o.disabled"
          />
        </template>
        <slot />
      </ul>
      <div v-if="emptyText" :class="ns.e('empty')">{{ emptyText }}</div>
    </template>
  </MoPopper>
</template>
