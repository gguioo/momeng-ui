import type { ExtractPropTypes, PropType } from 'vue'

export const scrollProps = {
  /** 卷轴标题（引首） */
  title: String,
  /** 立轴（竖向展开）/ 手卷（横向展开） */
  direction: { type: String as PropType<'vertical' | 'horizontal'>, default: 'vertical' },
  /** 是否展开，支持 v-model:open */
  open: { type: Boolean, default: true },
  /** 挂载时播放展开动画 */
  animated: { type: Boolean, default: true },
  /** 落款印章文字 */
  seal: String,
  /** 绫边颜色 */
  silk: String,
  width: { type: [String, Number] },
}
export const scrollEmits = {
  'update:open': (v: boolean) => typeof v === 'boolean',
  opened: () => true,
  closed: () => true,
}
export type ScrollProps = ExtractPropTypes<typeof scrollProps>
