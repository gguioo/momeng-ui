<script setup lang="ts">
import { ref } from 'vue'
const p = ref(40)
</script>

<template>
  <div class="demo-col" style="max-width: 480px">
    <MoProgress :percentage="p" />
    <MoProgress :percentage="100" status="success" />
    <MoProgress :percentage="70" status="warning" striped />
    <MoProgress :percentage="30" status="danger" />
    <MoProgress :percentage="66" :stroke-width="20" text-inside striped />
    <MoProgress :percentage="50" indeterminate :show-text="false" />
    <MoSpace>
      <MoButton size="small" icon="minus" @click="p = Math.max(0, p - 10)" />
      <MoButton size="small" icon="plus" @click="p = Math.min(100, p + 10)" />
    </MoSpace>
  </div>
</template>
