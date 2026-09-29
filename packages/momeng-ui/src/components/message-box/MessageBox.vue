<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import type { MessageBoxAction, MessageBoxOptions } from './message-box'
import { useNamespace } from '../../composables'
import MoDialog from '../dialog/Dialog.vue'
import MoButton from '../button/Button.vue'
import MoMascot from '../mascot/Mascot.vue'

defineOptions({ name: 'MoMessageBox' })
const props = defineProps({
  options: { type: Object as PropType<MessageBoxOptions>, required: true },
})
const emit = defineEmits<{ action: [MessageBoxAction]; destroy: [] }>()
const ns = useNamespace('message-box')
const visible = ref(false)
const loading = ref(false)
let action: MessageBoxAction = 'close'

const mood = computed(
  () =>
    (
      ({
        success: 'happy',
        warning: 'surprised',
        danger: 'sad',
        info: 'calm',
        primary: 'wink',
      }) as const
    )[props.options.type ?? 'info'],
)
async function confirm() {
  if (props.options.beforeConfirm) {
    loading.value = true
    try {
      if ((await props.options.beforeConfirm()) === false) return
    } finally {
      loading.value = false
    }
  }
  action = 'confirm'
  visible.value = false
}
function cancel() {
  action = 'cancel'
  visible.value = false
}
onMounted(() => (visible.value = true))
</script>

<template>
  <MoDialog
    v-model="visible"
    :title="options.title ?? '提示'"
    width="400px"
    :close-on-click-modal="options.closeOnClickModal ?? false"
    align-center
    @close="emit('action', action)"
    @closed="emit('destroy')"
  >
    <div :class="ns.b()">
      <MoMascot :mood="mood" :size="56" :class="ns.e('mascot')" />
      <p :class="ns.e('message')">{{ options.message }}</p>
    </div>
    <template #footer>
      <MoButton v-if="options.showCancelButton !== false" @click="cancel">{{
        options.cancelButtonText ?? '再想想'
      }}</MoButton>
      <MoButton
        :type="options.danger ? 'danger' : 'primary'"
        :loading="loading"
        autofocus
        @click="confirm"
      >
        {{ options.confirmButtonText ?? '好的' }}
      </MoButton>
    </template>
  </MoDialog>
</template>
