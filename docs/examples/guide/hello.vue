<script setup lang="ts">
import { ref } from 'vue'
import { MoMessage } from 'momeng-ui'
const name = ref('')
const greet = () => MoMessage.success(`${name.value || '朋友'}，见字如面`)
</script>

<template>
  <MoCard header="见字如面" tape="pink" seal="墨萌" style="max-width: 420px">
    <MoSpace direction="vertical" fill>
      <MoInput v-model="name" placeholder="你的名字" prefix-icon="user" clearable />
      <MoButton type="primary" icon="sparkle" block @click="greet">打个招呼</MoButton>
    </MoSpace>
  </MoCard>
</template>
