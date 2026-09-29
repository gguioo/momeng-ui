import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { MoMessage } from '../index'

describe('Message', () => {
  afterEach(() => {
    MoMessage.closeAll()
    document.body.innerHTML = ''
  })
  it('函数式调用渲染到 body', async () => {
    MoMessage.success('写好啦')
    await nextTick()
    const el = document.querySelector('.mo-message')
    expect(el).not.toBeNull()
    expect(el!.classList.contains('mo-message--success')).toBe(true)
    expect(el!.textContent).toContain('写好啦')
  })
  it('grouping 合并相同消息', async () => {
    MoMessage({ message: '重复', grouping: true })
    MoMessage({ message: '重复', grouping: true })
    await nextTick()
    expect(document.querySelectorAll('.mo-message')).toHaveLength(1)
    expect(document.querySelector('.mo-message__badge')!.textContent).toBe('2')
  })
  it('到时自动关闭并回调 onClose', async () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    MoMessage({ message: '一会儿就走', duration: 1000, onClose })
    await nextTick()
    vi.advanceTimersByTime(1100)
    await nextTick()
    expect(onClose).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
