<template>
  <div class="demo-col">
    <MoAlert type="primary" title="新笔已备好" />
    <MoAlert type="success" title="信笺已寄出" />
    <MoAlert type="warning" title="墨快干了，记得添水" />
    <MoAlert type="danger" title="纸破了" />
    <MoAlert
      type="info"
      title="小贴士"
      description="按住 Shift 再拖动滑块，步长会变大哦。"
      close-text="知道了"
    />
    <MoAlert type="primary" effect="dark" title="浓墨效果" description="用于需要强调的全局公告。" />
    <MoAlert type="success" center :show-icon="false" :closable="false" title="居中且无图标" />
  </div>
</template>
