<script setup lang="ts">
import { ref } from 'vue'
const a = ref('poem')
const b = ref('poem')
const c = ref('poem')
</script>

<template>
  <MoTabs v-model="a">
    <MoTabPane name="poem" label="诗" icon="brush">床前明月光，疑是地上霜。</MoTabPane>
    <MoTabPane name="ci" label="词">明月几时有？把酒问青天。</MoTabPane>
    <MoTabPane name="qu" label="曲">枯藤老树昏鸦，小桥流水人家。</MoTabPane>
    <MoTabPane name="fu" label="赋" disabled>……</MoTabPane>
  </MoTabs>
  <MoTabs v-model="b" type="card">
    <MoTabPane name="poem" label="唐诗">唐诗三百首</MoTabPane>
    <MoTabPane name="ci" label="宋词">宋词三百首</MoTabPane>
    <MoTabPane name="qu" label="元曲">元曲三百首</MoTabPane>
  </MoTabs>
  <MoTabs v-model="c" type="bookmark">
    <MoTabPane name="poem" label="卷一">第一卷 · 春</MoTabPane>
    <MoTabPane name="ci" label="卷二">第二卷 · 夏</MoTabPane>
    <MoTabPane name="qu" label="卷三">第三卷 · 秋</MoTabPane>
  </MoTabs>
</template>
