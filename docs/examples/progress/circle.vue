<template>
  <div class="demo-row" style="gap: 28px">
    <MoProgress type="circle" :percentage="25" />
    <MoProgress type="circle" :percentage="100" status="success" />
    <MoProgress
      type="circle"
      :percentage="80"
      color="var(--mo-color-info)"
      :width="100"
      :stroke-width="8"
    />
    <MoProgress type="circle" :percentage="60" :format="(p) => `${p / 10} 成`" />
  </div>
</template>
