<template>
  <div class="demo-row">
    <MoTooltip content="上边的提示" placement="top"><MoButton>上</MoButton></MoTooltip>
    <MoTooltip content="下边的提示" placement="bottom"><MoButton>下</MoButton></MoTooltip>
    <MoTooltip content="左边的提示" placement="left"><MoButton>左</MoButton></MoTooltip>
    <MoTooltip content="右边的提示" placement="right"><MoButton>右</MoButton></MoTooltip>
    <MoTooltip content="纸底的提示" effect="light" placement="top-start"
      ><MoButton>纸底</MoButton></MoTooltip
    >
    <MoTooltip placement="bottom">
      <template #content>支持<b>富文本</b>内容 ✿</template>
      <MoButton type="primary" plain>插槽</MoButton>
    </MoTooltip>
    <MoTooltip content="点一下才出现" trigger="click"
      ><MoButton text>click 触发</MoButton></MoTooltip
    >
  </div>
</template>
