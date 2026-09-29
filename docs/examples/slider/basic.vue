<script setup lang="ts">
import { ref } from 'vue'
const v = ref(36)
const range = ref<[number, number]>([20, 60])
const time = ref(50)
</script>

<template>
  <div class="demo-col" style="max-width: 460px; gap: 28px">
    <MoSlider v-model="v" />
    <MoSlider v-model="range" range show-stops :step="10" />
    <MoSlider
      v-model="time"
      :marks="{ 0: '子', 25: '卯', 50: '午', 75: '酉', 100: '亥' }"
      :step="25"
      :format-tooltip="(n) => `${n}%`"
    />
    <MoSlider :model-value="40" disabled />
  </div>
</template>
