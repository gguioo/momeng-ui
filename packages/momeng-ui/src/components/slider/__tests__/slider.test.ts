import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from '../Slider.vue'

describe('Slider', () => {
  it('键盘步进与边界', async () => {
    const w = mount(Slider, { props: { modelValue: 98, step: 5 } })
    const thumb = w.find('[role=slider]')
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue')![0]).toEqual([100])
    await thumb.trigger('keydown', { key: 'Home' })
    expect(w.emitted('change')!.at(-1)).toEqual([0])
  })
  it('范围模式输出有序数组', async () => {
    const w = mount(Slider, { props: { modelValue: [60, 20], range: true } })
    const thumbs = w.findAll('[role=slider]')
    expect(thumbs).toHaveLength(2)
    await thumbs[1].trigger('keydown', { key: 'ArrowUp' })
    expect(w.emitted('update:modelValue')![0]).toEqual([[21, 60]])
  })
})
