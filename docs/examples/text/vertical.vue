<template>
  <div class="demo-row" style="align-items: flex-start; gap: 32px">
    <MoText vertical font="brush" size="xl" style="height: 180px">床前明月光　疑是地上霜</MoText>
    <div style="width: 240px" class="demo-col">
      <MoText truncated>这是一段很长很长的文字，超出宽度时会优雅地变成省略号……</MoText>
      <MoText :line-clamp="2" type="secondary">
        大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。
      </MoText>
    </div>
  </div>
</template>
