<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue'
import { menuContextKey, subMenuContextKey, subMenuLevelKey, subMenuProps } from './menu'
import { useNamespace } from '../../composables'
import MoIcon from '../icon/Icon.vue'
import MoCollapseTransition from '../collapse/CollapseTransition.vue'
import MoPopper from '../popper/Popper.vue'

defineOptions({ name: 'MoSubMenu' })
const props = defineProps(subMenuProps)
const ns = useNamespace('sub-menu')
const menu = inject(menuContextKey)!
const level = inject(subMenuLevelKey, 0)
provide(subMenuLevelKey, level + 1)
const popper = ref<InstanceType<typeof MoPopper>>()
provide(subMenuContextKey, { close: () => popper.value?.hide() })

const opened = computed(() => menu.openeds.value.includes(props.index))
const isPopup = computed(() => menu.mode.value === 'horizontal' || menu.collapse.value)
const toggle = () => !props.disabled && menu.toggleSub(props.index)
</script>

<template>
  <li :class="[ns.b(), ns.is('opened', opened), ns.is('disabled', disabled)]" role="none">
    <MoPopper
      v-if="isPopup"
      ref="popper"
      :class="ns.e('popper-ref')"
      trigger="hover"
      :placement="menu.mode.value === 'horizontal' && level === 0 ? 'bottom-start' : 'right-start'"
      :show-arrow="false"
      :offset="6"
      :disabled="disabled"
      role="menu"
      :popper-class="ns.e('popper')"
    >
      <div :class="ns.e('title')" role="menuitem" tabindex="0" aria-haspopup="true">
        <MoIcon v-if="icon" :name="icon" :class="ns.e('icon')" />
        <span :class="ns.e('text')"
          ><slot name="title">{{ title }}</slot></span
        >
        <MoIcon name="chevron-down" :class="ns.e('arrow')" />
      </div>
      <template #content>
        <ul :class="ns.e('list')">
          <slot />
        </ul>
      </template>
    </MoPopper>
    <template v-else>
      <div
        :class="ns.e('title')"
        :style="{ paddingLeft: `${18 + level * 20}px` }"
        role="menuitem"
        tabindex="0"
        :aria-expanded="opened"
        @click="toggle"
        @keydown.enter.prevent="toggle"
      >
        <MoIcon v-if="icon" :name="icon" :class="ns.e('icon')" />
        <span :class="ns.e('text')"
          ><slot name="title">{{ title }}</slot></span
        >
        <MoIcon name="chevron-down" :class="ns.e('arrow')" />
      </div>
      <MoCollapseTransition>
        <ul v-show="opened" :class="ns.e('list')" role="menu">
          <slot />
        </ul>
      </MoCollapseTransition>
    </template>
  </li>
</template>
