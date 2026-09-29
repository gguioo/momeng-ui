import { withInstall } from '../../utils'
import Row from './Row.vue'
import Col from './Col.vue'

export const MoRow = withInstall(Row)
export const MoCol = withInstall(Col)
export * from './grid'
