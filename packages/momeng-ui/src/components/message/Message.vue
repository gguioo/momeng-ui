<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { messageProps } from './message'
import { useNamespace } from '../../composables'
import { typeIconMap } from '../alert/alert'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoMessage' })
const props = defineProps(messageProps)
const emit = defineEmits<{ destroy: [] }>()
const ns = useNamespace('message')
const visible = ref(false)
const iconName = computed(() => props.icon ?? typeIconMap[props.type])
let timer: ReturnType<typeof setTimeout> | undefined

function startTimer() {
  if (props.duration > 0) timer = setTimeout(close, props.duration)
}
function clearTimer() {
  timer && clearTimeout(timer)
}
function close() {
  visible.value = false
}
watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  },
)
onMounted(() => {
  visible.value = true
  startTimer()
})
onBeforeUnmount(clearTimer)
defineExpose({ close, visible })
</script>

<template>
  <Transition name="mo-message" @before-leave="onClose?.()" @after-leave="emit('destroy')">
    <div
      v-show="visible"
      :id="id"
      :class="[ns.b(), ns.m(type)]"
      role="status"
      aria-live="polite"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <MoIcon :name="iconName" :class="ns.e('icon')" />
      <span :class="ns.e('content')">
        <component :is="message" v-if="typeof message !== 'string'" />
        <template v-else>{{ message }}</template>
      </span>
      <span v-if="repeatNum > 1" :class="ns.e('badge')">{{ repeatNum }}</span>
      <button
        v-if="showClose"
        type="button"
        :class="ns.e('close')"
        aria-label="关闭"
        @click="close"
      >
        <MoIcon name="close" />
      </button>
    </div>
  </Transition>
</template>
