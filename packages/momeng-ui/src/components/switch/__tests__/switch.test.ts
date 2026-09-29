import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Switch from '../Switch.vue'

describe('Switch', () => {
  it('点击切换', async () => {
    const w = mount(Switch, { props: { modelValue: false } })
    await w.find('button').trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([true])
    expect(w.find('button').attributes('role')).toBe('switch')
  })
  it('自定义值', async () => {
    const w = mount(Switch, {
      props: { modelValue: 'off', activeValue: 'on', inactiveValue: 'off' },
    })
    await w.find('button').trigger('click')
    expect(w.emitted('change')![0]).toEqual(['on'])
  })
  it('beforeChange 返回 false 阻止切换', async () => {
    const w = mount(Switch, {
      props: { modelValue: false, beforeChange: () => Promise.resolve(false) },
    })
    await w.find('button').trigger('click')
    await flushPromises()
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })
  it('禁用时不可切换', async () => {
    const w = mount(Switch, { props: { modelValue: false, disabled: true } })
    await w.find('button').trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })
})
