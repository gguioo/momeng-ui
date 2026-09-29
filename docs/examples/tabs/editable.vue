<script setup lang="ts">
import { ref } from 'vue'
let seed = 3
const tabs = ref([
  { name: '1', label: '草稿 1' },
  { name: '2', label: '草稿 2' },
])
const active = ref('1')
function add() {
  const name = String(seed++)
  tabs.value.push({ name, label: `草稿 ${name}` })
  active.value = name
}
function remove(name: string | number) {
  const i = tabs.value.findIndex((t) => t.name === name)
  tabs.value.splice(i, 1)
  if (active.value === name) active.value = tabs.value[Math.max(0, i - 1)]?.name ?? ''
}
</script>

<template>
  <MoTabs v-model="active" type="card" closable addable @tab-add="add" @tab-remove="remove">
    <MoTabPane v-for="t in tabs" :key="t.name" :name="t.name" :label="t.label"
      >{{ t.label }} 的内容</MoTabPane
    >
  </MoTabs>
</template>
