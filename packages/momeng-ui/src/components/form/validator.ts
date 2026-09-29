export type RuleTrigger = 'blur' | 'change'

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: RuleTrigger | RuleTrigger[]
  type?: 'string' | 'number' | 'email' | 'url' | 'array' | 'phone'
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  /** 返回 true 通过；返回字符串或 false 视为失败；支持 Promise */
  validator?: (
    value: any,
    rule: FormRule,
  ) => boolean | string | void | Promise<boolean | string | void>
}

export type FormRules = Record<string, FormRule | FormRule[]>

const isEmpty = (v: unknown) =>
  v === undefined ||
  v === null ||
  (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0)

const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  phone: /^1[3-9]\d{9}$/,
}

function measure(value: any) {
  if (typeof value === 'number') return value
  if (typeof value === 'string' || Array.isArray(value)) return Array.from(value as any).length
  return 0
}

/** 校验单条规则，通过返回 null，失败返回提示文案 */
export async function validateRule(
  value: any,
  rule: FormRule,
  label = '此项',
): Promise<string | null> {
  const fail = (fallback: string) => rule.message ?? fallback

  if (rule.required && isEmpty(value)) return fail(`${label}不能留白哦`)
  if (isEmpty(value) && !rule.validator) return null

  if (rule.type) {
    if (rule.type === 'number' && (typeof value !== 'number' || Number.isNaN(value)))
      return fail(`${label}需要是数字`)
    if (rule.type === 'array' && !Array.isArray(value)) return fail(`${label}需要是列表`)
    if (rule.type === 'string' && typeof value !== 'string') return fail(`${label}需要是文字`)
    if (rule.type in patterns && !patterns[rule.type as keyof typeof patterns].test(String(value)))
      return fail(`${label}格式好像不太对`)
  }
  const size = measure(value)
  const unit = typeof value === 'number' ? '' : ' 个字'
  if (rule.len !== undefined && size !== rule.len)
    return fail(`${label}需要正好 ${rule.len}${unit}`)
  if (rule.min !== undefined && size < rule.min) return fail(`${label}至少 ${rule.min}${unit}`)
  if (rule.max !== undefined && size > rule.max) return fail(`${label}最多 ${rule.max}${unit}`)
  if (rule.pattern && !rule.pattern.test(String(value))) return fail(`${label}格式好像不太对`)

  if (rule.validator) {
    try {
      const res = await rule.validator(value, rule)
      if (res === false) return fail(`${label}未通过校验`)
      if (typeof res === 'string') return res
    } catch (e) {
      return (e as Error)?.message || fail(`${label}未通过校验`)
    }
  }
  return null
}

/** 依次校验多条规则，遇到第一条失败即返回 */
export async function validateRules(value: any, rules: FormRule[], label?: string) {
  for (const rule of rules) {
    const msg = await validateRule(value, rule, label)
    if (msg) return msg
  }
  return null
}

export function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

export function setByPath(obj: any, path: string, value: any) {
  const keys = path.split('.')
  const last = keys.pop()!
  const target = keys.reduce((acc, key) => (acc[key] ??= {}), obj)
  target[last] = value
}
