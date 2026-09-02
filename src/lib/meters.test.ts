import { describe, expect, it } from 'vitest'
import { applyEffects, matches, resolveOutcome, startingMeters, weight } from './meters'
import type { Conditions, Meters, Outcome, Scenario } from '../types'

const meters = (partial: Partial<Meters> = {}): Meters => ({
  anger: 0,
  respect: 50,
  patience: 60,
  guilt: 0,
  ...partial,
})

const outcome = (id: string, extra: Partial<Outcome> = {}): Outcome => ({
  id,
  achieved: [],
  name: id,
  nameRu: id,
  title: id,
  titleRu: id,
  consequences: [{ de: 'x', ru: 'x' }],
  ...extra,
})

describe('applyEffects', () => {
  it('clamps to 0–100 rather than running off', () => {
    expect(applyEffects(meters({ anger: 95 }), { anger: 20 }).anger).toBe(100)
    expect(applyEffects(meters({ respect: 5 }), { respect: -20 }).respect).toBe(0)
  })

  it('leaves the meters alone when a choice has no effects', () => {
    const before = meters()
    expect(applyEffects(before, undefined)).toBe(before)
  })
})

describe('weight', () => {
  it('measures how far a choice moved things, in any direction', () => {
    expect(weight({ anger: 20, respect: -10 })).toBe(30)
    expect(weight(undefined)).toBe(0)
  })
})

describe('matches', () => {
  it('treats a list of comparisons on one meter as a range', () => {
    const range: Conditions = {
      guilt: [
        ['>=', 20],
        ['<=', 44],
      ],
    }
    expect(matches(range, meters({ guilt: 26 }))).toBe(true)
    expect(matches(range, meters({ guilt: 80 }))).toBe(false)
    expect(matches(range, meters({ guilt: 10 }))).toBe(false)
  })

  it('is true when there are no conditions at all', () => {
    expect(matches(undefined, meters())).toBe(true)
  })
})

describe('resolveOutcome', () => {
  const scenario = {
    id: 'test',
    outcomes: [
      outcome('secret', { requires: { respect: ['>=', 80] }, requiresFlags: ['tip'] }),
      outcome('angry', { requires: { anger: ['>=', 70] } }),
      outcome('clean', { forbidsFlags: ['lied'] }),
      outcome('fallback'),
    ],
  } as unknown as Scenario

  it('takes the first match, so the list runs specific → general', () => {
    expect(resolveOutcome(scenario, meters({ anger: 90, respect: 90 }), ['tip'])?.id).toBe('secret')
    expect(resolveOutcome(scenario, meters({ anger: 90, respect: 90 }), [])?.id).toBe('angry')
  })

  it('honours forbidden flags', () => {
    expect(resolveOutcome(scenario, meters(), [])?.id).toBe('clean')
    expect(resolveOutcome(scenario, meters(), ['lied'])?.id).toBe('fallback')
  })
})

describe('startingMeters', () => {
  it('copies, so a replay cannot inherit the previous run', () => {
    const scenario = { meters: meters({ anger: 10 }) } as Scenario
    const first = startingMeters(scenario)
    first.anger = 99
    expect(startingMeters(scenario).anger).toBe(10)
  })
})
