import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from '../Table.vue'

const data = [
  { name: '李白', age: 61 },
  { name: '杜甫', age: 58 },
  { name: '王维', age: 60 },
]
const columns = [
  { prop: 'name', label: '诗人' },
  { prop: 'age', label: '享年', sortable: true },
]

describe('Table', () => {
  it('渲染表头与数据', () => {
    const w = mount(Table, { props: { data, columns } })
    expect(w.findAll('th').map((t) => t.text())).toEqual(['诗人', '享年'])
    expect(w.findAll('tbody tr')).toHaveLength(3)
  })
  it('点击排序：升序 → 降序 → 还原', async () => {
    const w = mount(Table, { props: { data, columns } })
    const th = w.findAll('th')[1]
    const firstName = () => w.find('tbody tr td').text()
    await th.trigger('click')
    expect(firstName()).toBe('杜甫')
    await th.trigger('click')
    expect(firstName()).toBe('李白')
    await th.trigger('click')
    expect(firstName()).toBe('李白')
    expect(w.emitted('sort-change')).toHaveLength(3)
  })
  it('多选', async () => {
    const w = mount(Table, { props: { data, columns, selectable: true } })
    const boxes = w.findAll('tbody input[type=checkbox]')
    await boxes[0].setValue(true)
    expect(w.emitted('selection-change')![0]).toEqual([[data[0]]])
    await w.find('thead input[type=checkbox]').setValue(true)
    expect((w.emitted('selection-change')!.at(-1) as any[])[0]).toHaveLength(3)
  })
  it('序号列使用汉字数字', () => {
    const w = mount(Table, { props: { data, columns, showIndex: true } })
    expect(w.find('.mo-table__index').text()).toBe('一')
  })
  it('空数据显示空状态', () => {
    const w = mount(Table, { props: { data: [], columns } })
    expect(w.find('.mo-empty').exists()).toBe(true)
  })
  it('格式化函数与插槽', () => {
    const w = mount(Table, {
      props: {
        data,
        columns: [
          { prop: 'age', label: '享年', formatter: (_r: any, _c: any, v: number) => `${v} 岁` },
        ],
      },
    })
    expect(w.find('tbody td').text()).toBe('61 岁')
  })
})
