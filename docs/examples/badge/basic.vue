<template>
  <div class="demo-row" style="gap: 32px">
    <MoBadge :value="12"><MoButton icon="bell">消息</MoButton></MoBadge>
    <MoBadge :value="120" :max="99" type="primary"><MoAvatar>墨</MoAvatar></MoBadge>
    <MoBadge value="新" type="success"><MoButton>诗笺</MoButton></MoBadge>
    <MoBadge is-dot><MoIcon name="bell" :size="24" /></MoBadge>
    <MoBadge :value="3" type="warning" />
  </div>
</template>
