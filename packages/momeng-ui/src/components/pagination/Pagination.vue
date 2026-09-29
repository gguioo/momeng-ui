<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getPagers, paginationEmits, paginationProps } from './pagination'
import { useNamespace } from '../../composables'
import { clamp } from '../../utils'
import MoIcon from '../icon/Icon.vue'
import MoSelect from '../select/Select.vue'

defineOptions({ name: 'MoPagination' })
const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)
const ns = useNamespace('pagination')

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const current = computed(() => clamp(props.currentPage, 1, pageCount.value))
const pagers = computed(() => getPagers(current.value, pageCount.value, props.pagerCount))
const layout = computed(() =>
  props.layout
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)
const hoverMore = ref<'prev-more' | 'next-more' | null>(null)
const jumpValue = ref('')
const sizeOptions = computed(() => props.pageSizes.map((s) => ({ label: `${s} 条/页`, value: s })))

function go(page: number) {
  if (props.disabled) return
  const p = clamp(page, 1, pageCount.value)
  if (p === props.currentPage) return
  emit('update:currentPage', p)
  emit('change', p, props.pageSize)
}
function onMore(item: 'prev-more' | 'next-more') {
  const step = props.pagerCount - 2
  go(item === 'prev-more' ? current.value - step : current.value + step)
}
function onSize(size: number) {
  emit('update:pageSize', size)
  const maxPage = Math.max(1, Math.ceil(props.total / size))
  const page = Math.min(current.value, maxPage)
  if (page !== props.currentPage) emit('update:currentPage', page)
  emit('change', page, size)
}
function onJump() {
  const n = parseInt(jumpValue.value, 10)
  if (!Number.isNaN(n)) go(n)
  jumpValue.value = ''
}
watch(pageCount, (n) => {
  if (props.currentPage > n) emit('update:currentPage', n)
})
</script>

<template>
  <nav
    v-if="!(hideOnSinglePage && pageCount <= 1)"
    :class="[ns.b(), ns.is('small', small), ns.is('disabled', disabled)]"
    aria-label="分页"
  >
    <template v-for="part in layout" :key="part">
      <span v-if="part === 'total'" :class="ns.e('total')">共 {{ total }} 条</span>

      <MoSelect
        v-else-if="part === 'sizes'"
        :class="ns.e('sizes')"
        :model-value="pageSize"
        :options="sizeOptions"
        :disabled="disabled"
        size="small"
        @change="onSize"
      />

      <button
        v-else-if="part === 'prev'"
        type="button"
        :class="[ns.e('btn'), ns.e('prev')]"
        :disabled="disabled || current <= 1"
        aria-label="上一页"
        @click="go(current - 1)"
      >
        <MoIcon name="chevron-left" />
      </button>

      <ul v-else-if="part === 'pager'" :class="ns.e('pager')">
        <li v-for="item in pagers" :key="item">
          <button
            v-if="typeof item === 'number'"
            type="button"
            :class="[ns.e('item'), ns.is('active', item === current)]"
            :aria-current="item === current ? 'page' : undefined"
            :disabled="disabled"
            @click="go(item)"
          >
            {{ item }}
          </button>
          <button
            v-else
            type="button"
            :class="[ns.e('item'), ns.e('more')]"
            :aria-label="item === 'prev-more' ? '向前翻页' : '向后翻页'"
            :disabled="disabled"
            @mouseenter="hoverMore = item"
            @mouseleave="hoverMore = null"
            @click="onMore(item)"
          >
            <MoIcon
              v-if="hoverMore === item"
              :name="item === 'prev-more' ? 'arrow-left' : 'arrow-right'"
            />
            <MoIcon v-else name="more" />
          </button>
        </li>
      </ul>

      <button
        v-else-if="part === 'next'"
        type="button"
        :class="[ns.e('btn'), ns.e('next')]"
        :disabled="disabled || current >= pageCount"
        aria-label="下一页"
        @click="go(current + 1)"
      >
        <MoIcon name="chevron-right" />
      </button>

      <span v-else-if="part === 'jumper'" :class="ns.e('jumper')">
        前往
        <input
          v-model="jumpValue"
          :class="ns.e('jump-input')"
          inputmode="numeric"
          :disabled="disabled"
          aria-label="页码"
          @keydown.enter="onJump"
          @blur="onJump"
        />
        页
      </span>
    </template>
  </nav>
</template>
