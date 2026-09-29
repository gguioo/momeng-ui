<script setup lang="ts">
import { ref } from 'vue'
const active = ref('tang')
const collapse = ref(false)
</script>

<template>
  <MoSwitch v-model="collapse" active-text="折叠" style="margin-bottom: 12px" />
  <MoMenu v-model="active" :default-openeds="['poem']" :collapse="collapse">
    <MoMenuItem index="home" icon="home">书房</MoMenuItem>
    <MoSubMenu index="poem" title="诗词" icon="brush">
      <MoMenuItem index="tang">唐诗</MoMenuItem>
      <MoMenuItem index="song">宋词</MoMenuItem>
      <MoSubMenu index="more" title="更多">
        <MoMenuItem index="yuan">元曲</MoMenuItem>
        <MoMenuItem index="ming">明清小品</MoMenuItem>
      </MoSubMenu>
    </MoSubMenu>
    <MoMenuItemGroup title="雅集">
      <MoMenuItem index="tea" icon="teacup">茶</MoMenuItem>
      <MoMenuItem index="fan" icon="fan">扇</MoMenuItem>
    </MoMenuItemGroup>
    <MoMenuItem index="lock" icon="setting" disabled>设置</MoMenuItem>
  </MoMenu>
</template>
