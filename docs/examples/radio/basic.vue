<script setup lang="ts">
import { ref } from 'vue'
const season = ref('春')
const size = ref('中')
</script>

<template>
  <div class="demo-col">
    <MoRadioGroup v-model="season">
      <MoRadio value="春">春</MoRadio>
      <MoRadio value="夏">夏</MoRadio>
      <MoRadio value="秋">秋</MoRadio>
      <MoRadio value="冬" disabled>冬</MoRadio>
    </MoRadioGroup>
    <MoRadioGroup v-model="season">
      <MoRadio v-for="s in ['春', '夏', '秋']" :key="s" :value="s" border>{{ s }}日</MoRadio>
    </MoRadioGroup>
    <MoRadioGroup v-model="size" type="button">
      <MoRadio value="小">小盏</MoRadio>
      <MoRadio value="中">中盏</MoRadio>
      <MoRadio value="大">大碗</MoRadio>
    </MoRadioGroup>
  </div>
</template>
