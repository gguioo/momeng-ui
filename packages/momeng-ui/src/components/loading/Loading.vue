<script setup lang="ts">
import { loadingProps } from './loading'
import { useNamespace } from '../../composables'
import MoMascot from '../mascot/Mascot.vue'

defineOptions({ name: 'MoLoading' })
defineProps(loadingProps)
const ns = useNamespace('loading')
</script>

<template>
  <div
    :class="[ns.b(), ns.m(variant), ns.is('fullscreen', fullscreen)]"
    :style="background ? { background } : undefined"
    role="status"
    aria-live="polite"
    :aria-label="text || '加载中'"
  >
    <div :class="ns.e('spinner')">
      <svg
        v-if="variant === 'enso'"
        :width="size"
        :height="size"
        viewBox="0 0 50 50"
        :class="ns.e('enso')"
      >
        <path
          d="M25 5.5c10.6-.3 19.4 8.2 19.5 19 .1 10.9-8.4 19.7-19.3 19.9C14.3 44.6 5.6 36 5.5 25.2 5.4 16.8 10.6 9.6 18 6.8"
        />
      </svg>
      <MoMascot v-else-if="variant === 'mascot'" mood="sleepy" :size="size * 1.4" />
      <span v-else :class="ns.e('dots')"><i /><i /><i /></span>
    </div>
    <p v-if="text" :class="ns.e('text')">{{ text }}</p>
  </div>
</template>
