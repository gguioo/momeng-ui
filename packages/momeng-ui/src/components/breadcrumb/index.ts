import { withInstall, withNoopInstall } from '../../utils'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

export const MoBreadcrumb = withInstall(Breadcrumb, { BreadcrumbItem })
export const MoBreadcrumbItem = withNoopInstall(BreadcrumbItem)
export default MoBreadcrumb
export * from './breadcrumb'
