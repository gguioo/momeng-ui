<script setup lang="ts">
import { ref } from 'vue'
const agree = ref(true)
const fav = ref(['梅', '竹'])
</script>

<template>
  <div class="demo-col">
    <MoCheckbox v-model="agree">我已读过《兰亭集序》</MoCheckbox>
    <MoCheckboxGroup v-model="fav">
      <MoCheckbox value="梅" />
      <MoCheckbox value="兰" />
      <MoCheckbox value="竹" />
      <MoCheckbox value="菊" disabled />
    </MoCheckboxGroup>
    <MoText type="secondary" size="sm">已选：{{ fav.join('、') || '无' }}</MoText>
  </div>
</template>
