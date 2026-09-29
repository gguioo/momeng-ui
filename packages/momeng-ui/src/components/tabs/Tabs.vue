<script setup lang="ts">
import { computed, nextTick, onMounted, provide, ref, shallowReactive, watch } from 'vue'
import { tabsContextKey, tabsEmits, tabsProps, type PaneState, type TabName } from './tabs'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoTabs' })
const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)
const ns = useNamespace('tabs')
const panes = shallowReactive<PaneState[]>([])
const innerActive = ref<TabName | undefined>(props.modelValue)
const active = computed(() => props.modelValue ?? innerActive.value ?? panes[0]?.name)
const navRef = ref<HTMLElement>()
const inkStyle = ref<Record<string, string>>({})

provide(tabsContextKey, {
  active,
  register: (p) => panes.push(p),
  unregister: (uid) => {
    const i = panes.findIndex((p) => p.uid === uid)
    if (i > -1) panes.splice(i, 1)
  },
})

async function select(pane: PaneState) {
  if (pane.disabled || pane.name === active.value) return
  if (props.beforeLeave) {
    const ok = await Promise.resolve(props.beforeLeave(pane.name, active.value)).catch(() => false)
    if (ok === false) return
  }
  innerActive.value = pane.name
  emit('update:modelValue', pane.name)
  emit('tab-change', pane.name)
}

function onKeydown(e: KeyboardEvent, index: number) {
  const enabled = panes.filter((p) => !p.disabled)
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const cur = enabled.indexOf(panes[index])
  let next = cur
  if (e.key === 'ArrowRight') next = (cur + 1) % enabled.length
  if (e.key === 'ArrowLeft') next = (cur - 1 + enabled.length) % enabled.length
  if (e.key === 'Home') next = 0
  if (e.key === 'End') next = enabled.length - 1
  select(enabled[next])
  nextTick(() => navRef.value?.querySelector<HTMLElement>('.is-active')?.focus())
}

function updateInk() {
  if (props.type !== 'line') return
  const el = navRef.value?.querySelector<HTMLElement>('.mo-tabs__item.is-active')
  if (!el) return
  inkStyle.value = {
    width: `${el.offsetWidth - 16}px`,
    transform: `translateX(${el.offsetLeft + 8}px)`,
  }
}
watch([active, () => panes.length], () => nextTick(updateInk))
onMounted(() => {
  nextTick(updateInk)
  // 字体加载后宽度会变化
  ;(document as any).fonts?.ready?.then(updateInk)
})
</script>

<template>
  <div :class="[ns.b(), ns.m(type)]">
    <div :class="ns.e('header')">
      <div ref="navRef" :class="[ns.e('nav'), ns.is('stretch', stretch)]" role="tablist">
        <div
          v-for="(pane, i) in panes"
          :id="`tab-${pane.name}`"
          :key="pane.uid"
          :class="[
            ns.e('item'),
            ns.is('active', pane.name === active),
            ns.is('disabled', pane.disabled),
          ]"
          role="tab"
          :tabindex="pane.name === active ? 0 : -1"
          :aria-selected="pane.name === active"
          :aria-controls="`pane-${pane.name}`"
          :aria-disabled="pane.disabled || undefined"
          @click="select(pane)"
          @keydown="onKeydown($event, i)"
        >
          <MoIcon v-if="pane.icon" :name="pane.icon" />
          <component :is="pane.slots.label" v-if="pane.slots.label" />
          <span v-else>{{ pane.label }}</span>
          <MoIcon
            v-if="pane.closable ?? closable"
            name="close"
            :class="ns.e('close')"
            @click.stop="emit('tab-remove', pane.name)"
          />
        </div>
        <span v-if="type === 'line'" :class="ns.e('ink')" :style="inkStyle" aria-hidden="true" />
      </div>
      <button
        v-if="addable"
        type="button"
        :class="ns.e('add')"
        aria-label="新增标签"
        @click="emit('tab-add')"
      >
        <MoIcon name="plus" />
      </button>
    </div>
    <div :class="ns.e('content')"><slot /></div>
  </div>
</template>
