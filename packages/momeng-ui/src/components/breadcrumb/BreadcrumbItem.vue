<script setup lang="ts">
import { inject } from 'vue'
import { breadcrumbItemProps, breadcrumbKey } from './breadcrumb'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoBreadcrumbItem' })
defineProps(breadcrumbItemProps)
const ns = useNamespace('breadcrumb-item')
const parent = inject(breadcrumbKey, { separator: '/' })
</script>

<template>
  <li :class="ns.b()">
    <component
      :is="href ? 'a' : 'span'"
      :href="href"
      :class="[ns.e('inner'), ns.is('link', !!href)]"
    >
      <MoIcon v-if="icon" :name="icon" />
      <slot />
    </component>
    <span :class="ns.e('separator')" aria-hidden="true">
      <MoIcon v-if="parent.separatorIcon" :name="parent.separatorIcon" />
      <template v-else>{{ parent.separator }}</template>
    </span>
  </li>
</template>
