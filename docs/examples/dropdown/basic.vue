<script setup lang="ts">
import { MoMessage } from 'momeng-ui'
const onCommand = (c: any) => MoMessage(`选择了：${c}`)
</script>

<template>
  <div class="demo-row">
    <MoDropdown @command="onCommand">
      <MoButton icon="menu">悬停展开</MoButton>
      <template #dropdown>
        <MoDropdownItem command="编辑" icon="edit">编辑</MoDropdownItem>
        <MoDropdownItem command="复制" icon="copy">复制</MoDropdownItem>
        <MoDropdownItem command="分享" icon="link" disabled>分享</MoDropdownItem>
        <MoDropdownItem command="删除" icon="delete" divided danger>删除</MoDropdownItem>
      </template>
    </MoDropdown>
    <MoDropdown trigger="click" placement="bottom-end" @command="onCommand">
      <MoButton type="primary" plain>点击展开 <MoIcon name="chevron-down" /></MoButton>
      <template #dropdown>
        <MoDropdownItem command="龙井">🍵 龙井</MoDropdownItem>
        <MoDropdownItem command="普洱">🫖 普洱</MoDropdownItem>
      </template>
    </MoDropdown>
    <MoDropdown trigger="contextmenu" @command="onCommand">
      <div style="padding: 18px 28px; border: 2px dashed var(--mo-color-line); border-radius: 12px">
        在这里点右键
      </div>
      <template #dropdown>
        <MoDropdownItem command="刷新" icon="refresh">刷新</MoDropdownItem>
        <MoDropdownItem command="收藏" icon="star">收藏</MoDropdownItem>
      </template>
    </MoDropdown>
  </div>
</template>
