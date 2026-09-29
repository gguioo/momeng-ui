import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import Collapse from '../Collapse.vue'
import CollapseItem from '../CollapseItem.vue'

const make = (accordion: boolean) =>
  defineComponent({
    components: { Collapse, CollapseItem },
    setup: () => ({ active: ref<any>(accordion ? '' : []) }),
    template: `<Collapse v-model="active" :accordion="${accordion}">
      <CollapseItem name="a" title="甲">一</CollapseItem>
      <CollapseItem name="b" title="乙">二</CollapseItem>
    </Collapse>`,
  })

describe('Collapse', () => {
  it('多选展开', async () => {
    const w = mount(make(false))
    const heads = w.findAll('.mo-collapse-item__header')
    await heads[0].trigger('click')
    await heads[1].trigger('click')
    expect((w.vm as any).active).toEqual(['a', 'b'])
    expect(heads[0].attributes('aria-expanded')).toBe('true')
  })
  it('手风琴模式只展开一项', async () => {
    const w = mount(make(true))
    const heads = w.findAll('.mo-collapse-item__header')
    await heads[0].trigger('click')
    await heads[1].trigger('click')
    expect((w.vm as any).active).toBe('b')
    await heads[1].trigger('click')
    expect((w.vm as any).active).toBe('')
  })
})
