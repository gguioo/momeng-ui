<script setup lang="ts">
import { emptyProps } from './empty'
import { useNamespace } from '../../composables'
import MoMascot from '../mascot/Mascot.vue'

defineOptions({ name: 'MoEmpty' })
defineProps(emptyProps)
const ns = useNamespace('empty')
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('image')">
      <slot name="image">
        <img v-if="image" :src="image" :style="{ width: `${imageSize}px` }" alt="" />
        <MoMascot v-else :mood="mood" :size="imageSize" />
      </slot>
    </div>
    <p :class="ns.e('description')">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.default" :class="ns.e('bottom')"><slot /></div>
  </div>
</template>
