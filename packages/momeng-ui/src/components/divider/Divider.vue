<script setup lang="ts">
import { computed } from 'vue'
import { dividerProps } from './divider'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoDivider' })
const props = defineProps(dividerProps)
const ns = useNamespace('divider')
const hasContent = computed(() => props.direction === 'horizontal')
</script>

<template>
  <div
    :class="[ns.b(), ns.m(direction), ns.m(variant), ns.m(`content-${contentPosition}`)]"
    :style="color ? { '--mo-divider-color': color } : undefined"
    role="separator"
    :aria-orientation="direction"
  >
    <template v-if="hasContent && ($slots.default || ornament)">
      <span :class="ns.e('line')" />
      <span :class="ns.e('content')">
        <MoIcon v-if="ornament" :name="ornament" :class="ns.e('ornament')" />
        <slot />
      </span>
      <span :class="ns.e('line')" />
    </template>
    <span v-else :class="ns.e('line')" />
  </div>
</template>
