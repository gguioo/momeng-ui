<script setup lang="ts">
import { ref } from 'vue'
const letter = ref('见字如面：\n今日得闲，研墨一池，写几行字寄你。')
</script>

<template>
  <div style="max-width: 460px">
    <MoInput
      v-model="letter"
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 8 }"
      maxlength="120"
      show-word-limit
      placeholder="见字如面……"
    />
  </div>
</template>
