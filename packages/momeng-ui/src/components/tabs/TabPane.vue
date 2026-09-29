<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  reactive,
  ref,
  useSlots,
  watch,
  watchEffect,
} from 'vue'
import { tabPaneProps, tabsContextKey, type PaneState } from './tabs'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoTabPane' })
const props = defineProps(tabPaneProps)
const slots = useSlots()
const ns = useNamespace('tab-pane')
const ctx = inject(tabsContextKey)!
const uid = getCurrentInstance()!.uid

const state: PaneState = reactive({
  uid,
  name: props.name ?? uid,
  label: props.label ?? '',
  icon: props.icon,
  disabled: props.disabled,
  closable: props.closable,
  slots,
})
watchEffect(() => {
  state.name = props.name ?? uid
  state.label = props.label ?? ''
  state.icon = props.icon
  state.disabled = props.disabled
  state.closable = props.closable
})
ctx.register(state)
onBeforeUnmount(() => ctx.unregister(uid))

const active = computed(() => ctx.active.value === state.name)
const rendered = ref(!props.lazy || active.value)
watch(active, (v) => v && (rendered.value = true))
</script>

<template>
  <div
    v-if="rendered"
    v-show="active"
    :id="`pane-${state.name}`"
    :class="ns.b()"
    role="tabpanel"
    :aria-labelledby="`tab-${state.name}`"
  >
    <slot />
  </div>
</template>
