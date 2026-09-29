import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import InputNumber from '../InputNumber.vue'

describe('InputNumber', () => {
  it('加减并受 max 约束', async () => {
    const w = mount(InputNumber, { props: { modelValue: 9, max: 10 } })
    await w.find('.mo-input-number__increase').trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([10])
    await w.setProps({ modelValue: 10 })
    expect(w.find('.mo-input-number__increase').attributes('disabled')).toBeDefined()
  })
  it('小数步长无浮点误差', async () => {
    const w = mount(InputNumber, { props: { modelValue: 0.1, step: 0.2 } })
    await w.find('.mo-input-number__increase').trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([0.3])
  })
  it('输入后失焦提交并修正', async () => {
    const w = mount(InputNumber, { props: { modelValue: 1, min: 0, max: 5 } })
    const input = w.find('input')
    await input.setValue('8')
    await input.trigger('change')
    expect(w.emitted('update:modelValue')![0]).toEqual([5])
  })
  it('stepStrictly', async () => {
    const w = mount(InputNumber, { props: { modelValue: 0, step: 3, stepStrictly: true } })
    const input = w.find('input')
    await input.setValue('7')
    await input.trigger('change')
    expect(w.emitted('update:modelValue')![0]).toEqual([6])
  })
})
