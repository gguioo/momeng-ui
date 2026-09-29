export const NAMESPACE = 'mo'

/**
 * BEM 命名工具
 * const ns = useNamespace('button')
 * ns.b()           -> 'mo-button'
 * ns.e('icon')     -> 'mo-button__icon'
 * ns.m('primary')  -> 'mo-button--primary'
 * ns.is('loading', true) -> 'is-loading'
 */
export function useNamespace(block: string) {
  const b = (suffix = '') => `${NAMESPACE}-${block}${suffix ? `-${suffix}` : ''}`
  const e = (element?: string) => (element ? `${b()}__${element}` : '')
  const m = (modifier?: string | false) => (modifier ? `${b()}--${modifier}` : '')
  const em = (element: string, modifier?: string | false) =>
    modifier ? `${b()}__${element}--${modifier}` : ''
  const is = (name: string, state?: boolean) => (state ? `is-${name}` : '')
  const cssVar = (name: string) => `--${NAMESPACE}-${block}-${name}`
  return { namespace: NAMESPACE, b, e, m, em, is, cssVar }
}
