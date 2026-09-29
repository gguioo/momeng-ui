import { withInstallFunction } from '../../utils'
import message from './method'

export const MoMessage = withInstallFunction(message, '$message')
export default MoMessage
export * from './message'
