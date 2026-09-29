import { withInstall, withNoopInstall } from '../../utils'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'

export const MoCheckbox = withInstall(Checkbox, { CheckboxGroup })
export const MoCheckboxGroup = withNoopInstall(CheckboxGroup)
export default MoCheckbox
export * from './checkbox'
