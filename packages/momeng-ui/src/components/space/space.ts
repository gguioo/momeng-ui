import type { ExtractPropTypes, PropType } from 'vue'

export type SpaceSize = 'small' | 'default' | 'large' | number
export const spaceProps = {
  direction: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  size: {
    type: [String, Number, Array] as PropType<SpaceSize | [SpaceSize, SpaceSize]>,
    default: 'default',
  },
  align: { type: String as PropType<'start' | 'end' | 'center' | 'baseline' | 'stretch'> },
  justify: {
    type: String as PropType<'start' | 'end' | 'center' | 'space-between' | 'space-around'>,
  },
  wrap: Boolean,
  fill: Boolean,
}
export type SpaceProps = ExtractPropTypes<typeof spaceProps>
