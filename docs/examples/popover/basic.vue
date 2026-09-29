<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>

<template>
  <div class="demo-row">
    <MoPopover title="静夜思" content="床前明月光，疑是地上霜。举头望明月，低头思故乡。">
      <MoButton icon="moon">点我读诗</MoButton>
    </MoPopover>
    <MoPopover
      trigger="hover"
      placement="top"
      title="悬停触发"
      content="移入浮层内也不会关闭。"
      :width="200"
    >
      <MoButton text>悬停</MoButton>
    </MoPopover>
    <MoPopover v-model:visible="visible" title="确定要删除吗？" :width="240">
      <MoButton type="danger" plain icon="delete">删除</MoButton>
      <template #content>
        <p style="margin: 0 0 12px">删掉就找不回来啦。</p>
        <MoSpace>
          <MoButton size="small" @click="visible = false">再想想</MoButton>
          <MoButton size="small" type="danger" @click="visible = false">删吧</MoButton>
        </MoSpace>
      </template>
    </MoPopover>
  </div>
</template>
