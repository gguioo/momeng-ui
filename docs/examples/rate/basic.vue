<script setup lang="ts">
import { ref } from 'vue'
const a = ref(3)
const b = ref(4)
const c = ref(2.5)
</script>

<template>
  <div class="demo-col">
    <MoRate v-model="a" show-text />
    <MoRate v-model="b" icon="heart" color="var(--mo-color-pink)" clearable />
    <MoRate v-model="c" icon="plum" color="var(--mo-color-primary)" allow-half />
    <MoRate :model-value="4" icon="cat" color="var(--mo-color-info)" readonly />
  </div>
</template>
