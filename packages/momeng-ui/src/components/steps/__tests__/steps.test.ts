import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import Steps from '../Steps.vue'
import Step from '../Step.vue'

describe('Steps', () => {
  it('根据 active 计算每一步的状态，并以汉字数字标序', async () => {
    const Comp = defineComponent({
      components: { Steps, Step },
      template: `<Steps :active="1"><Step title="研墨" /><Step title="铺纸" /><Step title="落笔" /></Steps>`,
    })
    const w = mount(Comp)
    await nextTick()
    const steps = w.findAll('.mo-step')
    expect(steps[0].classes()).toContain('is-finish')
    expect(steps[1].classes()).toContain('is-process')
    expect(steps[1].attributes('aria-current')).toBe('step')
    expect(steps[2].classes()).toContain('is-wait')
    expect(steps[2].find('.mo-step__number').text()).toBe('三')
  })
})
