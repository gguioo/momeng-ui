<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const letter = ref(false)
</script>

<template>
  <div class="demo-row">
    <MoButton type="primary" @click="visible = true">打开对话框</MoButton>
    <MoButton icon="scroll" @click="letter = true">打开信笺</MoButton>
  </div>
  <MoDialog v-model="visible" title="提示" width="420px">
    <p>这是一段对话框里的内容。点击遮罩、按 ESC 或右上角都可以关闭。</p>
    <template #footer="{ close }">
      <MoButton @click="close">取消</MoButton>
      <MoButton type="primary" @click="visible = false">好的</MoButton>
    </template>
  </MoDialog>
  <MoDialog v-model="letter" title="与元微之书" seal="乐天" lined width="520px" align-center>
    <p style="line-height: 2.2">
      微之微之！不见足下面已三年矣，不得足下书欲二年矣，人生几何，离阔如此？况以胶漆之心，置于胡越之身，进不得相合，退不能相忘，牵挛乖隔，各欲白首。
    </p>
  </MoDialog>
</template>
