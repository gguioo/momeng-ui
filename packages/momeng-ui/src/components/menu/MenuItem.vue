<script setup lang="ts">
import { computed, inject } from 'vue'
import { menuContextKey, menuItemProps, subMenuContextKey, subMenuLevelKey } from './menu'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoMenuItem' })
const props = defineProps(menuItemProps)
const ns = useNamespace('menu-item')
const menu = inject(menuContextKey)!
const level = inject(subMenuLevelKey, 0)
const sub = inject(subMenuContextKey, undefined)
const active = computed(() => menu.active.value === props.index)
function onClick() {
  if (props.disabled) return
  menu.select(props.index)
  if (menu.mode.value === 'horizontal') sub?.close()
}
</script>

<template>
  <li
    :class="[ns.b(), ns.is('active', active), ns.is('disabled', disabled)]"
    :style="
      menu.mode.value === 'vertical' && !menu.collapse.value
        ? { paddingLeft: `${18 + level * 20}px` }
        : undefined
    "
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
    :aria-current="active ? 'page' : undefined"
    :aria-disabled="disabled || undefined"
    @click="onClick"
    @keydown.enter.prevent="onClick"
  >
    <MoIcon v-if="icon" :name="icon" :class="ns.e('icon')" />
    <span :class="ns.e('title')"><slot /></span>
  </li>
</template>
