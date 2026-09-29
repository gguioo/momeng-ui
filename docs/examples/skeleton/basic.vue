<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>

<template>
  <MoSwitch v-model="loading" active-text="加载中" style="margin-bottom: 18px" />
  <MoSkeleton :loading="loading" avatar :rows="3">
    <MoSpace align="start">
      <MoAvatar size="large">苏</MoAvatar>
      <div>
        <MoText bold>苏轼</MoText>
        <p style="margin: 6px 0 0">竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。</p>
      </div>
    </MoSpace>
  </MoSkeleton>
</template>
