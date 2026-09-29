<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { tableEmits, tableProps, toChineseNumber, type SortOrder, type TableColumn } from './table'
import { useNamespace } from '../../composables'
import { addUnit } from '../../utils'
import MoCheckbox from '../checkbox/Checkbox.vue'
import MoEmpty from '../empty/Empty.vue'
import MoIcon from '../icon/Icon.vue'

defineOptions({ name: 'MoTable' })
const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)
const ns = useNamespace('table')

const sortState = ref<{ prop?: string; order: SortOrder }>({
  prop: props.defaultSort?.prop,
  order: props.defaultSort?.order ?? null,
})
const selected = ref(new Set<any>())
const currentRow = ref<any>()

const getKey = (row: any, i: number) => {
  if (typeof props.rowKey === 'function') return props.rowKey(row)
  if (typeof props.rowKey === 'string') return row[props.rowKey]
  return i
}
const getValue = (row: any, prop?: string) =>
  prop ? prop.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), row) : undefined

const sortedData = computed(() => {
  const { prop, order } = sortState.value
  if (!prop || !order) return props.data
  const col = props.columns.find((c) => c.prop === prop)
  const cmp =
    typeof col?.sortable === 'function'
      ? col.sortable
      : (a: any, b: any) => {
          const x = getValue(a, prop)
          const y = getValue(b, prop)
          if (x === y) return 0
          return x > y ? 1 : -1
        }
  const list = [...props.data].sort(cmp)
  return order === 'descending' ? list.reverse() : list
})

function toggleSort(col: TableColumn) {
  if (!col.sortable || !col.prop) return
  const orders: SortOrder[] = ['ascending', 'descending', null]
  const cur = sortState.value.prop === col.prop ? sortState.value.order : null
  const next = orders[(orders.indexOf(cur) + 1) % 3]
  sortState.value = { prop: next ? col.prop : undefined, order: next }
  emit('sort-change', { prop: col.prop, order: next })
}

const allChecked = computed(
  () => props.data.length > 0 && props.data.every((r) => selected.value.has(r)),
)
const someChecked = computed(
  () => !allChecked.value && props.data.some((r) => selected.value.has(r)),
)
function emitSelection() {
  emit(
    'selection-change',
    props.data.filter((r) => selected.value.has(r)),
  )
}
function toggleRow(row: any) {
  const s = new Set(selected.value)
  s.has(row) ? s.delete(row) : s.add(row)
  selected.value = s
  emitSelection()
}
function toggleAll() {
  selected.value = allChecked.value ? new Set() : new Set(props.data)
  emitSelection()
}
watch(
  () => props.data,
  () => {
    const s = new Set([...selected.value].filter((r) => props.data.includes(r)))
    if (s.size !== selected.value.size) {
      selected.value = s
      emitSelection()
    }
  },
)

function onRowClick(row: any, i: number, e: MouseEvent) {
  emit('row-click', row, i, e)
  if (props.highlightCurrentRow && currentRow.value !== row) {
    currentRow.value = row
    emit('current-change', row)
  }
}
function cellText(row: any, col: TableColumn, i: number) {
  const v = getValue(row, col.prop)
  return col.formatter ? col.formatter(row, col, v, i) : (v ?? '')
}
const colStyle = (col: TableColumn) => ({
  width: addUnit(col.width),
  minWidth: addUnit(col.minWidth),
})

defineExpose({
  clearSelection: () => {
    selected.value = new Set()
    emitSelection()
  },
  toggleRowSelection: toggleRow,
  getSelectionRows: () => props.data.filter((r) => selected.value.has(r)),
  clearSort: () => (sortState.value = { prop: undefined, order: null }),
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('stripe', stripe),
      ns.is('border', border),
      ns.is('loading', loading),
    ]"
    :style="{ maxHeight: addUnit(maxHeight) }"
  >
    <table :class="ns.e('inner')">
      <colgroup>
        <col v-if="selectable" style="width: 48px" />
        <col v-if="showIndex" style="width: 56px" />
        <col v-for="(col, ci) in columns" :key="ci" :style="colStyle(col)" />
      </colgroup>
      <thead :class="ns.e('head')">
        <tr>
          <th v-if="selectable" :class="ns.e('cell')" style="text-align: center">
            <MoCheckbox
              :model-value="allChecked"
              :indeterminate="someChecked"
              aria-label="全选"
              @change="toggleAll"
            />
          </th>
          <th v-if="showIndex" :class="ns.e('cell')" style="text-align: center">序</th>
          <th
            v-for="(col, ci) in columns"
            :key="ci"
            :class="[
              ns.e('cell'),
              ns.is('sortable', !!col.sortable),
              col.fixed && ns.is(`fixed-${col.fixed}`, true),
            ]"
            :style="{ textAlign: col.align }"
            :aria-sort="
              sortState.prop === col.prop && sortState.order ? sortState.order : undefined
            "
            @click="toggleSort(col)"
          >
            <slot :name="`header-${col.prop}`" :column="col">{{ col.label }}</slot>
            <span
              v-if="col.sortable"
              :class="[
                ns.e('sorter'),
                sortState.prop === col.prop && sortState.order && `is-${sortState.order}`,
              ]"
            >
              <MoIcon name="chevron-up" /><MoIcon name="chevron-down" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody :class="ns.e('body')">
        <tr
          v-for="(row, ri) in sortedData"
          :key="getKey(row, ri)"
          :class="[
            ns.e('row'),
            ns.is('selected', selected.has(row)),
            ns.is('current', currentRow === row),
          ]"
          @click="onRowClick(row, ri, $event)"
        >
          <td v-if="selectable" :class="ns.e('cell')" style="text-align: center" @click.stop>
            <MoCheckbox
              :model-value="selected.has(row)"
              aria-label="选择此行"
              @change="toggleRow(row)"
            />
          </td>
          <td v-if="showIndex" :class="[ns.e('cell'), ns.e('index')]">
            {{ toChineseNumber(ri + 1) }}
          </td>
          <td
            v-for="(col, ci) in columns"
            :key="ci"
            :class="[
              ns.e('cell'),
              ns.is('ellipsis', !!col.ellipsis),
              col.fixed && ns.is(`fixed-${col.fixed}`, true),
            ]"
            :style="{ textAlign: col.align }"
          >
            <slot
              :name="`cell-${col.prop}`"
              :row="row"
              :column="col"
              :index="ri"
              :value="getValue(row, col.prop)"
            >
              {{ cellText(row, col, ri) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!sortedData.length" :class="ns.e('empty')">
      <slot name="empty"><MoEmpty :description="emptyText" :image-size="72" /></slot>
    </div>
    <div v-if="loading" :class="ns.e('mask')">
      <MoIcon name="loading" spin :size="28" />
    </div>
  </div>
</template>
