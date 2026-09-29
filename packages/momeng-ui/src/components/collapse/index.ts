import { withInstall, withNoopInstall } from '../../utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import CollapseTransition from './CollapseTransition.vue'

export const MoCollapse = withInstall(Collapse, { CollapseItem })
export const MoCollapseItem = withNoopInstall(CollapseItem)
export const MoCollapseTransition = withInstall(CollapseTransition)
export default MoCollapse
export * from './collapse'
