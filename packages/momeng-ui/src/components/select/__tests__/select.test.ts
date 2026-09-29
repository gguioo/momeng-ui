import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Select from '../Select.vue'

const options = [
  { label: '梅', value: 'mei' },
  { label: '兰', value: 'lan' },
  { label: '竹', value: 'zhu', disabled: true },
]

describe('Select', () => {
  it('展示已选中的 label', async () => {
    const w = mount(Select, { props: { modelValue: 'lan', options, teleported: false } })
    await nextTick()
    expect(w.find('.mo-select__value').text()).toBe('兰')
  })
  it('点击选项更新值', async () => {
    const w = mount(Select, { props: { modelValue: '', options, teleported: false } })
    await w.find('.mo-select__wrapper').trigger('click')
    await w.findAll('.mo-option')[0].trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual(['mei'])
  })
  it('禁用选项不可选', async () => {
    const w = mount(Select, { props: { modelValue: '', options, teleported: false } })
    await w.findAll('.mo-option')[2].trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })
  it('多选切换', async () => {
    const w = mount(Select, {
      props: { modelValue: ['mei'], multiple: true, options, teleported: false },
    })
    await w.findAll('.mo-option')[1].trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([['mei', 'lan']])
    await w.findAll('.mo-option')[0].trigger('click')
    expect(w.emitted('update:modelValue')![1]).toEqual([[]])
  })
  it('键盘导航选择', async () => {
    const w = mount(Select, { props: { modelValue: '', options, teleported: false } })
    const wrapper = w.find('.mo-select__wrapper')
    await wrapper.trigger('keydown', { key: 'ArrowDown' }) // 打开
    await nextTick()
    await wrapper.trigger('keydown', { key: 'ArrowDown' }) // 下移到「兰」
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(w.emitted('update:modelValue')![0]).toEqual(['lan'])
  })
})
