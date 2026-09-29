<script setup lang="ts">
import { computed } from 'vue'
import { mascotProps } from './mascot'
import { useNamespace } from '../../composables'
import { addUnit } from '../../utils'

defineOptions({ name: 'MoMascot' })
const props = defineProps(mascotProps)
const ns = useNamespace('mascot')
const moodLabel: Record<string, string> = {
  happy: '开心',
  calm: '平静',
  wink: '眨眼',
  sleepy: '犯困',
  sad: '难过',
  surprised: '惊讶',
  love: '心动',
}
const style = computed(() => ({
  width: addUnit(props.size),
  height: addUnit(props.size),
  '--mo-mascot-body': props.color,
}))
</script>

<template>
  <span
    :class="[ns.b(), ns.m(mood), ns.is('animated', animated)]"
    :style="style"
    role="img"
    :aria-label="`墨团（${moodLabel[mood]}）`"
  >
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 墨滴飞溅 -->
      <circle :class="ns.e('drop')" cx="88" cy="78" r="3.2" />
      <circle :class="ns.e('drop')" cx="12" cy="30" r="2.2" />
      <!-- 身体：一团不太圆的墨 -->
      <path
        :class="ns.e('body')"
        d="M50 16c9-.4 14-5.2 18-3 3 1.8.2 5.6 3.2 7.8C81 27 88 37 88.4 52c.4 19-15 33.6-38 34-22.6.4-38.2-13.4-38.6-33C11.4 32 27 16.6 50 16z"
      />
      <!-- 头顶一撇，像毛笔收锋 -->
      <path :class="ns.e('tuft')" d="M56 16.4c-1.6-4.6.6-8.8 5.4-10.4-1.4 3.4-1.2 6.4.6 9.2" />
      <!-- 高光 -->
      <path :class="ns.e('shine')" d="M26 42c1.4-7 6-12.4 12.6-15" />
      <!-- 腮红 -->
      <ellipse :class="ns.e('blush')" cx="28" cy="61" rx="7" ry="4" />
      <ellipse :class="ns.e('blush')" cx="72" cy="61" rx="7" ry="4" />
      <!-- 五官 -->
      <g :class="ns.e('face')">
        <template v-if="mood === 'happy'">
          <path d="M31 51q5-7 10 0M59 51q5-7 10 0" />
          <path d="M43 60q3.5 4.5 7 0q3.5 4.5 7 0" />
        </template>
        <template v-else-if="mood === 'calm'">
          <ellipse class="fill" cx="36" cy="50" rx="3.4" ry="4.4" />
          <ellipse class="fill" cx="64" cy="50" rx="3.4" ry="4.4" />
          <path d="M43 60q3.5 4.5 7 0q3.5 4.5 7 0" />
        </template>
        <template v-else-if="mood === 'wink'">
          <path d="M31 51q5-7 10 0" />
          <ellipse class="fill" cx="64" cy="50" rx="3.4" ry="4.4" />
          <path d="M44 60q6 6 12 0" />
          <path class="tongue" d="M48.5 62.6q1.5 3.6 3 0" />
        </template>
        <template v-else-if="mood === 'sleepy'">
          <path d="M31 51q5 4 10 0M59 51q5 4 10 0" />
          <ellipse cx="50" cy="63" rx="2.6" ry="3" />
          <path class="zzz" d="M76 20h7l-7 8h7M86 10h5l-5 6h5" />
        </template>
        <template v-else-if="mood === 'sad'">
          <path d="M31 48q5 3 10 1M59 49q5 2 10-1" />
          <ellipse class="fill" cx="36" cy="53" rx="2.8" ry="3.4" />
          <ellipse class="fill" cx="64" cy="53" rx="2.8" ry="3.4" />
          <path d="M44 65q6-5 12 0" />
          <path class="tear" d="M66 58c-2 4-2 6.6 0 7.4 2-.8 2-3.4 0-7.4z" />
        </template>
        <template v-else-if="mood === 'surprised'">
          <circle cx="36" cy="50" r="4.6" />
          <circle cx="64" cy="50" r="4.6" />
          <ellipse cx="50" cy="63" rx="4" ry="5" />
        </template>
        <template v-else>
          <path
            class="heart"
            d="M36 55c-4-2.6-7-5-7-8 0-2 1.5-3.4 3.3-3.4 1.6 0 2.8 1 3.7 2.4.9-1.4 2.1-2.4 3.7-2.4 1.8 0 3.3 1.4 3.3 3.4 0 3-3 5.4-7 8z"
          />
          <path
            class="heart"
            d="M64 55c-4-2.6-7-5-7-8 0-2 1.5-3.4 3.3-3.4 1.6 0 2.8 1 3.7 2.4.9-1.4 2.1-2.4 3.7-2.4 1.8 0 3.3 1.4 3.3 3.4 0 3-3 5.4-7 8z"
          />
          <path d="M43 61q3.5 4.5 7 0q3.5 4.5 7 0" />
        </template>
      </g>
    </svg>
  </span>
</template>
