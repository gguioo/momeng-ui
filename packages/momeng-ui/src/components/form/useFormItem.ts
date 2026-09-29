import { computed, inject } from 'vue'
import { formContextKey, formItemContextKey } from './form'
import { useGlobalConfig } from '../../composables/useConfig'
import type { ComponentSize } from '../../utils'

/** 表单控件接入 Form/FormItem：拿到尺寸、禁用、校验触发 */
export function useFormItem() {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)
  return { form, formItem }
}

export function useFormSize(
  propSize: () => ComponentSize | undefined,
  extra?: () => ComponentSize | undefined,
) {
  const { form, formItem } = useFormItem()
  const config = useGlobalConfig()
  return computed<ComponentSize>(
    () =>
      propSize() ||
      extra?.() ||
      formItem?.size ||
      form?.props.size ||
      config.value.size ||
      'default',
  )
}

export function useFormDisabled(
  propDisabled: () => boolean | undefined,
  extra?: () => boolean | undefined,
) {
  const { form } = useFormItem()
  return computed(() => !!(propDisabled() || extra?.() || form?.props.disabled))
}
