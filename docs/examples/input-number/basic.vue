<script setup lang="ts">
import { ref } from 'vue'
const cups = ref(2)
const price = ref(9.9)
const n = ref(6)
</script>

<template>
  <div class="demo-row">
    <MoInputNumber v-model="cups" :min="0" :max="10" />
    <MoInputNumber v-model="price" :step="0.1" :precision="1" />
    <MoInputNumber v-model="n" :step="3" step-strictly controls="right" />
    <MoInputNumber :model-value="1" disabled />
  </div>
</template>
