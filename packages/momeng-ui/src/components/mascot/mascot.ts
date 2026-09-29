import type { ExtractPropTypes, PropType } from 'vue'

export type MascotMood = 'happy' | 'calm' | 'wink' | 'sleepy' | 'sad' | 'surprised' | 'love'
export const mascotProps = {
  /** 墨团的心情 */
  mood: { type: String as PropType<MascotMood>, default: 'happy' },
  size: { type: [Number, String], default: 96 },
  /** 身体颜色，默认松烟墨 */
  color: String,
  /** 轻轻浮动 */
  animated: { type: Boolean, default: true },
}
export type MascotProps = ExtractPropTypes<typeof mascotProps>
