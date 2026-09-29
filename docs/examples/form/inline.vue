<script setup lang="ts">
import { reactive } from 'vue'
const q = reactive({ keyword: '', dynasty: '' })
</script>

<template>
  <MoForm inline :model="q">
    <MoFormItem label="关键词"
      ><MoInput v-model="q.keyword" placeholder="月" style="width: 160px"
    /></MoFormItem>
    <MoFormItem label="朝代">
      <MoSelect
        v-model="q.dynasty"
        :options="[
          { label: '唐', value: 'tang' },
          { label: '宋', value: 'song' },
        ]"
        style="width: 120px"
      />
    </MoFormItem>
    <MoFormItem><MoButton type="primary" icon="search">查找</MoButton></MoFormItem>
  </MoForm>
  <MoForm label-position="top" style="max-width: 320px">
    <MoFormItem label="标签在上方" required
      ><MoInput placeholder="适合移动端与窄布局"
    /></MoFormItem>
  </MoForm>
</template>
