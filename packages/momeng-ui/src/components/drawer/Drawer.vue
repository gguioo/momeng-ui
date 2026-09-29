<script setup lang="ts">
import { computed } from 'vue'
import { drawerEmits, drawerProps } from './drawer'
import { useOverlay } from '../dialog/useOverlay'
import { useId, useNamespace } from '../../composables'
import { addUnit } from '../../utils'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoDrawer' })
const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)
const ns = useNamespace('drawer')
const titleId = useId('mo-drawer-title')
const {
  visible,
  rendered,
  zIndex,
  requestClose,
  onAfterEnter,
  onAfterLeave,
  onModalClick,
  onKeydown,
} = useOverlay(props, emit)
const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr')
const panelStyle = computed(() =>
  isHorizontal.value ? { width: addUnit(props.size) } : { height: addUnit(props.size) },
)
defineExpose({ close: requestClose })
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition
      :name="`mo-drawer-${direction}`"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="rendered"
        v-show="visible"
        :class="[ns.e('overlay'), ns.is('modal', modal)]"
        :style="{ zIndex }"
        @click.self="onModalClick"
        @keydown="onKeydown"
      >
        <div
          ref="panel"
          :class="[ns.b(), ns.m(direction)]"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="withHeader ? titleId : undefined"
          tabindex="-1"
        >
          <header v-if="withHeader" :class="ns.e('header')">
            <div :id="titleId" :class="ns.e('title')">
              <slot name="header" :close="requestClose">{{ title }}</slot>
            </div>
            <button
              v-if="showClose"
              type="button"
              :class="ns.e('close')"
              aria-label="关闭"
              @click="requestClose"
            >
              <MoIcon name="close" />
            </button>
          </header>
          <div :class="ns.e('body')"><slot /></div>
          <footer v-if="$slots.footer" :class="ns.e('footer')">
            <slot name="footer" :close="requestClose" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
