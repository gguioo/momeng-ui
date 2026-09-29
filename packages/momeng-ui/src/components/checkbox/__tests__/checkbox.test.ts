import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import Checkbox from '../Checkbox.vue'
import CheckboxGroup from '../CheckboxGroup.vue'
import RadioGroup from '../../radio/RadioGroup.vue'
import Radio from '../../radio/Radio.vue'

describe('Checkbox', () => {
  it('单独使用', async () => {
    const w = mount(Checkbox, { props: { modelValue: false, label: '梅' } })
    await w.find('input').setValue(true)
    expect(w.emitted('update:modelValue')![0]).toEqual([true])
  })
  it('自定义 true/false 值', async () => {
    const w = mount(Checkbox, { props: { modelValue: 'no', trueValue: 'yes', falseValue: 'no' } })
    await w.find('input').setValue(true)
    expect(w.emitted('change')![0]).toEqual(['yes'])
  })
  it('CheckboxGroup + max 限制', async () => {
    const Comp = defineComponent({
      components: { Checkbox, CheckboxGroup },
      setup: () => ({ list: ref(['梅']) }),
      template: `<CheckboxGroup v-model="list" :max="2">
        <Checkbox value="梅" /><Checkbox value="兰" /><Checkbox value="竹" />
      </CheckboxGroup>`,
    })
    const w = mount(Comp)
    const inputs = w.findAll('input')
    await inputs[1].setValue(true)
    expect((w.vm as any).list).toEqual(['梅', '兰'])
    expect(inputs[2].attributes('disabled')).toBeDefined()
  })
})

describe('Radio', () => {
  it('RadioGroup 单选', async () => {
    const Comp = defineComponent({
      components: { Radio, RadioGroup },
      setup: () => ({ v: ref('春') }),
      template: `<RadioGroup v-model="v"><Radio value="春" /><Radio value="秋" /></RadioGroup>`,
    })
    const w = mount(Comp)
    await w.findAll('input')[1].trigger('change')
    expect((w.vm as any).v).toBe('秋')
    expect(w.findAll('.mo-radio')[1].classes()).toContain('is-checked')
  })
})
