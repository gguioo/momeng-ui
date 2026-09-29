<script setup lang="ts">
import { ref } from 'vue'
const a = ref(true)
const b = ref(false)
const c = ref('on')
</script>

<template>
  <div class="demo-col">
    <div class="demo-row">
      <MoSwitch v-model="a" />
      <MoSwitch v-model="b" active-text="开灯" inactive-text="熄灯" />
      <MoSwitch v-model="a" inline-prompt active-text="开" inactive-text="关" />
      <MoSwitch v-model="c" active-value="on" inactive-value="off" :face="false" />
    </div>
    <div class="demo-row">
      <MoSwitch v-model="a" size="small" />
      <MoSwitch v-model="a" />
      <MoSwitch v-model="a" size="large" />
      <MoSwitch :model-value="true" disabled />
      <MoSwitch :model-value="true" loading />
    </div>
  </div>
</template>
