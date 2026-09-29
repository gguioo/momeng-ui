<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const dir = ref<'rtl' | 'ltr' | 'ttb' | 'btt'>('rtl')
const open = (d: typeof dir.value) => {
  dir.value = d
  visible.value = true
}
</script>

<template>
  <div class="demo-row">
    <MoButton @click="open('rtl')">从右边</MoButton>
    <MoButton @click="open('ltr')">从左边</MoButton>
    <MoButton @click="open('ttb')">从上边</MoButton>
    <MoButton @click="open('btt')">从下边</MoButton>
  </div>
  <MoDrawer
    v-model="visible"
    :direction="dir"
    title="书签"
    :size="dir === 'rtl' || dir === 'ltr' ? 360 : '40%'"
  >
    <MoTimeline>
      <MoTimelineItem timestamp="卷一">《诗经》</MoTimelineItem>
      <MoTimelineItem timestamp="卷二">《楚辞》</MoTimelineItem>
      <MoTimelineItem timestamp="卷三">《乐府》</MoTimelineItem>
    </MoTimeline>
    <template #footer="{ close }">
      <MoButton @click="close">关闭</MoButton>
      <MoButton type="primary" @click="close">收好</MoButton>
    </template>
  </MoDrawer>
</template>
