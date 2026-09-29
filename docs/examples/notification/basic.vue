<script setup lang="ts">
import { MoNotification } from 'momeng-ui'
const notify = (type: any) =>
  MoNotification({ title: '飞鸽传书', message: '你有一封来自江南的信，请查收。', type })
</script>

<template>
  <div class="demo-row">
    <MoButton @click="notify(undefined)">普通</MoButton>
    <MoButton type="success" @click="notify('success')">成功</MoButton>
    <MoButton type="warning" @click="notify('warning')">警告</MoButton>
    <MoButton type="danger" @click="notify('danger')">错误</MoButton>
    <MoButton
      type="primary"
      plain
      @click="
        MoNotification({
          title: '墨团来信',
          message: '今天也要按时吃饭喔～',
          mascot: true,
          type: 'success',
        })
      "
    >
      墨团送信
    </MoButton>
    <MoButton
      plain
      @click="MoNotification({ title: '左下角', message: '位置可以换', position: 'bottom-left' })"
      >左下角</MoButton
    >
  </div>
</template>
