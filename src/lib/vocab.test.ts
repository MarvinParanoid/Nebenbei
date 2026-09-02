import { beforeEach, describe, expect, it } from 'vitest'
import { getLookupCount, getVocab, recordLookup, recordSeen, recordTranslatedInMessage } from './vocab'

beforeEach(() => localStorage.clear())

describe('the vocabulary log', () => {
  it('keeps the three signals apart', () => {
    recordSeen(['ehrlich-gesagt'])
    recordSeen(['ehrlich-gesagt'])
    recordTranslatedInMessage(['ehrlich-gesagt'])
    recordLookup('ehrlich-gesagt', 'ehrlich gesagt', 'честно говоря')

    const [record] = getVocab()
    expect(record).toMatchObject({ seen: 2, translated: 1, views: 1 })
  })

  it('counts a phrase that was only ever seen, never looked up', () => {
    recordSeen(['kein-stress'])
    expect(getLookupCount('kein-stress')).toBe(0)
    expect(getVocab()).toHaveLength(1)
  })

  it('survives storage being unavailable', () => {
    const broken = {
      getItem: () => {
        throw new Error('nope')
      },
      setItem: () => {
        throw new Error('nope')
      },
    }
    const original = globalThis.localStorage
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: broken })
    expect(() => recordSeen(['halt'])).not.toThrow()
    expect(getVocab()).toEqual([])
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: original })
  })
})
