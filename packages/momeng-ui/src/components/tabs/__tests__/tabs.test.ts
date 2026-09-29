import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import Tabs from '../Tabs.vue'
import TabPane from '../TabPane.vue'

const Comp = defineComponent({
  components: { Tabs, TabPane },
  setup: () => ({ active: ref('spring') }),
  template: `<Tabs v-model="active">
    <TabPane name="spring" label="春">桃</TabPane>
    <TabPane name="summer" label="夏">荷</TabPane>
    <TabPane name="autumn" label="秋" disabled>菊</TabPane>
    <TabPane name="winter" label="冬" lazy>梅</TabPane>
  </Tabs>`,
})

describe('Tabs', () => {
  it('渲染标签并切换', async () => {
    const w = mount(Comp)
    await nextTick()
    const items = w.findAll('.mo-tabs__item')
    expect(items).toHaveLength(4)
    await items[1].trigger('click')
    expect((w.vm as any).active).toBe('summer')
  })
  it('禁用项不可切换', async () => {
    const w = mount(Comp)
    await nextTick()
    await w.findAll('.mo-tabs__item')[2].trigger('click')
    expect((w.vm as any).active).toBe('spring')
  })
  it('lazy 面板首次激活才渲染', async () => {
    const w = mount(Comp)
    await nextTick()
    expect(w.text()).not.toContain('梅')
    await w.findAll('.mo-tabs__item')[3].trigger('click')
    expect(w.text()).toContain('梅')
  })
  it('方向键切换并跳过禁用项', async () => {
    const w = mount(Comp, { attachTo: document.body })
    await nextTick()
    ;(w.vm as any).active = 'summer'
    await nextTick()
    await w.findAll('.mo-tabs__item')[1].trigger('keydown', { key: 'ArrowRight' })
    expect((w.vm as any).active).toBe('winter')
    w.unmount()
  })
})
