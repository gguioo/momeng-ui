import { withInstall, withNoopInstall } from '../../utils'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export const MoDropdown = withInstall(Dropdown, { DropdownItem })
export const MoDropdownItem = withNoopInstall(DropdownItem)
export default MoDropdown
export * from './dropdown'
