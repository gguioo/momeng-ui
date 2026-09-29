<script setup lang="ts">
import { provide, ref } from 'vue'
import { dropdownContextKey, dropdownEmits, dropdownProps, type DropdownCommand } from './dropdown'
import { useNamespace } from '../../composables'
import MoPopper from '../popper/Popper.vue'

defineOptions({ name: 'MoDropdown' })
const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)
const ns = useNamespace('dropdown')
const popper = ref<InstanceType<typeof MoPopper>>()
const menuRef = ref<HTMLElement>()

provide(dropdownContextKey, {
  onCommand(c?: DropdownCommand) {
    if (c !== undefined) emit('command', c)
    if (props.hideOnClick) popper.value?.hide()
  },
})

function items() {
  return Array.from(
    menuRef.value?.querySelectorAll<HTMLElement>('.mo-dropdown-item:not(.is-disabled)') ?? [],
  )
}
function onMenuKeydown(e: KeyboardEvent) {
  const list = items()
  const i = list.indexOf(document.activeElement as HTMLElement)
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    list[(i + 1) % list.length]?.focus()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    list[(i - 1 + list.length) % list.length]?.focus()
  }
}
defineExpose({ show: () => popper.value?.show(), hide: () => popper.value?.hide() })
</script>

<template>
  <MoPopper
    ref="popper"
    :class="ns.b()"
    :trigger="trigger"
    :placement="placement"
    :disabled="disabled"
    :teleported="teleported"
    :offset="8"
    :show-arrow="false"
    role="menu"
    :popper-class="ns.e('popper')"
    @update:visible="emit('visible-change', $event)"
  >
    <slot />
    <template #content>
      <ul ref="menuRef" :class="ns.e('menu')" @keydown="onMenuKeydown">
        <slot name="dropdown" />
      </ul>
    </template>
  </MoPopper>
</template>
