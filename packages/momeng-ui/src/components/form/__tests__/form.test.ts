import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, nextTick, reactive, ref } from 'vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'
import Input from '../../input/Input.vue'

const Comp = defineComponent({
  components: { Form, FormItem, Input },
  setup() {
    const model = reactive({ name: '', email: '' })
    const rules = {
      name: [{ required: true, message: '请写下名字', trigger: 'blur' as const }],
      email: [{ type: 'email' as const, message: '邮箱不对', trigger: 'blur' as const }],
    }
    const form = ref()
    return { model, rules, form }
  },
  template: `<Form ref="form" :model="model" :rules="rules">
    <FormItem label="名字" prop="name"><Input v-model="model.name" /></FormItem>
    <FormItem label="邮箱" prop="email"><Input v-model="model.email" /></FormItem>
  </Form>`,
})

describe('Form', () => {
  it('validate 返回错误信息', async () => {
    const w = mount(Comp)
    const res = await (w.vm as any).form.validate()
    await nextTick()
    expect(res.valid).toBe(false)
    expect(res.errors.name).toBe('请写下名字')
    expect(res.errors.email).toBeUndefined()
    expect(w.find('.mo-form-item__error').text()).toBe('请写下名字')
    expect(w.find('.mo-form-item').classes()).toContain('is-required')
  })
  it('失焦触发校验', async () => {
    const w = mount(Comp)
    const input = w.findAll('input')[1]
    await input.setValue('oops')
    await input.trigger('blur')
    await flushPromises()
    expect(w.text()).toContain('邮箱不对')
  })
  it('resetFields 恢复初始值并清除校验', async () => {
    const w = mount(Comp)
    const vm = w.vm as any
    vm.model.name = '墨团'
    await vm.form.validate()
    vm.form.resetFields()
    await flushPromises()
    expect(vm.model.name).toBe('')
    expect(w.find('.mo-form-item__error').exists()).toBe(false)
  })
})
