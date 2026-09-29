import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export const rowProps = {
  gutter: { type: Number, default: 0 },
  justify: {
    type: String as PropType<
      'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
    >,
    default: 'start',
  },
  align: { type: String as PropType<'top' | 'middle' | 'bottom'> },
  tag: { type: String, default: 'div' },
}

type Responsive = number | { span?: number; offset?: number }
export const colProps = {
  span: { type: Number, default: 24 },
  offset: { type: Number, default: 0 },
  push: { type: Number, default: 0 },
  pull: { type: Number, default: 0 },
  xs: { type: [Number, Object] as PropType<Responsive> },
  sm: { type: [Number, Object] as PropType<Responsive> },
  md: { type: [Number, Object] as PropType<Responsive> },
  lg: { type: [Number, Object] as PropType<Responsive> },
  xl: { type: [Number, Object] as PropType<Responsive> },
  tag: { type: String, default: 'div' },
}

export const rowContextKey: InjectionKey<{ gutter: Ref<number> }> = Symbol('moRow')
export type RowProps = ExtractPropTypes<typeof rowProps>
export type ColProps = ExtractPropTypes<typeof colProps>
