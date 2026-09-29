<script setup lang="ts">
import { computed } from 'vue'
import { progressProps } from './progress'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoProgress' })
const props = defineProps(progressProps)
const ns = useNamespace('progress')
const pct = computed(() => Math.min(100, Math.max(0, props.percentage)))
const text = computed(() => (props.format ? props.format(pct.value) : `${pct.value}%`))
const statusIconMap: Record<string, string> = {
  success: 'check',
  danger: 'close',
  warning: 'warning',
  info: 'info',
}
const statusIcon = computed(() => (props.status ? statusIconMap[props.status] : undefined))
const barColor = computed(
  () =>
    props.color ?? (props.status ? `var(--mo-color-${props.status})` : 'var(--mo-color-primary)'),
)

// 圆形
const radius = computed(() => 50 - (props.strokeWidth / props.width) * 50 - 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - pct.value / 100))
const svgStroke = computed(() => (props.strokeWidth / props.width) * 100)
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(type),
      status && ns.m(status),
      ns.is('striped', striped),
      ns.is('indeterminate', indeterminate),
    ]"
    role="progressbar"
    :aria-valuenow="pct"
    aria-valuemin="0"
    aria-valuemax="100"
    :style="{ '--mo-progress-color': barColor }"
  >
    <template v-if="type === 'line'">
      <div :class="ns.e('track')" :style="{ height: `${strokeWidth}px` }">
        <div :class="ns.e('bar')" :style="{ width: `${pct}%` }">
          <span v-if="showText && textInside" :class="ns.e('inner-text')">{{ text }}</span>
        </div>
      </div>
      <div v-if="showText && !textInside" :class="ns.e('text')">
        <slot :percentage="pct">
          <MoIcon v-if="statusIcon && !format" :name="statusIcon" />
          <span v-else>{{ text }}</span>
        </slot>
      </div>
    </template>
    <template v-else>
      <div :class="ns.e('circle')" :style="{ width: `${width}px`, height: `${width}px` }">
        <svg viewBox="0 0 100 100">
          <circle
            :class="ns.e('circle-track')"
            cx="50"
            cy="50"
            :r="radius"
            :stroke-width="svgStroke"
            fill="none"
          />
          <circle
            :class="ns.e('circle-bar')"
            cx="50"
            cy="50"
            :r="radius"
            :stroke-width="svgStroke"
            fill="none"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div v-if="showText" :class="ns.e('circle-text')">
          <slot :percentage="pct">
            <MoIcon v-if="statusIcon && !format" :name="statusIcon" :size="width * 0.26" />
            <span v-else>{{ text }}</span>
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>
