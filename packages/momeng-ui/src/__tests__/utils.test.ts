import { describe, expect, it } from 'vitest'
import { addUnit, clamp, getPrecision, seededRandom, toPrecision } from '../utils'
import { useNamespace } from '../composables'
import { getPagers } from '../components/pagination/pagination'
import { toChineseNumber } from '../components/table/table'
import { layoutSeal } from '../components/seal/seal'

describe('utils', () => {
  it('addUnit', () => {
    expect(addUnit(10)).toBe('10px')
    expect(addUnit('12')).toBe('12px')
    expect(addUnit('2em')).toBe('2em')
    expect(addUnit(undefined)).toBeUndefined()
  })
  it('clamp / precision', () => {
    expect(clamp(12, 0, 10)).toBe(10)
    expect(toPrecision(0.1 + 0.2, 2)).toBe(0.3)
    expect(getPrecision(0.25)).toBe(2)
    expect(getPrecision(3)).toBe(0)
  })
  it('seededRandom 对同一种子稳定', () => {
    const a = seededRandom('墨萌')
    const b = seededRandom('墨萌')
    expect(a()).toBe(b())
    expect(a()).toBeGreaterThanOrEqual(0)
  })
})

describe('useNamespace', () => {
  it('生成 BEM 类名', () => {
    const ns = useNamespace('button')
    expect(ns.b()).toBe('mo-button')
    expect(ns.e('icon')).toBe('mo-button__icon')
    expect(ns.m('primary')).toBe('mo-button--primary')
    expect(ns.em('icon', 'left')).toBe('mo-button__icon--left')
    expect(ns.is('loading', true)).toBe('is-loading')
    expect(ns.is('loading', false)).toBe('')
  })
})

describe('getPagers', () => {
  it('页数少时全部展示', () => {
    expect(getPagers(1, 5)).toEqual([1, 2, 3, 4, 5])
  })
  it('靠前时只有后省略', () => {
    expect(getPagers(2, 20)).toEqual([1, 2, 3, 4, 5, 6, 'next-more', 20])
  })
  it('居中时两侧省略', () => {
    expect(getPagers(10, 20)).toEqual([1, 'prev-more', 8, 9, 10, 11, 12, 'next-more', 20])
  })
  it('靠后时只有前省略', () => {
    expect(getPagers(19, 20)).toEqual([1, 'prev-more', 15, 16, 17, 18, 19, 20])
  })
})

describe('toChineseNumber', () => {
  it.each([
    [1, '一'],
    [10, '十'],
    [12, '十二'],
    [20, '二十'],
    [35, '三十五'],
    [105, '一〇五'],
  ])('%i → %s', (n, s) => expect(toChineseNumber(n)).toBe(s))
})

describe('layoutSeal', () => {
  it('四字印按右起竖读排布', () => {
    const g = layoutSeal('长乐未央')
    expect(g.map((x) => x.char)).toEqual(['长', '乐', '未', '央'])
    expect(g[0].x).toBeGreaterThan(g[2].x) // 第一个字在右列
    expect(g[0].y).toBeLessThan(g[1].y)
  })
  it('三字印左列单字纵向拉伸', () => {
    expect(layoutSeal('墨萌印')[2].scaleY).toBe(2)
  })
  it('最多四字', () => {
    expect(layoutSeal('一二三四五')).toHaveLength(4)
  })
})
