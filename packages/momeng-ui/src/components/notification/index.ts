import { withInstallFunction } from '../../utils'
import notify from './method'

export const MoNotification = withInstallFunction(notify, '$notify')
export default MoNotification
export * from './notification'
