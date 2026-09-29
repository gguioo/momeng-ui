<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
const acc = ref('a')
</script>

<template>
  <MoCollapse v-model="active">
    <MoCollapseItem name="1" title="一致性 Consistency"
      >与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。</MoCollapseItem
    >
    <MoCollapseItem name="2" title="反馈 Feedback"
      >控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。</MoCollapseItem
    >
    <MoCollapseItem name="3" title="效率 Efficiency" icon="leaf"
      >简化流程：设计简洁直观的操作流程，清晰明确，不让用户思考。</MoCollapseItem
    >
    <MoCollapseItem name="4" title="不可用" disabled>……</MoCollapseItem>
  </MoCollapse>
  <MoDivider variant="dashed">手风琴</MoDivider>
  <MoCollapse v-model="acc" accordion>
    <MoCollapseItem name="a" title="春">春眠不觉晓</MoCollapseItem>
    <MoCollapseItem name="b" title="夏">小荷才露尖尖角</MoCollapseItem>
    <MoCollapseItem name="c" title="秋">停车坐爱枫林晚</MoCollapseItem>
  </MoCollapse>
</template>
