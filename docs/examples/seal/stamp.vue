<script setup lang="ts">
import { ref } from 'vue'
const key = ref(0)
</script>

<template>
  <div class="demo-row" style="gap: 24px">
    <MoSeal :key="key" text="准" :size="72" stamp />
    <MoSeal :key="key + 100" text="已阅" :size="72" type="zhu" stamp />
    <MoButton icon="refresh" @click="key++">再盖一次</MoButton>
  </div>
</template>
