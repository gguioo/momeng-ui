<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { avatarEmits, avatarProps } from './avatar'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'
import MoMascot from '../mascot/Mascot.vue'

defineOptions({ name: 'MoAvatar' })
const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)
const ns = useNamespace('avatar')
const failed = ref(false)
watch(
  () => props.src,
  () => (failed.value = false),
)

const sizeMap = { small: 28, default: 40, large: 56 }
const px = computed(() => (typeof props.size === 'number' ? props.size : sizeMap[props.size]))
const style = computed(() => ({
  '--mo-avatar-size': `${px.value}px`,
  ...(props.color ? { backgroundColor: props.color } : {}),
}))
function onError(e: Event) {
  failed.value = true
  emit('error', e)
}
</script>

<template>
  <span :class="[ns.b(), ns.m(shape)]" :style="style">
    <img v-if="src && !failed" :src="src" :alt="alt" :style="{ objectFit: fit }" @error="onError" />
    <MoIcon v-else-if="icon" :name="icon" />
    <span v-else-if="$slots.default" :class="ns.e('text')"><slot /></span>
    <MoMascot v-else mood="calm" :size="px * 0.78" :animated="false" />
  </span>
</template>
