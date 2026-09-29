import { describe, expect, it } from 'vitest'
import { getByPath, setByPath, validateRule, validateRules } from '../validator'

describe('validator', () => {
  it('required', async () => {
    expect(await validateRule('', { required: true }, '昵称')).toBe('昵称不能留白哦')
    expect(await validateRule([], { required: true })).toBeTruthy()
    expect(await validateRule('墨', { required: true })).toBeNull()
  })
  it('min / max / len 按字符计数（支持中文与 emoji）', async () => {
    expect(await validateRule('墨', { min: 2 })).toContain('至少 2')
    expect(await validateRule('墨萌墨萌', { max: 3 })).toContain('最多 3')
    expect(await validateRule('🐱🐱', { len: 2 })).toBeNull()
  })
  it('type', async () => {
    expect(await validateRule('a@b.co', { type: 'email' })).toBeNull()
    expect(await validateRule('not-email', { type: 'email', message: '邮箱不对' })).toBe('邮箱不对')
    expect(await validateRule('13800138000', { type: 'phone' })).toBeNull()
  })
  it('空值且非必填时跳过其它规则', async () => {
    expect(await validateRule('', { min: 3 })).toBeNull()
  })
  it('异步自定义校验', async () => {
    const rule = { validator: async (v: string) => (v === 'taken' ? '名字被占用啦' : true) }
    expect(await validateRule('taken', rule)).toBe('名字被占用啦')
    expect(await validateRule('free', rule)).toBeNull()
  })
  it('多条规则遇到第一条失败即停止', async () => {
    const msg = await validateRules('', [
      { required: true, message: 'A' },
      { min: 3, message: 'B' },
    ])
    expect(msg).toBe('A')
  })
  it('路径读写', () => {
    const obj: any = { a: { b: 1 } }
    expect(getByPath(obj, 'a.b')).toBe(1)
    setByPath(obj, 'a.c.d', 2)
    expect(obj.a.c.d).toBe(2)
  })
})
