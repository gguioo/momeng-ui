<script setup lang="ts">
import { ref } from 'vue'
const page = ref(6)
const page2 = ref(1)
const size = ref(10)
</script>

<template>
  <div class="demo-col">
    <MoPagination v-model:current-page="page" :total="200" />
    <MoPagination
      v-model:current-page="page2"
      v-model:page-size="size"
      :total="428"
      layout="total, sizes, prev, pager, next, jumper"
    />
    <MoPagination :total="50" small />
  </div>
</template>
