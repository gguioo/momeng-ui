<script setup lang="ts">
import { ref } from 'vue'
const picked = ref(['plum', 'bamboo'])
const city = ref('')
const flowers = [
  { label: '梅', value: 'plum' },
  { label: '兰', value: 'orchid' },
  { label: '竹', value: 'bamboo' },
  { label: '菊', value: 'mum' },
  { label: '荷', value: 'lotus' },
]
const cities = ['长安', '洛阳', '金陵', '临安', '扬州', '苏州', '汴京'].map((c) => ({
  label: c,
  value: c,
}))
</script>

<template>
  <div class="demo-row">
    <MoSelect v-model="picked" :options="flowers" multiple clearable style="width: 280px" />
    <MoSelect v-model="city" :options="cities" filterable placeholder="输入城名搜索" />
  </div>
</template>
