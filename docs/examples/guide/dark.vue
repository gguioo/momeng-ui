<template>
  <MoConfigProvider theme="dark" style="padding: 24px; border-radius: 14px">
    <MoSpace wrap align="center">
      <MoMascot mood="sleepy" :size="64" />
      <MoButton type="primary" icon="moon">夜读</MoButton>
      <MoButton>默认</MoButton>
      <MoSwitch :model-value="true" />
      <MoTag type="warning" effect="dark">藤黄</MoTag>
      <MoSeal text="夜" :size="46" />
      <MoInput placeholder="月色入户" style="width: 160px" />
    </MoSpace>
  </MoConfigProvider>
</template>
