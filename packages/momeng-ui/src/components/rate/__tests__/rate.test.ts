import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Rate from '../Rate.vue'

describe('Rate', () => {
  it('点击评分', async () => {
    const w = mount(Rate, { props: { modelValue: 0 } })
    await w.findAll('.mo-rate__item')[2].trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([3])
  })
  it('clearable 再次点击清零', async () => {
    const w = mount(Rate, { props: { modelValue: 3, clearable: true } })
    await w.findAll('.mo-rate__item')[2].trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([0])
  })
  it('键盘操作', async () => {
    const w = mount(Rate, { props: { modelValue: 2 } })
    await w.trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue')![0]).toEqual([3])
  })
  it('只读时不响应', async () => {
    const w = mount(Rate, { props: { modelValue: 2, readonly: true } })
    await w.findAll('.mo-rate__item')[4].trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })
  it('显示文案', () => {
    const w = mount(Rate, { props: { modelValue: 5, showText: true } })
    expect(w.find('.mo-rate__text').text()).toBe('超级爱')
  })
})
