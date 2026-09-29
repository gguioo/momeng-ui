<script setup lang="ts">
import { computed } from 'vue'
import { layoutSeal, sealProps } from './seal'
import { useId, useNamespace } from '../../composables'
import { addUnit, seededRandom } from '../../utils'

defineOptions({ name: 'MoSeal' })
const props = defineProps(sealProps)
const ns = useNamespace('seal')
const uid = useId('mo-seal')

const glyphs = computed(() => layoutSeal(props.text))
const seed = computed(() => Math.floor(seededRandom(props.text)() * 100))
const angle = computed(() => {
  if (typeof props.tilt === 'number') return props.tilt
  if (!props.tilt) return 0
  return Math.round((seededRandom(`${props.text}-tilt`)() * 10 - 5) * 10) / 10
})
const isOval = computed(() => props.shape === 'oval')
const viewBox = computed(() => (isOval.value ? '0 0 100 130' : '0 0 100 100'))
const offsetY = computed(() => (isOval.value ? 15 : 0))
const style = computed(() => ({
  width: addUnit(props.size),
  height: isOval.value ? `calc(${addUnit(props.size)} * 1.3)` : addUnit(props.size),
  color: props.color,
  '--mo-seal-angle': `${angle.value}deg`,
}))
</script>

<template>
  <span
    :class="[ns.b(), ns.m(type), ns.m(shape), ns.is('stamp', stamp)]"
    :style="style"
    role="img"
    :aria-label="`印章：${text}`"
  >
    <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter v-if="weathered" :id="`${uid}-f`" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            :seed="seed"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="3.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="2"
            :seed="seed + 7"
            result="speck"
          />
          <feColorMatrix
            in="speck"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -9 0 0 0 6.6"
            result="mask"
          />
          <feComposite in="rough" in2="mask" operator="in" />
        </filter>
        <mask v-if="type === 'bai'" :id="`${uid}-m`">
          <rect x="0" y="0" width="100" height="130" fill="white" />
          <g fill="black">
            <text
              v-for="(g, i) in glyphs"
              :key="i"
              :class="ns.e('char')"
              :font-size="g.size"
              text-anchor="middle"
              dominant-baseline="central"
              :transform="`translate(${g.x} ${g.y + offsetY}) scale(1 ${g.scaleY ?? 1})`"
            >
              {{ g.char }}
            </text>
          </g>
        </mask>
      </defs>

      <g
        :filter="weathered ? `url(#${uid}-f)` : undefined"
        fill="currentColor"
        stroke="currentColor"
      >
        <!-- 白文：整块印面，镂空文字 -->
        <template v-if="type === 'bai'">
          <rect
            v-if="shape === 'square'"
            x="4"
            y="4"
            width="92"
            height="92"
            rx="6"
            stroke="none"
            :mask="`url(#${uid}-m)`"
          />
          <circle
            v-else-if="shape === 'round'"
            cx="50"
            cy="50"
            r="46"
            stroke="none"
            :mask="`url(#${uid}-m)`"
          />
          <ellipse v-else cx="50" cy="65" rx="46" ry="61" stroke="none" :mask="`url(#${uid}-m)`" />
        </template>
        <!-- 朱文：边框 + 红字 -->
        <template v-else>
          <rect
            v-if="shape === 'square'"
            x="6"
            y="6"
            width="88"
            height="88"
            rx="5"
            fill="none"
            stroke-width="6"
          />
          <circle
            v-else-if="shape === 'round'"
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke-width="6"
          />
          <ellipse v-else cx="50" cy="65" rx="44" ry="59" fill="none" stroke-width="6" />
          <text
            v-for="(g, i) in glyphs"
            :key="i"
            :class="ns.e('char')"
            stroke="none"
            :font-size="g.size"
            text-anchor="middle"
            dominant-baseline="central"
            :transform="`translate(${g.x} ${g.y + offsetY}) scale(1 ${g.scaleY ?? 1})`"
          >
            {{ g.char }}
          </text>
        </template>
      </g>
    </svg>
  </span>
</template>
