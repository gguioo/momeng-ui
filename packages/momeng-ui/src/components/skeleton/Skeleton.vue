<script setup lang="ts">
import { skeletonProps } from './skeleton'
import { useNamespace } from '../../composables'

defineOptions({ name: 'MoSkeleton' })
defineProps(skeletonProps)
const ns = useNamespace('skeleton')
// 每行宽度略有不同，像手写的草稿
const widths = ['100%', '92%', '97%', '86%', '94%', '78%']
</script>

<template>
  <div
    v-if="loading"
    :class="[ns.b(), ns.is('animated', animated)]"
    aria-busy="true"
    aria-live="polite"
  >
    <slot name="template">
      <div :class="ns.e('wrap')">
        <span v-if="avatar" :class="[ns.e('item'), ns.e('avatar')]" />
        <div :class="ns.e('lines')">
          <span v-if="title" :class="[ns.e('item'), ns.e('title')]" />
          <span
            v-for="i in rows"
            :key="i"
            :class="[ns.e('item'), ns.e('line')]"
            :style="{ width: i === rows ? '62%' : widths[(i - 1) % widths.length] }"
          />
        </div>
      </div>
    </slot>
  </div>
  <slot v-else />
</template>
