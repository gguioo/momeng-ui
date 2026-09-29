<template>
  <MoSpace direction="vertical" fill>
    <MoSpace>
      <MoButton>一</MoButton>
      <MoButton>二</MoButton>
      <MoButton>三</MoButton>
    </MoSpace>
    <MoSpace size="large" wrap>
      <MoTag v-for="t in ['琴', '棋', '书', '画', '诗', '酒', '花', '茶']" :key="t">{{ t }}</MoTag>
    </MoSpace>
    <MoSpace :size="[4, 20]" direction="vertical">
      <MoText>自定义间距：水平 4px，竖直 20px</MoText>
      <MoText type="secondary">竖向排列</MoText>
    </MoSpace>
  </MoSpace>
</template>
