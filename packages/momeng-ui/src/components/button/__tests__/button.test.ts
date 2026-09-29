import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Button from '../Button.vue'
import ButtonGroup from '../ButtonGroup.vue'
import ConfigProvider from '../../config-provider/ConfigProvider.vue'

describe('Button', () => {
  it('渲染类型与尺寸', () => {
    const w = mount(Button, {
      props: { type: 'primary', size: 'large' },
      slots: { default: '落笔' },
    })
    expect(w.classes()).toContain('mo-button--primary')
    expect(w.classes()).toContain('mo-button--large')
    expect(w.text()).toBe('落笔')
  })
  it('点击触发 click', async () => {
    const w = mount(Button)
    await w.trigger('click')
    expect(w.emitted('click')).toHaveLength(1)
  })
  it('禁用与加载时不触发 click', async () => {
    const d = mount(Button, { props: { disabled: true } })
    await d.trigger('click')
    expect(d.emitted('click')).toBeUndefined()
    const l = mount(Button, { props: { loading: true } })
    await l.trigger('click')
    expect(l.emitted('click')).toBeUndefined()
    expect(l.find('.mo-icon.is-spin').exists()).toBe(true)
    expect(l.attributes('aria-busy')).toBe('true')
  })
  it('仅图标时加 icon-only', () => {
    const w = mount(Button, { props: { icon: 'plus', circle: true } })
    expect(w.classes()).toContain('is-icon-only')
    expect(w.classes()).toContain('is-circle')
  })
  it('ButtonGroup 注入尺寸与类型', () => {
    const w = mount(ButtonGroup, {
      props: { size: 'small', type: 'success' },
      slots: { default: () => h(Button, null, () => 'A') },
    })
    const btn = w.find('.mo-button')
    expect(btn.classes()).toContain('mo-button--small')
    expect(btn.classes()).toContain('mo-button--success')
  })
  it('ConfigProvider 提供全局尺寸', () => {
    const w = mount(ConfigProvider, {
      props: { size: 'large' },
      slots: { default: () => h(Button) },
    })
    expect(w.find('.mo-button').classes()).toContain('mo-button--large')
  })
  it('支持渲染为 a 标签', () => {
    const w = mount(Button, { props: { tag: 'a' }, attrs: { href: '#' } })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('type')).toBeUndefined()
  })
})
