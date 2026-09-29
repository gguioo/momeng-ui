<script setup lang="ts">
import { ref } from 'vue'
import { MoMessageBox } from 'momeng-ui'
const visible = ref(false)
async function beforeClose(done: () => void) {
  if (await MoMessageBox.confirm('还没保存，确定关闭吗？')) done()
}
</script>

<template>
  <MoButton @click="visible = true">打开</MoButton>
  <MoDialog v-model="visible" title="编辑草稿" :before-close="beforeClose">
    <MoInput type="textarea" placeholder="写点什么……" />
  </MoDialog>
</template>
