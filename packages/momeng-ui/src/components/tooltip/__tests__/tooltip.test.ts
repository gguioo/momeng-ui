import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tooltip from '../Tooltip.vue'

describe('Tooltip', () => {
  it('click 触发显示，ESC 关闭', async () => {
    const w = mount(Tooltip, {
      props: { content: '一蓑烟雨', trigger: 'click', teleported: false },
      slots: { default: '<button>触发</button>' },
      attachTo: document.body,
    })
    const ref = w.find('.mo-popper__reference')
    await ref.trigger('click')
    await nextTick()
    const pop = w.find('.mo-popper')
    expect(pop.exists()).toBe(true)
    expect(pop.text()).toContain('一蓑烟雨')
    expect(ref.attributes('aria-describedby')).toBe(pop.attributes('id'))
    await ref.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(w.emitted('update:visible')!.at(-1)).toEqual([false])
    w.unmount()
  })
})
