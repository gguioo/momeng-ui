<script setup lang="ts">
import { ref } from 'vue'
const open = ref(true)
</script>

<template>
  <div class="demo-row" style="align-items: flex-start; gap: 40px">
    <MoScroll v-model:open="open" title="静夜思" seal="太白" :width="260">
      <p style="text-align: center; margin: 0">
        床前明月光，<br />疑是地上霜。<br />举头望明月，<br />低头思故乡。
      </p>
    </MoScroll>
    <MoButton icon="scroll" @click="open = !open">{{ open ? '卷起' : '展开' }}</MoButton>
  </div>
</template>
