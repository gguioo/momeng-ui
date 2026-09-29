<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { notificationProps } from './notification'
import { useNamespace } from '../../composables'
import { typeIconMap } from '../alert/alert'
import MoIcon from '../icon/Icon.vue'
import MoMascot from '../mascot/Mascot.vue'

defineOptions({ name: 'MoNotification' })
const props = defineProps(notificationProps)
const emit = defineEmits<{ destroy: [] }>()
const ns = useNamespace('notification')
const visible = ref(false)
const iconName = computed(() => props.icon ?? (props.type ? typeIconMap[props.type] : undefined))
const mascotMood = computed(
  () =>
    (({ success: 'happy', danger: 'sad', warning: 'surprised' }) as const)[
      props.type as 'success'
    ] ?? 'wink',
)
const side = computed(() => (props.position.endsWith('left') ? 'left' : 'right'))
let timer: ReturnType<typeof setTimeout> | undefined

const start = () => props.duration > 0 && (timer = setTimeout(close, props.duration))
const clear = () => timer && clearTimeout(timer)
function close() {
  visible.value = false
}
onMounted(() => {
  visible.value = true
  start()
})
onBeforeUnmount(clear)
defineExpose({ close })
</script>

<template>
  <Transition
    :name="`mo-notification-${side}`"
    @before-leave="onClose?.()"
    @after-leave="emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[ns.b(), type && ns.m(type)]"
      role="alert"
      @mouseenter="clear"
      @mouseleave="start"
      @click="onClick?.()"
    >
      <MoMascot v-if="mascot" :mood="mascotMood" :size="40" :class="ns.e('mascot')" />
      <MoIcon v-else-if="iconName" :name="iconName" :class="ns.e('icon')" />
      <div :class="ns.e('main')">
        <div v-if="title" :class="ns.e('title')">{{ title }}</div>
        <div :class="ns.e('content')">
          <component :is="message" v-if="typeof message !== 'string'" />
          <template v-else>{{ message }}</template>
        </div>
      </div>
      <button
        v-if="showClose"
        type="button"
        :class="ns.e('close')"
        aria-label="关闭"
        @click.stop="close"
      >
        <MoIcon name="close" />
      </button>
    </div>
  </Transition>
</template>
