import { withInstall, withNoopInstall } from '../../utils'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

export const MoButton = withInstall(Button, { ButtonGroup })
export const MoButtonGroup = withNoopInstall(ButtonGroup)
export default MoButton
export * from './button'
