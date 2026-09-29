import type { ExtractPropTypes, InjectionKey } from 'vue'

export const breadcrumbProps = {
  /** 分隔符文字 */
  separator: { type: String, default: '/' },
  /** 分隔符图标，优先于 separator */
  separatorIcon: String,
}
export const breadcrumbItemProps = {
  /** 链接地址 */
  href: String,
  icon: String,
}
export const breadcrumbKey: InjectionKey<{ separator: string; separatorIcon?: string }> =
  Symbol('moBreadcrumb')
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
