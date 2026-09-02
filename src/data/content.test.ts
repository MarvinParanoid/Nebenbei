import { describe, expect, it } from 'vitest'
import { glossary } from './glossary'
import { drafts, scenarios } from './scenarios'
import { findProblems } from '../lib/validate'
import { isText } from '../lib/message'

const all = [...scenarios, ...drafts]

describe('content', () => {
  it('passes every validator check', () => {
    // Dangling ids, unreachable nodes, loops, dead line variants, endings
    // nothing resolves to, missing translations, path lengths — all of it.
    expect(findProblems()).toEqual([])
  })

  it('has no unused glossary entries', () => {
    const used = new Set<string>()
    for (const scenario of all) {
      for (const node of Object.values(scenario.nodes)) {
        for (const block of node.messages) {
          if (!isText(block)) continue
          for (const [, , id] of block.text.matchAll(/\[([^\][]+)\]\(([a-z0-9-]+)\)/g)) {
            used.add(id)
          }
        }
      }
    }
    expect([...Object.keys(glossary)].filter((id) => !used.has(id))).toEqual([])
  })

  it.each(scenarios.map((s) => [s.id, s] as const))(
    '%s is a finished scenario',
    (_id, scenario) => {
      const objectives = scenario.objectives ?? []
      const outcomes = scenario.outcomes ?? []

      expect(objectives.length).toBeGreaterThanOrEqual(3)
      expect(outcomes.length).toBeGreaterThanOrEqual(4)
      // Exactly one ending with no conditions at all, and one to find.
      expect(outcomes.filter((o) => !o.requires && !o.requiresFlags)).toHaveLength(1)
      expect(outcomes.filter((o) => o.secret)).toHaveLength(1)
      // Every goal is offered a contrasting replay, and every ending is named.
      for (const objective of objectives) {
        expect(objective.cta).toBeTruthy()
        expect(objectives.map((o) => o.id)).toContain(objective.contrast)
      }
      for (const outcome of outcomes) {
        expect(outcome.name.split(' ').length).toBeLessThanOrEqual(5)
        expect(outcome.consequences.length).toBeGreaterThan(0)
      }
      // And it reacts to how the conversation went, not only to where it went.
      const variants = Object.values(scenario.nodes).flatMap((node) =>
        node.messages.filter((block) => block.when),
      )
      expect(variants.length).toBeGreaterThanOrEqual(4)
    },
  )

  it('never puts phrase markup in a response', () => {
    for (const scenario of all) {
      for (const node of Object.values(scenario.nodes)) {
        for (const response of node.responses) {
          expect(response.text).not.toMatch(/\]\(/)
        }
      }
    }
  })
})
