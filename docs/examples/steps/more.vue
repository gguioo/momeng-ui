<template>
  <MoSteps :active="2" align-center :chinese-number="false">
    <MoStep title="下单" />
    <MoStep title="打包" icon="teacup" />
    <MoStep title="运输" status="error" description="路上遇到大雪" />
    <MoStep title="签收" />
  </MoSteps>
  <MoDivider variant="dashed" />
  <MoSteps :active="1" direction="vertical" style="max-width: 360px">
    <MoStep title="上阕" description="明月几时有，把酒问青天。" />
    <MoStep title="下阕" description="转朱阁，低绮户，照无眠。" />
    <MoStep title="结句" description="但愿人长久，千里共婵娟。" />
  </MoSteps>
</template>
