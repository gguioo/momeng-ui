<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from 'momeng-ui'
const data = ref([
  { id: 1, tea: '西湖龙井', type: '绿茶', stock: 32, hot: true },
  { id: 2, tea: '正山小种', type: '红茶', stock: 0, hot: false },
  { id: 3, tea: '白毫银针', type: '白茶', stock: 8, hot: true },
])
const columns: TableColumn[] = [
  { prop: 'tea', label: '茶名' },
  { prop: 'type', label: '类别', width: 100 },
  { prop: 'stock', label: '库存', width: 120, sortable: true },
  { prop: 'op', label: '操作', width: 140, align: 'center' },
]
const selected = ref<any[]>([])
</script>

<template>
  <MoTable
    :data="data"
    :columns="columns"
    row-key="id"
    selectable
    border
    @selection-change="selected = $event"
  >
    <template #cell-tea="{ row }">
      <MoSpace size="small"
        >{{ row.tea
        }}<MoTag v-if="row.hot" type="primary" size="small" effect="dark">热</MoTag></MoSpace
      >
    </template>
    <template #cell-stock="{ value }">
      <MoText :type="value ? undefined : 'danger'">{{ value || '售罄' }}</MoText>
    </template>
    <template #cell-op>
      <MoButton text type="primary" size="small" icon="edit">编辑</MoButton>
    </template>
  </MoTable>
  <p style="margin-top: 12px">
    <MoText type="secondary" size="sm">已选 {{ selected.length }} 项</MoText>
  </p>
</template>
