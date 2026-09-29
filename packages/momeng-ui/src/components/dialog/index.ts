import { withInstall } from '../../utils'
import Dialog from './Dialog.vue'

export const MoDialog = withInstall(Dialog)
export default MoDialog
export * from './dialog'
export { useOverlay } from './useOverlay'
