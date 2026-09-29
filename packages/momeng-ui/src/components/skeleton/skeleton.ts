import type { ExtractPropTypes } from 'vue'

export const skeletonProps = {
  loading: { type: Boolean, default: true },
  rows: { type: Number, default: 3 },
  animated: { type: Boolean, default: true },
  avatar: Boolean,
  title: { type: Boolean, default: true },
}
export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
