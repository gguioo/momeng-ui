<script setup lang="ts">
import { provide, reactive, toRefs } from 'vue'
import { breadcrumbKey, breadcrumbProps } from './breadcrumb'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoBreadcrumb' })
const props = defineProps(breadcrumbProps)
const ns = useNamespace('breadcrumb')
provide(breadcrumbKey, reactive({ ...toRefs(props) }))
</script>

<template>
  <nav :class="ns.b()" aria-label="面包屑">
    <ol :class="ns.e('list')">
      <slot />
    </ol>
  </nav>
</template>
