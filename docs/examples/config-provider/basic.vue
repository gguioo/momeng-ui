<script setup lang="ts">
import { ref } from 'vue'
const dark = ref(false)
const tidy = ref(false)
</script>

<template>
  <MoSpace style="margin-bottom: 16px">
    <MoSwitch v-model="dark" active-text="墨夜" />
    <MoSwitch v-model="tidy" active-text="工整" />
  </MoSpace>
  <MoConfigProvider
    :tokens="{ 'color-primary': '#5b8c5a' }"
    :theme="dark ? 'dark' : 'light'"
    :tidy="tidy"
    size="small"
    style="padding: 20px; border-radius: 12px"
  >
    <MoSpace wrap>
      <MoButton type="primary" icon="bamboo">竹青主题</MoButton>
      <MoButton type="primary" plain>素雅</MoButton>
      <MoInput placeholder="尺寸都变小了" style="width: 180px" />
      <MoSwitch :model-value="true" />
      <MoTag type="primary">标签</MoTag>
    </MoSpace>
  </MoConfigProvider>
</template>
