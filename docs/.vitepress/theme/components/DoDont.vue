<script setup lang="ts">
defineProps<{ doText?: string; dontText?: string }>()
</script>

<template>
  <div class="do-dont">
    <div class="do-dont__item do-dont__item--do">
      <div class="do-dont__stage vp-raw"><slot name="do" /></div>
      <p><MoTag type="success" effect="dark" size="small" icon="check">宜</MoTag> {{ doText }}</p>
    </div>
    <div class="do-dont__item do-dont__item--dont">
      <div class="do-dont__stage vp-raw"><slot name="dont" /></div>
      <p><MoTag type="danger" effect="dark" size="small" icon="close">忌</MoTag> {{ dontText }}</p>
    </div>
  </div>
</template>
