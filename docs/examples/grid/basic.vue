<template>
  <MoRow :gutter="12">
    <MoCol :span="24"><div class="demo-grid-cell">24</div></MoCol>
    <MoCol :span="12"><div class="demo-grid-cell">12</div></MoCol>
    <MoCol :span="12"><div class="demo-grid-cell alt">12</div></MoCol>
    <MoCol :span="8"><div class="demo-grid-cell">8</div></MoCol>
    <MoCol :span="8"><div class="demo-grid-cell alt">8</div></MoCol>
    <MoCol :span="8"><div class="demo-grid-cell">8</div></MoCol>
    <MoCol :span="6" :offset="6"><div class="demo-grid-cell alt">6 · offset 6</div></MoCol>
    <MoCol :span="6" :offset="6"><div class="demo-grid-cell">6 · offset 6</div></MoCol>
  </MoRow>
</template>
