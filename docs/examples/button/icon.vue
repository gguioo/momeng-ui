<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
function submit() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1600)
}
</script>

<template>
  <div class="demo-row">
    <MoButton type="primary" icon="brush">落笔</MoButton>
    <MoButton icon="upload">上传</MoButton>
    <MoButton type="primary" :loading="loading" @click="submit">
      {{ loading ? '研墨中' : '点我提交' }}
    </MoButton>
    <MoButton disabled>禁用</MoButton>
    <MoButton type="primary" disabled>禁用</MoButton>
  </div>
</template>
