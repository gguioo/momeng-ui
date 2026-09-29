import type { App, Plugin } from 'vue'
import './theme/index.scss'
import * as components from './components'
import { setGlobalConfig, type MoConfig } from './composables/useConfig'

export * from './components'
export * from './composables'
export * from './utils'

export const version = '0.1.0'

// 需要 app.use 的插件（组件 + 函数式 API）
const plugins: Plugin[] = [
  components.MoIcon,
  components.MoButton,
  components.MoText,
  components.MoLink,
  components.MoDivider,
  components.MoSpace,
  components.MoRow,
  components.MoCol,
  components.MoSeal,
  components.MoMascot,
  components.MoConfigProvider,
  components.MoInput,
  components.MoInputNumber,
  components.MoCheckbox,
  components.MoRadio,
  components.MoSwitch,
  components.MoSlider,
  components.MoRate,
  components.MoSelect,
  components.MoForm,
  components.MoCard,
  components.MoTag,
  components.MoBadge,
  components.MoAvatar,
  components.MoTooltip,
  components.MoPopover,
  components.MoCollapse,
  components.MoCollapseTransition,
  components.MoTabs,
  components.MoTimeline,
  components.MoTable,
  components.MoPagination,
  components.MoProgress,
  components.MoEmpty,
  components.MoSkeleton,
  components.MoScroll,
  components.MoAlert,
  components.MoDialog,
  components.MoDrawer,
  components.MoLoading,
  components.MoBreadcrumb,
  components.MoSteps,
  components.MoDropdown,
  components.MoMenu,
  components.MoBacktop,
  components.MoMessage,
  components.MoNotification,
  components.MoMessageBox,
]

export type InstallOptions = MoConfig

/**
 * 全量安装
 * app.use(MoMeng, { size: 'default', zIndex: 3000 })
 */
function install(app: App, options: InstallOptions = {}) {
  setGlobalConfig(options)
  plugins.forEach((p) => app.use(p))
}

const MoMeng = { install, version }
export default MoMeng
