<script setup lang="ts">
import { MoMessage, MoMessageBox } from 'momeng-ui'

async function remove() {
  const ok = await MoMessageBox.confirm('这首诗删掉就找不回来啦，确定吗？', '删除确认', {
    danger: true,
    confirmButtonText: '删吧',
  })
  ok ? MoMessage.success('已删除') : MoMessage.info('留下来了')
}
async function save() {
  await MoMessageBox({
    title: '保存中',
    message: '确认后会等待 1 秒再关闭。',
    type: 'primary',
    beforeConfirm: () => new Promise((r) => setTimeout(() => r(true), 1000)),
  })
}
</script>

<template>
  <div class="demo-row">
    <MoButton type="danger" plain icon="delete" @click="remove">删除</MoButton>
    <MoButton
      @click="MoMessageBox.alert('今日宜：写代码、喝茶、摸猫。', '黄历', { type: 'success' })"
      >提示框</MoButton
    >
    <MoButton type="primary" @click="save">异步确认</MoButton>
  </div>
</template>
