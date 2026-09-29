<script setup lang="ts">
import { computed, ref } from 'vue'
import { MoMessage } from 'momeng-ui'

const props = defineProps<{ src: string; title?: string; desc?: string }>()
const modules = import.meta.glob('../../../examples/**/*.vue', { eager: true }) as Record<
  string,
  any
>
const sources = import.meta.glob('../../../examples/**/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const key = computed(() => `../../../examples/${props.src}.vue`)
const comp = computed(() => modules[key.value]?.default)
const raw = computed(() => sources[key.value] ?? '')
const expanded = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(raw.value)
    MoMessage.success({ message: '代码已誊抄到剪贴板', duration: 1600 })
  } catch {
    MoMessage.warning('复制失败了，手动选中试试吧')
  }
}
</script>

<template>
  <div class="demo-block">
    <div v-if="title || desc" class="demo-block__meta">
      <div v-if="desc" class="demo-block__desc" v-html="desc" />
    </div>
    <div class="demo-block__preview vp-raw">
      <component :is="comp" v-if="comp" />
      <p v-else class="demo-block__missing">未找到示例：{{ src }}</p>
    </div>
    <div class="demo-block__bar">
      <button class="demo-block__btn" type="button" @click="copy">
        <MoIcon name="copy" /> 复制
      </button>
      <button
        class="demo-block__btn"
        type="button"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        <MoIcon :name="expanded ? 'chevron-up' : 'brush'" />
        {{ expanded ? '收起代码' : '查看代码' }}
      </button>
    </div>
    <MoCollapseTransition>
      <div v-show="expanded" class="demo-block__code"><slot /></div>
    </MoCollapseTransition>
  </div>
</template>
