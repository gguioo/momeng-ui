import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Seal from '../Seal.vue'

describe('Seal', () => {
  it('白文印使用 mask 镂空文字', () => {
    const w = mount(Seal, { props: { text: '墨萌', type: 'bai' } })
    expect(w.find('mask').exists()).toBe(true)
    expect(w.findAll('text').map((t) => t.text())).toEqual(['墨', '萌'])
    expect(w.attributes('aria-label')).toBe('印章：墨萌')
  })
  it('朱文印直接渲染红字', () => {
    const w = mount(Seal, { props: { text: '长乐未央', type: 'zhu' } })
    expect(w.find('mask').exists()).toBe(false)
    expect(w.findAll('text')).toHaveLength(4)
  })
  it('倾斜角度可控', () => {
    const w = mount(Seal, { props: { text: '印', tilt: 0 } })
    expect(w.attributes('style')).toContain('--mo-seal-angle: 0deg')
  })
})
