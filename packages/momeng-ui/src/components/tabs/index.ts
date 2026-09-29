import { withInstall, withNoopInstall } from '../../utils'
import Tabs from './Tabs.vue'
import TabPane from './TabPane.vue'

export const MoTabs = withInstall(Tabs, { TabPane })
export const MoTabPane = withNoopInstall(TabPane)
export default MoTabs
export * from './tabs'
