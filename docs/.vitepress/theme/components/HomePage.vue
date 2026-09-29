<script setup lang="ts">
import { reactive, ref } from 'vue'
import { withBase } from 'vitepress'
import { MoMessage, MoNotification, iconNames } from 'momeng-ui'

const form = reactive({ name: '墨团', mood: 'happy', tea: true, stars: 4, tags: ['梅', '竹'] })
const tab = ref('write')
const progress = ref(64)
const moods = [
  { label: '开心', value: 'happy' },
  { label: '眨眼', value: 'wink' },
  { label: '心动', value: 'love' },
  { label: '犯困', value: 'sleepy' },
  { label: '惊讶', value: 'surprised' },
]
const features = [
  {
    icon: 'brush',
    title: '手绘笔触',
    text: '不规则圆角、错位实影、一笔勾出的对勾。每个组件都像刚从毛笔下长出来。',
    seal: '笔',
  },
  {
    icon: 'plum',
    title: '中国传统色',
    text: '朱砂、竹青、藤黄、胭脂、花青。设计变量由传统色谱推导，改一个值整套换装。',
    seal: '色',
  },
  {
    icon: 'sparkle',
    title: '萌而有度',
    text: 'Q 弹动效与墨团表情只在关键时刻出现，可爱不打扰，并支持「工整模式」一键收敛。',
    seal: '萌',
  },
  {
    icon: 'setting',
    title: '工程完备',
    text: 'TypeScript 全量类型、按需引入、暗色主题、键盘与读屏可达、90+ 单元测试护航。',
    seal: '工',
  },
]
const stats = [
  { n: '45+', t: '组件' },
  { n: String(iconNames.length), t: '手绘图标' },
  { n: '90+', t: '单元测试' },
  { n: '0', t: '运行时依赖' },
]
function submit() {
  MoMessage.success({ message: `${form.name}，收到你的信笺啦`, grouping: true })
}
function notify() {
  MoNotification({
    title: '飞鸽传书',
    message: '有一封来自墨团的信，请查收～',
    type: 'primary',
    mascot: true,
  })
}
</script>

<template>
  <div class="home vp-raw">
    <section class="home-hero">
      <div class="home-hero__text">
        <p class="home-hero__eyebrow"><MoIcon name="plum" /> Vue 3 · TypeScript · 手绘风组件库</p>
        <h1 class="home-hero__title">
          墨萌<span class="home-hero__ui">UI</span>
          <MoSeal text="萌" :size="58" stamp class="home-hero__seal" />
        </h1>
        <p class="home-hero__lead">
          宣纸为底，松烟墨为线，朱砂为印。<br />
          一套<MoText mark="pink">会撒娇</MoText>、也<MoText emphasis>有风骨</MoText>的 Vue 3
          组件库。
        </p>
        <div class="home-hero__actions">
          <MoButton
            type="primary"
            size="large"
            icon="brush"
            tag="a"
            :href="withBase('/guide/quickstart')"
            >开始落笔</MoButton
          >
          <MoButton size="large" icon="scroll" tag="a" :href="withBase('/design/')"
            >设计规范</MoButton
          >
          <MoButton size="large" text icon="sparkle" tag="a" :href="withBase('/components/')"
            >逛逛组件</MoButton
          >
        </div>
        <code class="home-hero__install">pnpm add momeng-ui</code>
      </div>
      <div class="home-hero__art">
        <div class="home-hero__moon" />
        <MoMascot :mood="form.mood as any" :size="210" />
        <div class="home-hero__bubble">今天也要好好写代码呀 (｡･ω･｡)</div>
      </div>
    </section>

    <section class="home-stats">
      <div v-for="s in stats" :key="s.t" class="home-stats__item">
        <b>{{ s.n }}</b
        ><span>{{ s.t }}</span>
      </div>
    </section>

    <section class="home-features">
      <MoCard
        v-for="(f, i) in features"
        :key="f.title"
        hoverable
        :tape="(['pink', 'green', 'yellow', 'blue'] as const)[i]"
        :seal="f.seal"
      >
        <MoIcon :name="f.icon" :size="30" class="home-features__icon" />
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
      </MoCard>
    </section>

    <MoDivider ornament="cloud">亲手试试</MoDivider>

    <section class="home-showcase">
      <MoCard header="写一封信笺" tape="pink" class="home-showcase__form">
        <template #extra
          ><MoTag type="primary" effect="dark" size="small" round>实时可玩</MoTag></template
        >
        <MoForm label-width="72px" :model="form">
          <MoFormItem label="落款">
            <MoInput v-model="form.name" placeholder="你的名字" prefix-icon="user" clearable />
          </MoFormItem>
          <MoFormItem label="心情">
            <MoSelect v-model="form.mood" :options="moods" style="width: 100%" />
          </MoFormItem>
          <MoFormItem label="雅趣">
            <MoCheckboxGroup v-model="form.tags">
              <MoCheckbox value="梅" /><MoCheckbox value="兰" /><MoCheckbox value="竹" /><MoCheckbox
                value="菊"
              />
            </MoCheckboxGroup>
          </MoFormItem>
          <MoFormItem label="喜爱">
            <MoRate v-model="form.stars" icon="heart" color="var(--mo-color-pink)" show-text />
          </MoFormItem>
          <MoFormItem label="配茶">
            <MoSwitch v-model="form.tea" active-text="要一盏" />
          </MoFormItem>
          <MoFormItem>
            <MoButton type="primary" icon="sparkle" @click="submit">寄出</MoButton>
            <MoButton icon="bell" @click="notify">飞鸽传书</MoButton>
          </MoFormItem>
        </MoForm>
      </MoCard>

      <div class="home-showcase__side">
        <MoCard>
          <MoTabs v-model="tab" type="bookmark">
            <MoTabPane name="write" label="笔">
              <MoSpace direction="vertical" fill>
                <MoProgress :percentage="progress" striped />
                <MoSlider v-model="progress" />
                <MoSpace wrap>
                  <MoTag type="success">竹青</MoTag>
                  <MoTag type="warning" effect="dark">藤黄</MoTag>
                  <MoTag type="info" effect="plain">花青</MoTag>
                  <MoTag v-for="t in form.tags" :key="t" type="primary" closable>{{ t }}</MoTag>
                </MoSpace>
              </MoSpace>
            </MoTabPane>
            <MoTabPane name="ink" label="墨">
              <MoTimeline>
                <MoTimelineItem timestamp="卯时" type="primary">研墨，铺纸</MoTimelineItem>
                <MoTimelineItem timestamp="辰时" type="success">写下第一个组件</MoTimelineItem>
                <MoTimelineItem timestamp="巳时" hollow>泡一壶茶，等灵感</MoTimelineItem>
              </MoTimeline>
            </MoTabPane>
            <MoTabPane name="paper" label="纸">
              <MoEmpty mood="sleepy" description="纸还空着，等你落笔" :image-size="80" />
            </MoTabPane>
          </MoTabs>
        </MoCard>
        <MoAlert
          type="primary"
          title="小贴士"
          description="所有颜色都来自 CSS 变量，去「演练场」换一个主色试试。"
        />
        <div class="home-showcase__seals">
          <MoSeal text="墨萌" />
          <MoSeal text="长乐未央" type="zhu" />
          <MoSeal text="萌" shape="round" color="var(--mo-color-info)" />
          <MoSeal text="闲章" shape="oval" type="zhu" :size="48" />
        </div>
      </div>
    </section>
  </div>
</template>
