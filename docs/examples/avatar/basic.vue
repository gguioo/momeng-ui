<template>
  <div class="demo-row" style="gap: 18px">
    <MoAvatar size="large" src="https://api.dicebear.com/9.x/notionists/svg?seed=Li" />
    <MoAvatar>李</MoAvatar>
    <MoAvatar icon="user" color="var(--mo-color-info-light-7)" />
    <MoAvatar shape="square" color="var(--mo-color-warning-light-5)">诗</MoAvatar>
    <MoAvatar size="large" />
    <MoAvatar size="small" />
    <MoAvatar :size="72" src="broken.png" />
  </div>
</template>
