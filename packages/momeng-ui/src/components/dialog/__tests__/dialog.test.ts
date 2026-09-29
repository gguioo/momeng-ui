import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Dialog from '../Dialog.vue'

describe('Dialog', () => {
  it('v-model 控制显示', async () => {
    const w = mount(Dialog, { props: { modelValue: false, title: '尺牍', appendToBody: false } })
    expect(w.find('.mo-dialog__overlay').isVisible()).toBe(false)
    await w.setProps({ modelValue: true })
    await nextTick()
    expect(w.find('.mo-dialog').attributes('role')).toBe('dialog')
    expect(w.find('.mo-dialog__title').text()).toBe('尺牍')
  })
  it('点击关闭按钮 emit update:modelValue(false)', async () => {
    const w = mount(Dialog, { props: { modelValue: true, appendToBody: false } })
    await nextTick()
    await w.find('.mo-dialog__close').trigger('click')
    expect(w.emitted('update:modelValue')![0]).toEqual([false])
  })
  it('beforeClose 可拦截', async () => {
    let done: (() => void) | undefined
    const w = mount(Dialog, {
      props: { modelValue: true, appendToBody: false, beforeClose: (d: () => void) => (done = d) },
    })
    await nextTick()
    await w.find('.mo-dialog__close').trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
    done!()
    expect(w.emitted('update:modelValue')![0]).toEqual([false])
  })
  it('ESC 关闭', async () => {
    const w = mount(Dialog, { props: { modelValue: true, appendToBody: false } })
    await nextTick()
    await w.find('.mo-dialog__overlay').trigger('keydown', { key: 'Escape' })
    expect(w.emitted('update:modelValue')![0]).toEqual([false])
  })
})
