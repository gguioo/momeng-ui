<template>
  <div class="demo-row" style="gap: 28px">
    <MoSeal text="一" shape="round" />
    <MoSeal text="清欢" shape="round" type="zhu" color="var(--mo-color-info)" />
    <MoSeal text="闲章" shape="oval" :size="52" />
    <MoSeal text="如意" shape="oval" type="zhu" :size="52" color="var(--mo-color-success)" />
    <MoSeal text="墨团印" color="var(--mo-color-ink)" />
    <MoSeal text="工整" :weathered="false" :tilt="0" />
  </div>
</template>
