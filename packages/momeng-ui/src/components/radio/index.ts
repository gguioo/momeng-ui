import { withInstall, withNoopInstall } from '../../utils'
import Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

export const MoRadio = withInstall(Radio, { RadioGroup })
export const MoRadioGroup = withNoopInstall(RadioGroup)
export default MoRadio
export * from './radio'
