import { describe, expect, it } from 'vitest'
import { clockAt } from './clock'

describe('clockAt', () => {
  it('moves a minute every three bubbles', () => {
    expect(clockAt('19:42', 0)).toBe('19:42')
    expect(clockAt('19:42', 2)).toBe('19:42')
    expect(clockAt('19:42', 3)).toBe('19:43')
  })

  it('rolls over the hour and past midnight', () => {
    expect(clockAt('19:59', 3)).toBe('20:00')
    expect(clockAt('23:59', 3)).toBe('00:00')
  })
})
