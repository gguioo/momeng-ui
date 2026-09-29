import type { ExtractPropTypes, PropType } from 'vue'

export const paginationProps = {
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 10 },
  currentPage: { type: Number, default: 1 },
  pageSizes: { type: Array as PropType<number[]>, default: () => [10, 20, 50, 100] },
  /** 最多显示的页码按钮数（奇数） */
  pagerCount: {
    type: Number,
    default: 7,
    validator: (v: number) => v >= 5 && v <= 21 && v % 2 === 1,
  },
  /** 组件布局，逗号分隔：total, sizes, prev, pager, next, jumper */
  layout: { type: String, default: 'prev, pager, next' },
  small: Boolean,
  disabled: Boolean,
  hideOnSinglePage: Boolean,
}

export const paginationEmits = {
  'update:currentPage': (v: number) => typeof v === 'number',
  'update:pageSize': (v: number) => typeof v === 'number',
  change: (page: number, size: number) => typeof page === 'number' && typeof size === 'number',
}
export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export type PagerItem = number | 'prev-more' | 'next-more'

/** 计算页码列表：1 … 4 5 [6] 7 8 … 20 */
export function getPagers(current: number, pageCount: number, pagerCount = 7): PagerItem[] {
  if (pageCount <= pagerCount) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const half = (pagerCount - 1) / 2
  const showPrevMore = current > pagerCount - half
  const showNextMore = current < pageCount - half
  const list: PagerItem[] = [1]
  if (showPrevMore && !showNextMore) {
    list.push('prev-more')
    for (let i = pageCount - (pagerCount - 2); i < pageCount; i++) list.push(i)
  } else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) list.push(i)
    list.push('next-more')
  } else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    list.push('prev-more')
    for (let i = current - offset; i <= current + offset; i++) list.push(i)
    list.push('next-more')
  } else {
    for (let i = 2; i < pageCount; i++) list.push(i)
  }
  list.push(pageCount)
  return list
}
