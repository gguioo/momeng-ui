<script setup lang="ts">
import { MoMessage } from 'momeng-ui'

const groups = [
  {
    title: '语义色',
    colors: [
      {
        name: '朱砂',
        en: 'Cinnabar',
        token: 'primary',
        hex: '#cf4a37',
        use: '主色 · 印章、主要行动点',
      },
      { name: '竹青', en: 'Bamboo', token: 'success', hex: '#6f9a5c', use: '成功 · 完成、通过' },
      { name: '藤黄', en: 'Gamboge', token: 'warning', hex: '#e3a23b', use: '警示 · 提醒、待处理' },
      { name: '胭脂', en: 'Rouge', token: 'danger', hex: '#b3303d', use: '危险 · 错误、删除' },
      { name: '花青', en: 'Indigo', token: 'info', hex: '#4f7391', use: '信息 · 中性提示' },
      { name: '桃夭', en: 'Peach Bloom', token: 'pink', hex: '#f2a7b5', use: '萌点 · 腮红、装饰' },
    ],
  },
]
const neutrals = [
  { name: '宣纸', token: 'paper', hex: '#faf5e9', use: '页面底色' },
  { name: '素绢', token: 'paper-light', hex: '#fffdf6', use: '卡片、输入框' },
  { name: '缃色', token: 'paper-deep', hex: '#f1e7d2', use: '悬停、禁用底' },
  { name: '界格', token: 'line', hex: '#ddd1bc', use: '分割线' },
  { name: '飞白', token: 'ink-4', hex: '#b9ae9f', use: '占位文字' },
  { name: '枯墨', token: 'ink-3', hex: '#8a8078', use: '辅助说明' },
  { name: '淡墨', token: 'ink-2', hex: '#564f49', use: '次要文字' },
  { name: '松烟墨', token: 'ink', hex: '#2d2926', use: '正文、描边' },
]
const steps = ['', '-light-3', '-light-5', '-light-7', '-light-8', '-light-9']
const copy = (v: string) => {
  navigator.clipboard?.writeText(v)
  MoMessage.success({ message: `已复制 ${v}`, duration: 1400 })
}
</script>

<template>
  <div class="palette vp-raw">
    <div v-for="g in groups" :key="g.title" class="palette__grid">
      <div v-for="c in g.colors" :key="c.token" class="palette__card">
        <div
          class="palette__swatch"
          :style="{ background: `var(--mo-color-${c.token})` }"
          @click="copy(`var(--mo-color-${c.token})`)"
        >
          <span class="palette__cn">{{ c.name }}</span>
          <span class="palette__en">{{ c.en }}</span>
        </div>
        <div class="palette__steps">
          <span
            v-for="s in steps"
            :key="s"
            :style="{ background: `var(--mo-color-${c.token}${s})` }"
            :title="`--mo-color-${c.token}${s}`"
            @click="copy(`var(--mo-color-${c.token}${s})`)"
          />
        </div>
        <div class="palette__info">
          <code>--mo-color-{{ c.token }}</code>
          <span>{{ c.hex }}</span>
        </div>
        <p class="palette__use">{{ c.use }}</p>
      </div>
    </div>
    <h3 class="palette__title">纸与墨 · 中性色</h3>
    <div class="palette__neutrals">
      <div
        v-for="n in neutrals"
        :key="n.token"
        class="palette__neutral"
        @click="copy(`var(--mo-color-${n.token})`)"
      >
        <span class="palette__chip" :style="{ background: `var(--mo-color-${n.token})` }" />
        <b>{{ n.name }}</b>
        <code>{{ n.token }}</code>
        <small>{{ n.use }}</small>
      </div>
    </div>
  </div>
</template>
