<script setup lang="ts">
import { ref } from 'vue'
import { MoLoading } from 'momeng-ui'
const loading = ref(true)
function fullscreen() {
  const l = MoLoading.service({ text: '正在装裱……' })
  setTimeout(() => l.close(), 1500)
}
</script>

<template>
  <MoSpace style="margin-bottom: 16px">
    <MoSwitch v-model="loading" active-text="v-loading" />
    <MoButton size="small" icon="refresh" @click="fullscreen">全屏加载 1.5 秒</MoButton>
  </MoSpace>
  <MoCard v-loading="loading" mo-loading-text="载入诗稿" header="将进酒">
    君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。
  </MoCard>
</template>
