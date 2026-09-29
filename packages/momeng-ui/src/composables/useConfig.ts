import {
  computed,
  getCurrentInstance,
  inject,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'
import type { ComponentSize } from '../utils/types'

export interface MoConfig {
  size?: ComponentSize
  zIndex?: number
  /** 关闭手绘抖动，得到更「工整」的界面 */
  tidy?: boolean
}

export const configProviderKey: InjectionKey<ComputedRef<MoConfig>> = Symbol('moConfig')

const globalConfig: Ref<MoConfig> = ref({})

export function setGlobalConfig(config: MoConfig) {
  globalConfig.value = { ...globalConfig.value, ...config }
}

export function useGlobalConfig(): ComputedRef<MoConfig> {
  const injected = getCurrentInstance() ? inject(configProviderKey, null) : null
  return computed(() => ({ ...globalConfig.value, ...(injected?.value ?? {}) }))
}

/** 组件尺寸优先级：props > FormItem/Group 注入 > ConfigProvider > 'default' */
export function useSize(
  propSize: () => ComponentSize | undefined,
  fallback?: () => ComponentSize | undefined,
) {
  const config = useGlobalConfig()
  return computed<ComponentSize>(() => propSize() || fallback?.() || config.value.size || 'default')
}
