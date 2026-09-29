import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Input from '../Input.vue'

describe('Input', () => {
  it('v-model 双向绑定', async () => {
    const w = mount(Input, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (v: string) => w.setProps({ modelValue: v }),
      },
    })
    await w.find('input').setValue('宣纸')
    expect(w.props('modelValue')).toBe('宣纸')
    await w.setProps({ modelValue: '松烟墨' })
    expect(w.find('input').element.value).toBe('松烟墨')
  })
  it('可清空', async () => {
    const w = mount(Input, { props: { modelValue: 'abc', clearable: true } })
    await w.trigger('mouseenter')
    await w.find('.mo-input__clear').trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([''])
    expect(w.emitted('clear')).toHaveLength(1)
  })
  it('密码可见切换', async () => {
    const w = mount(Input, { props: { type: 'password', showPassword: true, modelValue: '123' } })
    expect(w.find('input').attributes('type')).toBe('password')
    await w.find('.mo-input__password').trigger('click')
    expect(w.find('input').attributes('type')).toBe('text')
  })
  it('字数统计按字符计算', () => {
    const w = mount(Input, { props: { modelValue: '墨萌🐱', maxlength: 10, showWordLimit: true } })
    expect(w.find('.mo-input__count').text()).toBe('3/10')
  })
  it('输入法组合期间不触发更新', async () => {
    const w = mount(Input, { props: { modelValue: '' } })
    const input = w.find('input')
    await input.trigger('compositionstart')
    input.element.value = 'mo'
    await input.trigger('input')
    expect(w.emitted('update:modelValue')).toBeUndefined()
    input.element.value = '墨'
    await input.trigger('compositionend')
    await nextTick()
    expect(w.emitted('update:modelValue')![0]).toEqual(['墨'])
  })
  it('textarea 默认有稿纸格线', () => {
    const w = mount(Input, { props: { type: 'textarea' } })
    expect(w.find('textarea').classes()).toContain('is-lined')
  })
})
