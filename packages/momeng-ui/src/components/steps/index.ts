import { withInstall, withNoopInstall } from '../../utils'
import Steps from './Steps.vue'
import Step from './Step.vue'

export const MoSteps = withInstall(Steps, { Step })
export const MoStep = withNoopInstall(Step)
export default MoSteps
export * from './steps'
