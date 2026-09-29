import type { ExtractPropTypes, PropType } from 'vue'

export interface TableColumn<T = any> {
  /** 数据字段 */
  prop?: string
  label?: string
  width?: number | string
  minWidth?: number | string
  align?: 'left' | 'center' | 'right'
  /** 本地排序；传函数则自定义比较 */
  sortable?: boolean | ((a: T, b: T) => number)
  formatter?: (row: T, column: TableColumn<T>, value: any, index: number) => string
  /** 固定在左/右（配合横向滚动） */
  fixed?: 'left' | 'right'
  /** 超出省略 */
  ellipsis?: boolean
}

export type SortOrder = 'ascending' | 'descending' | null

export const tableProps = {
  data: { type: Array as PropType<any[]>, default: () => [] },
  columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
  /** 行唯一键，用于选择与渲染优化 */
  rowKey: { type: [String, Function] as PropType<string | ((row: any) => string | number)> },
  /** 斑马纹：像一页页宣纸 */
  stripe: Boolean,
  border: Boolean,
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  /** 开启多选列 */
  selectable: Boolean,
  /** 显示序号列（以汉字数字显示） */
  showIndex: Boolean,
  highlightCurrentRow: Boolean,
  maxHeight: { type: [String, Number] },
  emptyText: { type: String, default: '还没有数据呢' },
  loading: Boolean,
  defaultSort: { type: Object as PropType<{ prop: string; order: SortOrder }> },
}

export const tableEmits = {
  'row-click': (row: any, index: number, e: MouseEvent) => !!row && index >= 0 && !!e,
  'selection-change': (rows: any[]) => Array.isArray(rows),
  'sort-change': (sort: { prop?: string; order: SortOrder }) => !!sort,
  'current-change': (row: any) => row !== undefined,
}
export type TableProps = ExtractPropTypes<typeof tableProps>

const cn = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
/** 1 → 一，12 → 十二，105 → 一〇五 */
export function toChineseNumber(n: number): string {
  if (n < 10) return cn[n]
  if (n < 20) return `十${n % 10 ? cn[n % 10] : ''}`
  if (n < 100) return `${cn[Math.floor(n / 10)]}十${n % 10 ? cn[n % 10] : ''}`
  return String(n)
    .split('')
    .map((d) => cn[Number(d)])
    .join('')
}
