<script setup lang="ts">
import { inject } from 'vue'
import { dropdownContextKey, dropdownItemProps } from './dropdown'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoDropdownItem' })
const props = defineProps(dropdownItemProps)
const ns = useNamespace('dropdown-item')
const ctx = inject(dropdownContextKey, undefined)
const onClick = () => !props.disabled && ctx?.onCommand(props.command)
</script>

<template>
  <li
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('divided', divided),
      ns.is('danger', danger),
    ]"
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
    :aria-disabled="disabled || undefined"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <MoIcon v-if="icon" :name="icon" :class="ns.e('icon')" />
    <slot />
  </li>
</template>
