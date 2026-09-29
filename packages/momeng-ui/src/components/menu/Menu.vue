<script setup lang="ts">
import { provide, ref, toRef, watch } from 'vue'
import { menuContextKey, menuEmits, menuProps, subMenuLevelKey, type MenuIndex } from './menu'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoMenu' })
const props = defineProps(menuProps)
const emit = defineEmits(menuEmits)
const ns = useNamespace('menu')
const active = ref<MenuIndex | undefined>(props.modelValue)
const openeds = ref<MenuIndex[]>([...props.defaultOpeneds])
watch(
  () => props.modelValue,
  (v) => (active.value = v),
)

provide(menuContextKey, {
  active,
  openeds,
  mode: toRef(props, 'mode'),
  collapse: toRef(props, 'collapse'),
  select(index) {
    active.value = index
    emit('update:modelValue', index)
    emit('select', index)
  },
  toggleSub(index) {
    const i = openeds.value.indexOf(index)
    if (i > -1) {
      openeds.value.splice(i, 1)
      emit('close', index)
    } else {
      openeds.value = props.uniqueOpened ? [index] : [...openeds.value, index]
      emit('open', index)
    }
  },
})
provide(subMenuLevelKey, 0)
</script>

<template>
  <ul
    :class="[ns.b(), ns.m(mode), ns.is('collapse', collapse && mode === 'vertical')]"
    role="menubar"
  >
    <slot />
  </ul>
</template>
