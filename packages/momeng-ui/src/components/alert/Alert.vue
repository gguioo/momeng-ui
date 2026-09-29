<script setup lang="ts">
import { ref } from 'vue'
import { alertEmits, alertProps, typeIconMap } from './alert'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoAlert' })
defineProps(alertProps)
const emit = defineEmits(alertEmits)
const ns = useNamespace('alert')
const visible = ref(true)
function close(e: MouseEvent) {
  visible.value = false
  emit('close', e)
}
</script>

<template>
  <Transition name="mo-fade">
    <div
      v-show="visible"
      :class="[
        ns.b(),
        ns.m(type),
        ns.m(effect),
        ns.is('center', center),
        ns.is('with-desc', !!(description || $slots.default)),
      ]"
      role="alert"
    >
      <MoIcon v-if="showIcon" :name="typeIconMap[type]" :class="ns.e('icon')" />
      <div :class="ns.e('body')">
        <div v-if="title || $slots.title" :class="ns.e('title')">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="description || $slots.default" :class="ns.e('desc')">
          <slot>{{ description }}</slot>
        </div>
      </div>
      <button
        v-if="closable"
        type="button"
        :class="[ns.e('close'), ns.is('text', !!closeText)]"
        aria-label="关闭"
        @click="close"
      >
        <template v-if="closeText">{{ closeText }}</template>
        <MoIcon v-else name="close" />
      </button>
    </div>
  </Transition>
</template>
