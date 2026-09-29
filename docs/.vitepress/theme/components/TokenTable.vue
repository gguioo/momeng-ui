<script setup lang="ts">
defineProps<{
  tokens: {
    name: string
    value: string
    desc: string
    preview?: 'radius' | 'shadow' | 'space' | 'font' | 'ease'
  }[]
}>()
</script>

<template>
  <table class="token-table">
    <thead>
      <tr>
        <th>变量</th>
        <th>值</th>
        <th>用途</th>
        <th>示意</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="t in tokens" :key="t.name">
        <td>
          <code>{{ t.name }}</code>
        </td>
        <td>
          <small>{{ t.value }}</small>
        </td>
        <td>{{ t.desc }}</td>
        <td>
          <span
            v-if="t.preview === 'radius'"
            class="token-table__radius"
            :style="{ borderRadius: `var(${t.name})` }"
          />
          <span
            v-else-if="t.preview === 'shadow'"
            class="token-table__shadow"
            :style="{ boxShadow: `var(${t.name})` }"
          />
          <span
            v-else-if="t.preview === 'space'"
            class="token-table__space"
            :style="{ width: `var(${t.name})` }"
          />
          <span
            v-else-if="t.preview === 'font'"
            :style="{ fontFamily: `var(${t.name})`, fontSize: '18px' }"
            >墨萌 MoMeng</span
          >
          <span
            v-else-if="t.preview === 'ease'"
            class="token-table__ease"
            :style="{ transitionTimingFunction: `var(${t.name})` }"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
