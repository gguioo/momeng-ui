import type { ExtractPropTypes, PropType } from 'vue'

export const sealProps = {
  /** 印文，最多 4 字，按传统「右起竖读」排布 */
  text: { type: String, default: '墨萌' },
  /** 朱文（阳刻，红字）/ 白文（阴刻，红底留白字） */
  type: { type: String as PropType<'zhu' | 'bai'>, default: 'bai' },
  shape: { type: String as PropType<'square' | 'round' | 'oval'>, default: 'square' },
  size: { type: [Number, String], default: 64 },
  color: { type: String, default: 'var(--mo-color-primary)' },
  /** 倾斜角度；true 为根据印文生成的自然微倾 */
  tilt: { type: [Boolean, Number], default: true },
  /** 斑驳做旧：边缘残破与印泥不匀 */
  weathered: { type: Boolean, default: true },
  /** 挂载时播放「盖章」动画 */
  stamp: Boolean,
}
export type SealProps = ExtractPropTypes<typeof sealProps>

export interface SealGlyph {
  char: string
  x: number
  y: number
  size: number
  /** 纵向拉伸（三字印左列单字占满一列） */
  scaleY?: number
}

/** 印文排布：传统印章自右向左、自上而下阅读 */
export function layoutSeal(text: string): SealGlyph[] {
  const chars = Array.from(text.trim()).slice(0, 4)
  switch (chars.length) {
    case 0:
      return []
    case 1:
      return [{ char: chars[0], x: 50, y: 52, size: 68 }]
    case 2:
      return [
        { char: chars[0], x: 50, y: 29, size: 44 },
        { char: chars[1], x: 50, y: 72, size: 44 },
      ]
    case 3:
      return [
        { char: chars[0], x: 70, y: 30, size: 41 },
        { char: chars[1], x: 70, y: 72, size: 41 },
        { char: chars[2], x: 30, y: 51, size: 41, scaleY: 2 },
      ]
    default:
      return [
        { char: chars[0], x: 70, y: 30, size: 41 },
        { char: chars[1], x: 70, y: 72, size: 41 },
        { char: chars[2], x: 30, y: 30, size: 41 },
        { char: chars[3], x: 30, y: 72, size: 41 },
      ]
  }
}
