import { withInstall, withNoopInstall } from '../../utils'
import Form from './Form.vue'
import FormItem from './FormItem.vue'

export const MoForm = withInstall(Form, { FormItem })
export const MoFormItem = withNoopInstall(FormItem)
export default MoForm
export * from './form'
export * from './validator'
export { useFormItem, useFormSize, useFormDisabled } from './useFormItem'
