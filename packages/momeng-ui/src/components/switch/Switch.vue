<script setup lang="ts">
import { computed, ref } from 'vue'
import { switchEmits, switchProps } from './switch'
import { useNamespace } from '../../composables'
import { useFormDisabled, useFormItem, useFormSize } from '../form/useFormItem'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoSwitch' })
const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const ns = useNamespace('switch')
const { formItem } = useFormItem()
const size = useFormSize(() => props.size)
const disabled = useFormDisabled(() => props.disabled || props.loading)
const checked = computed(() => props.modelValue === props.activeValue)
const pending = ref(false)

async function toggle() {
  if (disabled.value || pending.value) return
  if (props.beforeChange) {
    pending.value = true
    try {
      const ok = await props.beforeChange()
      if (ok === false) return
    } catch {
      return
    } finally {
      pending.value = false
    }
  }
  const value = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', value)
  emit('change', value)
  if (props.validateEvent) formItem?.validate('change')
}
</script>

<template>
  <span :class="[ns.b(), ns.m(size), ns.is('checked', checked), ns.is('disabled', disabled)]">
    <span
      v-if="inactiveText && !inlinePrompt"
      :class="[ns.e('text'), ns.is('active', !checked)]"
      @click="toggle"
    >
      {{ inactiveText }}
    </span>
    <button
      :id="formItem?.inputId"
      type="button"
      role="switch"
      :class="ns.e('track')"
      :aria-checked="checked"
      :disabled="disabled"
      :name="name"
      @click="toggle"
    >
      <span v-if="inlinePrompt" :class="ns.e('inner')">{{
        checked ? activeText : inactiveText
      }}</span>
      <span :class="ns.e('knob')">
        <MoIcon v-if="loading || pending" name="loading" spin :class="ns.e('loading')" />
        <svg v-else-if="face" viewBox="0 0 20 20" :class="ns.e('face')" aria-hidden="true">
          <template v-if="checked">
            <path d="M5.4 9q1.6-2 3.2 0M11.4 9q1.6-2 3.2 0" />
            <ellipse cx="4.4" cy="12" rx="1.8" ry="1.1" class="blush" />
            <ellipse cx="15.6" cy="12" rx="1.8" ry="1.1" class="blush" />
            <path d="M8.6 12.4q1.4 1.6 2.8 0" />
          </template>
          <template v-else>
            <path d="M5.4 9.4h3M11.4 9.4h3" />
            <path d="M9 13h2" />
          </template>
        </svg>
      </span>
    </button>
    <span
      v-if="activeText && !inlinePrompt"
      :class="[ns.e('text'), ns.is('active', checked)]"
      @click="toggle"
    >
      {{ activeText }}
    </span>
  </span>
</template>
