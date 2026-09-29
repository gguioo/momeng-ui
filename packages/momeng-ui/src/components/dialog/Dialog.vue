<script setup lang="ts">
import { computed } from 'vue'
import { dialogProps, overlayEmits } from './dialog'
import { useOverlay } from './useOverlay'
import { useId, useNamespace } from '../../composables'
import { addUnit } from '../../utils'
import MoIcon from '../icon/Icon.vue'
import MoSeal from '../seal/Seal.vue'

defineOptions({ name: 'MoDialog' })
const props = defineProps(dialogProps)
const emit = defineEmits(overlayEmits)
const ns = useNamespace('dialog')
const titleId = useId('mo-dialog-title')
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

const panelStyle = computed(() =>
  props.fullscreen
    ? undefined
    : { width: addUnit(props.width), marginTop: props.alignCenter ? undefined : props.top },
)
defineExpose({ close: requestClose })
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="mo-dialog" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
      <div
        v-if="rendered"
        v-show="visible"
        :class="[ns.e('overlay'), ns.is('modal', modal), ns.is('align-center', alignCenter)]"
        :style="{ zIndex }"
        @click.self="onModalClick"
        @keydown="onKeydown"
      >
        <div
          ref="panel"
          :class="[
            ns.b(),
            ns.is('center', center),
            ns.is('fullscreen', fullscreen),
            ns.is('lined', lined),
          ]"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title || $slots.header ? titleId : undefined"
          tabindex="-1"
        >
          <header v-if="title || $slots.header || showClose" :class="ns.e('header')">
            <div :id="titleId" :class="ns.e('title')">
              <slot name="header" :close="requestClose">{{ title }}</slot>
              <MoSeal v-if="seal" :text="seal" :size="28" :class="ns.e('seal')" />
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
