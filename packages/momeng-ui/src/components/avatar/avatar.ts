import type { ExtractPropTypes, PropType } from 'vue'

export const avatarProps = {
  src: String,
  alt: String,
  size: {
    type: [Number, String] as PropType<number | 'small' | 'default' | 'large'>,
    default: 'default',
  },
  shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
  icon: String,
  fit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: 'cover',
  },
  /** 背景色 */
  color: String,
}
export const avatarEmits = { error: (e: Event) => e instanceof Event }
export type AvatarProps = ExtractPropTypes<typeof avatarProps>
