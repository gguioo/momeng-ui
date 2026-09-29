<script setup lang="ts">
import { computed, ref } from 'vue'
import { iconNames, MoMessage } from 'momeng-ui'

const q = ref('')
const groups: Record<string, string[]> = {
  通用: [
    'check',
    'close',
    'plus',
    'minus',
    'search',
    'arrow-left',
    'arrow-right',
    'arrow-up',
    'arrow-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'chevron-down',
    'menu',
    'more',
    'refresh',
  ],
  状态: ['info', 'success', 'warning', 'error', 'loading'],
  物件: [
    'user',
    'home',
    'setting',
    'edit',
    'delete',
    'eye',
    'eye-off',
    'calendar',
    'clock',
    'bell',
    'copy',
    'link',
    'upload',
    'download',
    'picture',
  ],
  萌: ['heart', 'star', 'sparkle', 'smile', 'cat', 'moon', 'sun'],
  人文: [
    'plum',
    'cloud',
    'brush',
    'fan',
    'lantern',
    'teacup',
    'leaf',
    'mountain',
    'bamboo',
    'scroll',
  ],
}
const filtered = computed(() =>
  Object.entries(groups)
    .map(
      ([k, list]) =>
        [
          k,
          list.filter((n) => iconNames.includes(n as any) && n.includes(q.value.trim())),
        ] as const,
    )
    .filter(([, l]) => l.length),
)
const copy = (n: string) => {
  navigator.clipboard?.writeText(`<MoIcon name="${n}" />`)
  MoMessage.success({ message: `已复制 <MoIcon name="${n}" />`, duration: 1400 })
}
</script>

<template>
  <div class="icon-gallery vp-raw">
    <MoInput
      v-model="q"
      placeholder="搜索图标，比如 plum"
      prefix-icon="search"
      clearable
      style="max-width: 320px"
    />
    <div v-for="[g, list] in filtered" :key="g" class="icon-gallery__group">
      <h4>{{ g }}</h4>
      <div class="icon-gallery__grid">
        <button
          v-for="n in list"
          :key="n"
          type="button"
          class="icon-gallery__item"
          @click="copy(n)"
        >
          <MoIcon :name="n" :size="26" />
          <span>{{ n }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
