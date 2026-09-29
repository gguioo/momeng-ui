<script setup lang="ts">
import { withBase } from 'vitepress'
import { componentGroups } from '../../sidebar'

const icons: Record<string, string> = {
  button: 'sparkle',
  icon: 'star',
  text: 'edit',
  link: 'link',
  divider: 'minus',
  space: 'menu',
  grid: 'setting',
  seal: 'plum',
  mascot: 'smile',
  'config-provider': 'setting',
  input: 'edit',
  'input-number': 'plus',
  checkbox: 'check',
  radio: 'success',
  switch: 'sun',
  slider: 'arrow-right',
  rate: 'heart',
  select: 'chevron-down',
  form: 'scroll',
  card: 'picture',
  tag: 'bamboo',
  badge: 'bell',
  avatar: 'user',
  tooltip: 'info',
  popover: 'cloud',
  collapse: 'chevron-down',
  tabs: 'fan',
  timeline: 'clock',
  table: 'menu',
  pagination: 'more',
  progress: 'loading',
  empty: 'moon',
  skeleton: 'mountain',
  scroll: 'scroll',
  alert: 'warning',
  message: 'bell',
  notification: 'lantern',
  'message-box': 'teacup',
  dialog: 'scroll',
  drawer: 'arrow-left',
  loading: 'refresh',
  breadcrumb: 'chevron-right',
  steps: 'leaf',
  dropdown: 'chevron-down',
  menu: 'menu',
  backtop: 'arrow-up',
}
</script>

<template>
  <div class="overview">
    <section v-for="g in componentGroups" :key="g.text">
      <h2>
        {{ g.text }} <small>{{ g.items.length }}</small>
      </h2>
      <div class="overview__grid vp-raw">
        <a
          v-for="[slug, name] in g.items"
          :key="slug"
          class="overview__card"
          :href="withBase(`/components/${slug}`)"
        >
          <MoIcon :name="icons[slug] ?? 'sparkle'" :size="28" />
          <span>{{ name }}</span>
        </a>
      </div>
    </section>
  </div>
</template>
