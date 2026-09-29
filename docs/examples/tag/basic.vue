<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['春风', '夏荷', '秋月', '冬雪'])
</script>

<template>
  <div class="demo-row">
    <MoTag>默认</MoTag>
    <MoTag type="primary">朱砂</MoTag>
    <MoTag type="success">竹青</MoTag>
    <MoTag type="warning">藤黄</MoTag>
    <MoTag type="danger">胭脂</MoTag>
    <MoTag type="info">花青</MoTag>
  </div>
  <div class="demo-row">
    <MoTag type="primary" effect="dark" icon="plum">浓墨</MoTag>
    <MoTag type="success" effect="dark">竹青</MoTag>
    <MoTag type="warning" effect="dark">藤黄</MoTag>
    <MoTag type="info" effect="plain">白描</MoTag>
    <MoTag type="primary" effect="plain" round>胶囊</MoTag>
    <MoTag color="#8a6fb0">自定义色</MoTag>
  </div>
  <div class="demo-row">
    <MoTag
      v-for="t in tags"
      :key="t"
      type="primary"
      closable
      @close="tags = tags.filter((x) => x !== t)"
      >{{ t }}</MoTag
    >
    <MoTag size="small">小</MoTag>
    <MoTag size="large">大号标签</MoTag>
  </div>
</template>
