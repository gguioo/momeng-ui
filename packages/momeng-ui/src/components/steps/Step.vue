<script setup lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import { stepProps, stepsContextKey, type StepStatus } from './steps'
import { useNamespace } from '../../composables'
import { toChineseNumber } from '../table/table'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoStep' })
const props = defineProps(stepProps)
const ns = useNamespace('step')
const ctx = inject(stepsContextKey)!
const uid = getCurrentInstance()!.uid
ctx.register(uid)
onBeforeUnmount(() => ctx.unregister(uid))

const index = computed(() => ctx.steps.value.indexOf(uid))
const isLast = computed(() => index.value === ctx.steps.value.length - 1)
const currentStatus = computed<StepStatus>(() => {
  if (props.status) return props.status
  const active = ctx.props.active
  if (index.value < active) return ctx.props.finishStatus
  if (index.value === active) return ctx.props.processStatus
  return 'wait'
})
const iconName = computed(() => {
  if (props.icon) return props.icon
  if (currentStatus.value === 'finish' || currentStatus.value === 'success') return 'check'
  if (currentStatus.value === 'error') return 'close'
  return undefined
})
const label = computed(() =>
  ctx.props.chineseNumber ? toChineseNumber(index.value + 1) : index.value + 1,
)
</script>

<template>
  <div
    :class="[ns.b(), ns.is(currentStatus, true), ns.is('last', isLast)]"
    role="listitem"
    :aria-current="currentStatus === 'process' ? 'step' : undefined"
  >
    <div :class="ns.e('head')">
      <div :class="ns.e('line')" />
      <div :class="ns.e('icon')">
        <slot name="icon">
          <MoIcon v-if="iconName" :name="iconName" />
          <span v-else :class="ns.e('number')">{{ label }}</span>
        </slot>
      </div>
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" :class="ns.e('desc')">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
