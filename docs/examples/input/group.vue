<script setup lang="ts">
import { ref } from 'vue'
const url = ref('momeng')
const q = ref('')
</script>

<template>
  <div class="demo-col" style="max-width: 420px">
    <MoInput v-model="url">
      <template #prepend>https://</template>
      <template #append>.com</template>
    </MoInput>
    <MoInput v-model="q" placeholder="搜一首诗">
      <template #append><MoButton icon="search" /></template>
    </MoInput>
  </div>
</template>
