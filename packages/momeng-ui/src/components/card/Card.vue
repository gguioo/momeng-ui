<script setup lang="ts">
import { computed } from 'vue'
import { cardProps } from './card'
import { useNamespace } from '../../composables'
import MoSeal from '../seal/Seal.vue'

defineOptions({ name: 'MoCard' })
const props = defineProps(cardProps)
const ns = useNamespace('card')
const tapeColor = computed(() => (props.tape === true ? 'pink' : props.tape))
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(`shadow-${shadow}`),
      ns.is('textured', textured),
      ns.is('hoverable', hoverable),
    ]"
  >
    <span v-if="tapeColor" :class="[ns.e('tape'), ns.em('tape', tapeColor)]" aria-hidden="true" />
    <div v-if="header || $slots.header || $slots.extra" :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="header">{{ header }}</slot>
      </div>
      <div v-if="$slots.extra" :class="ns.e('extra')"><slot name="extra" /></div>
    </div>
    <div :class="ns.e('body')" :style="bodyStyle"><slot /></div>
    <div v-if="$slots.footer" :class="ns.e('footer')"><slot name="footer" /></div>
    <MoSeal v-if="seal" :text="seal" :size="36" :class="ns.e('seal')" />
  </div>
</template>
