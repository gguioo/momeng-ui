export const isNumber = (v: unknown): v is number => typeof v === 'number' && !Number.isNaN(v)
export const isString = (v: unknown): v is string => typeof v === 'string'
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

/** 10 → '10px'，'2em' → '2em' */
export function addUnit(value?: string | number): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  return isNumber(value) || /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value)
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** 按精度修正浮点误差：0.1 + 0.2 → 0.3 */
export function toPrecision(value: number, precision = 0) {
  const p = Math.pow(10, precision)
  return Math.round(value * p) / p
}

export function getPrecision(value: number) {
  const s = String(value)
  const i = s.indexOf('.')
  return i >= 0 ? s.length - i - 1 : 0
}

/** 用字符串生成稳定的伪随机数（0~1），让「手绘抖动」每次渲染都一致 */
export function seededRandom(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function debugWarn(scope: string, msg: string) {
  if (import.meta.env?.DEV) console.warn(`[MoMeng/${scope}] ${msg}`)
}
