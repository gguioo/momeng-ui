<script setup lang="ts">
import { timelineItemProps } from './timeline'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoTimelineItem' })
defineProps(timelineItemProps)
const ns = useNamespace('timeline-item')
</script>

<template>
  <li :class="[ns.b(), ns.m(size)]">
    <div :class="ns.e('tail')" />
    <div
      :class="[
        ns.e('node'),
        type && ns.em('node', type),
        ns.is('hollow', hollow),
        ns.is('icon', !!(icon || $slots.dot)),
      ]"
      :style="color ? { '--mo-timeline-color': color } : undefined"
    >
      <slot name="dot"><MoIcon v-if="icon" :name="icon" /></slot>
    </div>
    <div :class="ns.e('wrapper')">
      <div
        v-if="!hideTimestamp && timestamp && placement === 'top'"
        :class="[ns.e('timestamp'), 'is-top']"
      >
        {{ timestamp }}
      </div>
      <div :class="ns.e('content')"><slot /></div>
      <div v-if="!hideTimestamp && timestamp && placement === 'bottom'" :class="ns.e('timestamp')">
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>
