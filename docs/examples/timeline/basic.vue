<script setup lang="ts">
import { ref } from 'vue'
const reverse = ref(false)
</script>

<template>
  <MoSwitch v-model="reverse" active-text="倒序" style="margin-bottom: 16px" />
  <MoTimeline :reverse="reverse">
    <MoTimelineItem timestamp="公元 1037 年" type="primary">苏轼生于眉州眉山</MoTimelineItem>
    <MoTimelineItem timestamp="公元 1057 年" type="success" icon="star"
      >与弟苏辙同榜进士</MoTimelineItem
    >
    <MoTimelineItem timestamp="公元 1080 年" type="warning">贬谪黄州，自号东坡居士</MoTimelineItem>
    <MoTimelineItem timestamp="公元 1082 年" hollow type="info"
      >作《赤壁赋》《定风波》</MoTimelineItem
    >
    <MoTimelineItem timestamp="公元 1101 年" size="large">卒于常州</MoTimelineItem>
  </MoTimeline>
</template>
