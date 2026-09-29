<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { MoMessage } from 'momeng-ui'

const presets = [
  { name: '朱砂', color: '#cf4a37' },
  { name: '竹青', color: '#5b8c5a' },
  { name: '花青', color: '#3f6a8a' },
  { name: '黛紫', color: '#6b4f7d' },
  { name: '桃夭', color: '#e0788b' },
  { name: '藤黄', color: '#d4912a' },
]
const state = reactive({
  primary: '#cf4a37',
  tidy: false,
  dark: false,
  size: 'default' as 'small' | 'default' | 'large',
})
const input = ref('一纸清欢')
const on = ref(true)
const rate = ref(3)
const tokens = computed(() => ({ 'color-primary': state.primary }))
const code = computed(
  () =>
    `:root {\n  --mo-color-primary: ${state.primary};\n}${state.tidy ? '\n/* 工整模式：<MoConfigProvider tidy> 或 class="mo-tidy" */' : ''}`,
)
function copy() {
  navigator.clipboard?.writeText(code.value)
  MoMessage.success('主题代码已复制')
}
</script>

<template>
  <div class="playground vp-raw">
    <aside class="playground__panel">
      <h3>调一调墨色</h3>
      <div class="playground__presets">
        <button
          v-for="p in presets"
          :key="p.color"
          type="button"
          :class="{ active: state.primary === p.color }"
          :style="{ background: p.color }"
          :title="p.name"
          @click="state.primary = p.color"
        >
          {{ p.name }}
        </button>
      </div>
      <label class="playground__row">自定义 <input v-model="state.primary" type="color" /></label>
      <label class="playground__row">工整模式 <MoSwitch v-model="state.tidy" size="small" /></label>
      <label class="playground__row"
        >墨夜（暗色） <MoSwitch v-model="state.dark" size="small"
      /></label>
      <div class="playground__row">
        尺寸
        <MoRadioGroup v-model="state.size" type="button">
          <MoRadio value="small">小</MoRadio><MoRadio value="default">中</MoRadio
          ><MoRadio value="large">大</MoRadio>
        </MoRadioGroup>
      </div>
      <pre class="playground__code">{{ code }}</pre>
      <MoButton size="small" icon="copy" @click="copy">复制主题代码</MoButton>
    </aside>

    <MoConfigProvider
      class="playground__stage"
      :tokens="tokens"
      :tidy="state.tidy"
      :theme="state.dark ? 'dark' : 'light'"
      :size="state.size"
    >
      <MoSpace wrap>
        <MoButton type="primary" icon="brush">主要按钮</MoButton>
        <MoButton>默认</MoButton>
        <MoButton type="primary" plain>素雅</MoButton>
        <MoButton type="primary" dashed icon="plus">新增</MoButton>
        <MoButton type="primary" circle icon="heart" />
      </MoSpace>
      <MoSpace wrap>
        <MoInput v-model="input" prefix-icon="edit" style="width: 200px" clearable />
        <MoSwitch v-model="on" />
        <MoRate v-model="rate" />
        <MoCheckbox :model-value="true" label="已阅" />
        <MoRadio :model-value="1" :value="1">选中</MoRadio>
      </MoSpace>
      <MoProgress :percentage="72" striped />
      <MoTabs type="line" model-value="a">
        <MoTabPane name="a" label="诗">床前明月光</MoTabPane>
        <MoTabPane name="b" label="词">明月几时有</MoTabPane>
        <MoTabPane name="c" label="曲">枯藤老树昏鸦</MoTabPane>
      </MoTabs>
      <MoSpace wrap align="center">
        <MoTag type="primary">标签</MoTag>
        <MoTag type="primary" effect="dark">实心</MoTag>
        <MoBadge :value="8"><MoAvatar>墨</MoAvatar></MoBadge>
        <MoSeal text="墨萌" :size="52" />
      </MoSpace>
      <MoPagination :total="80" :current-page="3" />
      <MoAlert
        type="primary"
        title="主色会同步到所有梯度"
        description="light-3 / light-5 / light-9 由 color-mix() 实时推导。"
      />
    </MoConfigProvider>
  </div>
</template>
