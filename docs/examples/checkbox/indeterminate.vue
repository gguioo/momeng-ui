<script setup lang="ts">
import { computed, ref } from 'vue'
const all = ['春', '夏', '秋', '冬']
const picked = ref(['春'])
const checkAll = computed(() => picked.value.length === all.length)
const partial = computed(() => picked.value.length > 0 && !checkAll.value)
const toggleAll = (v: any) => (picked.value = v ? [...all] : [])
</script>

<template>
  <div class="demo-col">
    <MoCheckbox :model-value="checkAll" :indeterminate="partial" @change="toggleAll"
      >四季全要</MoCheckbox
    >
    <MoCheckboxGroup v-model="picked">
      <MoCheckbox v-for="s in all" :key="s" :value="s" />
    </MoCheckboxGroup>
    <MoCheckboxGroup :model-value="['琴']" :max="2">
      <MoCheckbox v-for="s in ['琴', '棋', '书', '画']" :key="s" :value="s" border />
    </MoCheckboxGroup>
  </div>
</template>
