<script setup lang="ts">
import { ref } from 'vue'
const active = ref(1)
</script>

<template>
  <MoSteps :active="active">
    <MoStep title="研墨" description="清水一池" />
    <MoStep title="铺纸" description="宣纸一张" />
    <MoStep title="落笔" description="心手相应" />
    <MoStep title="钤印" description="朱砂一方" />
  </MoSteps>
  <MoSpace style="margin-top: 24px">
    <MoButton size="small" icon="chevron-left" :disabled="active <= 0" @click="active--"
      >上一步</MoButton
    >
    <MoButton size="small" type="primary" :disabled="active >= 4" @click="active++"
      >下一步</MoButton
    >
  </MoSpace>
</template>
