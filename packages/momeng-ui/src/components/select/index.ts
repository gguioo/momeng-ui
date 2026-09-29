import { withInstall, withNoopInstall } from '../../utils'
import Select from './Select.vue'
import Option from './Option.vue'

export const MoSelect = withInstall(Select, { Option })
export const MoOption = withNoopInstall(Option)
export default MoSelect
export * from './select'
