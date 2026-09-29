<template>
  <MoRow :gutter="20">
    <MoCol :span="8"><MoEmpty /></MoCol>
    <MoCol :span="8"><MoEmpty mood="sad" description="没有找到相关的诗" :image-size="80" /></MoCol>
    <MoCol :span="8">
      <MoEmpty mood="wink" description="收藏夹还空着" :image-size="80">
        <MoButton type="primary" size="small" icon="heart">去逛逛</MoButton>
      </MoEmpty>
    </MoCol>
  </MoRow>
</template>
