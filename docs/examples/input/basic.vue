<script setup lang="ts">
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('一蓑烟雨任平生')
const pwd = ref('')
</script>

<template>
  <div class="demo-col" style="max-width: 360px">
    <MoInput v-model="v1" placeholder="写点什么吧" />
    <MoInput v-model="v2" clearable prefix-icon="brush" />
    <MoInput v-model="pwd" type="password" show-password placeholder="暗号" prefix-icon="eye-off" />
    <MoInput placeholder="禁用状态" disabled />
  </div>
</template>
