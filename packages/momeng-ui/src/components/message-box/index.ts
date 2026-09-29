import { withInstallFunction } from '../../utils'
import MessageBox from './method'

export const MoMessageBox = withInstallFunction(MessageBox, '$msgbox')
export default MoMessageBox
export * from './message-box'
