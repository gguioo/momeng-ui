<script setup lang="ts">
import { ref } from 'vue'
import { MoMessage } from 'momeng-ui'
const on = ref(false)
const beforeChange = () =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => {
      MoMessage.success('服务器同意啦')
      resolve(true)
    }, 1000)
  })
</script>

<template>
  <MoSwitch v-model="on" :before-change="beforeChange" active-text="异步切换" />
</template>
