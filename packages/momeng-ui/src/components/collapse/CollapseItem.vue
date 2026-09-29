<script setup lang="ts">
import { computed, inject } from 'vue'
import { collapseContextKey, collapseItemProps } from './collapse'
import { useId, useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'
import MoCollapseTransition from './CollapseTransition.vue'

defineOptions({ name: 'MoCollapseItem' })
const props = defineProps(collapseItemProps)
const ns = useNamespace('collapse-item')
const ctx = inject(collapseContextKey)!
const id = useId('mo-collapse')
const name = computed(() => props.name ?? id)
const active = computed(() => ctx.activeNames.value.includes(name.value))
const toggle = () => !props.disabled && ctx.toggle(name.value)
</script>

<template>
  <div :class="[ns.b(), ns.is('active', active), ns.is('disabled', disabled)]">
    <button
      :id="`${id}-head`"
      type="button"
      :class="ns.e('header')"
      :aria-expanded="active"
      :aria-controls="`${id}-body`"
      :disabled="disabled"
      @click="toggle"
    >
      <MoIcon :name="icon ?? 'plum'" :class="ns.e('bullet')" />
      <span :class="ns.e('title')"
        ><slot name="title">{{ title }}</slot></span
      >
      <MoIcon name="chevron-down" :class="ns.e('arrow')" />
    </button>
    <MoCollapseTransition>
      <div
        v-show="active"
        :id="`${id}-body`"
        :class="ns.e('wrap')"
        role="region"
        :aria-labelledby="`${id}-head`"
      >
        <div :class="ns.e('content')"><slot /></div>
      </div>
    </MoCollapseTransition>
  </div>
</template>
