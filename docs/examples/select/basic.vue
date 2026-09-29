<script setup lang="ts">
import { ref } from 'vue'
const tea = ref('')
const poet = ref('dufu')
const options = [
  { label: '西湖龙井', value: 'longjing' },
  { label: '洞庭碧螺春', value: 'biluochun' },
  { label: '安溪铁观音', value: 'tieguanyin' },
  { label: '武夷大红袍', value: 'dahongpao', disabled: true },
]
</script>

<template>
  <div class="demo-row">
    <MoSelect v-model="tea" :options="options" placeholder="来一盏什么茶" clearable />
    <MoSelect v-model="poet">
      <MoOption value="libai" label="李白" />
      <MoOption value="dufu" label="杜甫" />
      <MoOption value="sushi" label="苏轼"
        >苏轼 <MoText type="secondary" size="xs">东坡居士</MoText></MoOption
      >
    </MoSelect>
    <MoSelect disabled placeholder="禁用" />
  </div>
</template>
