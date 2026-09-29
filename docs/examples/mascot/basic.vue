<script setup lang="ts">
const moods = ['happy', 'calm', 'wink', 'love', 'sleepy', 'surprised', 'sad'] as const
const names = {
  happy: '开心',
  calm: '平静',
  wink: '眨眼',
  love: '心动',
  sleepy: '犯困',
  surprised: '惊讶',
  sad: '难过',
}
</script>

<template>
  <div class="demo-row" style="gap: 28px">
    <div v-for="m in moods" :key="m" style="text-align: center">
      <MoMascot :mood="m" :size="72" />
      <div>
        <MoText type="secondary" size="sm">{{ names[m] }}</MoText>
      </div>
    </div>
  </div>
</template>
