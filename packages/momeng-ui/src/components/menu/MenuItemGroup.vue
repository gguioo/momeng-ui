<script setup lang="ts">
import { menuItemGroupProps } from './menu'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoMenuItemGroup' })
defineProps(menuItemGroupProps)
const ns = useNamespace('menu-item-group')
</script>

<template>
  <li :class="ns.b()" role="none">
    <div :class="ns.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <ul :class="ns.e('list')" role="group">
      <slot />
    </ul>
  </li>
</template>
