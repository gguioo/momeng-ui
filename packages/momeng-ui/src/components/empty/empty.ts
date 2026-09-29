import type { ExtractPropTypes, PropType } from 'vue'
import type { MascotMood } from '../mascot/mascot'

export const emptyProps = {
  description: { type: String, default: '这里空空的，像一张还没落笔的宣纸' },
  /** 墨团的表情 */
  mood: { type: String as PropType<MascotMood>, default: 'sleepy' },
  /** 自定义图片地址 */
  image: String,
  imageSize: { type: Number, default: 100 },
}
export type EmptyProps = ExtractPropTypes<typeof emptyProps>
