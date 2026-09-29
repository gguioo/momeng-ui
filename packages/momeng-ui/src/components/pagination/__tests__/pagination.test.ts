import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  it('点击页码', async () => {
    const w = mount(Pagination, { props: { total: 100, currentPage: 1 } })
    await w.findAll('.mo-pagination__item')[2].trigger('click')
    expect(w.emitted('update:currentPage')![0]).toEqual([3])
    expect(w.emitted('change')![0]).toEqual([3, 10])
  })
  it('首页禁用上一页', () => {
    const w = mount(Pagination, { props: { total: 100, currentPage: 1 } })
    expect(w.find('.mo-pagination__prev').attributes('disabled')).toBeDefined()
  })
  it('当前页高亮且带 aria-current', () => {
    const w = mount(Pagination, { props: { total: 100, currentPage: 4 } })
    const active = w.find('.mo-pagination__item.is-active')
    expect(active.text()).toBe('4')
    expect(active.attributes('aria-current')).toBe('page')
  })
  it('layout 控制显示内容', () => {
    const w = mount(Pagination, { props: { total: 42, layout: 'total, prev, next' } })
    expect(w.find('.mo-pagination__total').text()).toBe('共 42 条')
    expect(w.find('.mo-pagination__pager').exists()).toBe(false)
  })
  it('单页时可隐藏', () => {
    const w = mount(Pagination, { props: { total: 5, hideOnSinglePage: true } })
    expect(w.find('.mo-pagination').exists()).toBe(false)
  })
})
