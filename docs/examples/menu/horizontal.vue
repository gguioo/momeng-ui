<script setup lang="ts">
import { ref } from 'vue'
const active = ref('1')
</script>

<template>
  <MoMenu v-model="active" mode="horizontal">
    <MoMenuItem index="1">首页</MoMenuItem>
    <MoMenuItem index="2">组件</MoMenuItem>
    <MoSubMenu index="3" title="更多">
      <MoMenuItem index="3-1">设计规范</MoMenuItem>
      <MoMenuItem index="3-2">更新日志</MoMenuItem>
    </MoSubMenu>
    <MoMenuItem index="4">关于</MoMenuItem>
  </MoMenu>
</template>
