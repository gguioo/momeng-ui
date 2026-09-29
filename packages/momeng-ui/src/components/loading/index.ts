import type { App } from 'vue'
import Loading from './Loading.vue'
import { loadingService, vLoading } from './service'

export const MoLoading = Object.assign(Loading, {
  service: loadingService,
  directive: vLoading,
  install(app: App) {
    app.component('MoLoading', Loading)
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = loadingService
  },
})
export { vLoading, loadingService }
export default MoLoading
export * from './loading'
export type { LoadingInstance } from './service'
