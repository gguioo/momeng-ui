import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../Tag.vue'
import Badge from '../../badge/Badge.vue'
import Progress from '../../progress/Progress.vue'

describe('Tag', () => {
  it('类型、效果与关闭', async () => {
    const w = mount(Tag, {
      props: { type: 'primary', effect: 'dark', closable: true },
      slots: { default: '梅' },
    })
    expect(w.find('.mo-tag').classes()).toEqual(
      expect.arrayContaining(['mo-tag--primary', 'mo-tag--dark']),
    )
    await w.find('.mo-tag__close').trigger('click')
    expect(w.emitted('close')).toHaveLength(1)
    expect(w.emitted('click')).toBeUndefined()
  })
})

describe('Badge', () => {
  it('超过 max 显示 max+', () => {
    const w = mount(Badge, { props: { value: 120, max: 99 } })
    expect(w.find('.mo-badge__content').text()).toBe('99+')
  })
  it('值为 0 默认隐藏', () => {
    const w = mount(Badge, { props: { value: 0 } })
    expect(w.find('.mo-badge__content').attributes('style')).toContain('display: none')
  })
})

describe('Progress', () => {
  it('百分比与无障碍属性', () => {
    const w = mount(Progress, { props: { percentage: 42 } })
    expect(w.attributes('aria-valuenow')).toBe('42')
    expect(w.find('.mo-progress__bar').attributes('style')).toContain('width: 42%')
    expect(w.text()).toContain('42%')
  })
  it('环形进度根据百分比计算 dashoffset', () => {
    const w = mount(Progress, { props: { percentage: 100, type: 'circle' } })
    expect(Number(w.find('.mo-progress__circle-bar').attributes('stroke-dashoffset'))).toBeCloseTo(
      0,
    )
  })
})
