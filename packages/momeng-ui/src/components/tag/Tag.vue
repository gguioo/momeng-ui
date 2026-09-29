<script setup lang="ts">
import { computed } from 'vue'
import { tagEmits, tagProps } from './tag'
import { useNamespace, useSize } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoTag' })
const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)
const ns = useNamespace('tag')
const size = useSize(() => props.size)
const style = computed(() => (props.color ? { '--mo-tag-color': props.color } : undefined))
</script>

<template>
  <Transition :name="disableTransitions ? '' : 'mo-pop'" appear>
    <span
      :class="[
        ns.b(),
        ns.m(type),
        ns.m(effect),
        ns.m(size),
        ns.is('round', round),
        ns.is('closable', closable),
        ns.is('custom', !!color),
      ]"
      :style="style"
      @click="emit('click', $event)"
    >
      <MoIcon v-if="icon" :name="icon" :class="ns.e('icon')" />
      <span :class="ns.e('content')"><slot /></span>
      <button
        v-if="closable"
        type="button"
        :class="ns.e('close')"
        aria-label="移除"
        @click.stop="emit('close', $event)"
      >
        <MoIcon name="close" />
      </button>
    </span>
  </Transition>
</template>
