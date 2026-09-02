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

  // A bill the user is arguing about has to add up: the numbers on the card and
  // the numbers in the endings drift apart silently, and the whole scenario is
  // then teaching arithmetic nobody can follow. Only cards that are entirely
  // numeric are checked — a listing's price or a shift plan's "offen" is not a
  // sum of anything.
  it('adds up on every card that is a column of numbers', () => {
    const amount = (text: string): number | null => {
      if (!/\d/.test(text) || /[A-Za-zÄÖÜäöüß]/.test(text)) return null
      const digits = text.replace(/[^\d,]/g, '').replace(',', '.')
      if (!digits) return null
      return (/[-\u2212]/.test(text) ? -1 : 1) * Number(digits)
    }
    for (const scenario of all) {
      for (const node of Object.values(scenario.nodes)) {
        for (const block of node.messages) {
          if (!('kind' in block) || block.kind !== 'card') continue
          const total = block.card.total?.right ? amount(block.card.total.right) : null
          if (total == null) continue
          const values = block.card.rows.map((row) => (row.right ? amount(row.right) : null))
          if (values.some((value) => value == null)) continue
          const sum = (values as number[]).reduce((a, b) => a + b, 0)
          expect(`${scenario.id}: ${sum}`).toBe(`${scenario.id}: ${total}`)
        }
      }
    }
  })

  // A card is rendered as plain typography, so an annotation in its label or
  // rows shows up as literal brackets instead of a tappable chunk.
  it('never puts phrase markup in a card', () => {
    for (const scenario of all) {
      for (const node of Object.values(scenario.nodes)) {
        for (const block of node.messages) {
          if (!('kind' in block) || block.kind !== 'card') continue
          const cells = [
            block.card.label,
            ...block.card.rows.flatMap((row) => [row.left, row.right ?? '']),
            block.card.total?.left ?? '',
            block.card.total?.right ?? '',
          ]
          for (const cell of cells) expect(cell).not.toMatch(/\]\(/)
        }
      }
    }
  })
})
