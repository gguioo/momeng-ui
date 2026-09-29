<template>
  <MoRow :gutter="20">
    <MoCol :sm="12" :xs="24">
      <MoCard header="定风波" tape="pink" seal="东坡">
        <template #extra><MoLink type="primary">全文</MoLink></template>
        莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。
      </MoCard>
    </MoCol>
    <MoCol :sm="12" :xs="24">
      <MoCard shadow="hover" tape="green" hoverable>
        <template #header>🍵 今日茶单</template>
        <MoSpace wrap>
          <MoTag type="success">龙井</MoTag>
          <MoTag type="warning">祁红</MoTag>
          <MoTag type="info">白毫</MoTag>
        </MoSpace>
        <template #footer>
          <MoButton size="small" type="primary" icon="teacup">泡一壶</MoButton>
        </template>
      </MoCard>
    </MoCol>
  </MoRow>
</template>
