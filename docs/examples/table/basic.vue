<script setup lang="ts">
import type { TableColumn } from 'momeng-ui'
const data = [
  { name: '李白', dynasty: '唐', alias: '青莲居士', works: 1010 },
  { name: '杜甫', dynasty: '唐', alias: '少陵野老', works: 1500 },
  { name: '苏轼', dynasty: '宋', alias: '东坡居士', works: 2700 },
  { name: '李清照', dynasty: '宋', alias: '易安居士', works: 90 },
]
const columns: TableColumn[] = [
  { prop: 'name', label: '姓名', width: 110 },
  { prop: 'dynasty', label: '朝代', width: 80, align: 'center' },
  { prop: 'alias', label: '号' },
  {
    prop: 'works',
    label: '存世作品',
    sortable: true,
    align: 'right',
    formatter: (_r, _c, v) => `${v} 首`,
  },
]
</script>

<template>
  <MoTable :data="data" :columns="columns" stripe show-index />
</template>
