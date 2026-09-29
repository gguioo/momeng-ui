<script setup lang="ts">
import { h } from 'vue'
import { MoMessage } from 'momeng-ui'
</script>

<template>
  <div class="demo-row">
    <MoButton @click="MoMessage('一条普通消息')">普通</MoButton>
    <MoButton type="primary" @click="MoMessage.primary('墨已研好')">朱砂</MoButton>
    <MoButton type="success" @click="MoMessage.success('保存成功啦')">成功</MoButton>
    <MoButton type="warning" @click="MoMessage.warning('还有内容没填')">警告</MoButton>
    <MoButton type="danger" @click="MoMessage.danger('网络开小差了')">错误</MoButton>
  </div>
  <div class="demo-row">
    <MoButton
      plain
      @click="MoMessage({ message: '点我右边的叉关掉', showClose: true, duration: 0 })"
      >手动关闭</MoButton
    >
    <MoButton
      plain
      @click="MoMessage({ message: '重复消息会合并计数', grouping: true, type: 'info' })"
      >合并重复</MoButton
    >
    <MoButton
      plain
      @click="
        MoMessage({
          message: h('span', [
            '支持 ',
            h('b', { style: 'color: var(--mo-color-primary)' }, 'VNode'),
          ]),
          icon: 'sparkle',
        })
      "
      >VNode</MoButton
    >
    <MoButton text @click="MoMessage.closeAll()">全部关闭</MoButton>
  </div>
</template>
