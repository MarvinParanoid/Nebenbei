import { glossary } from '../data/glossary'
import { drafts, scenarios } from '../data/scenarios'
import { applyEffects, matches, resolveOutcome, startingMeters } from './meters'
import type { Meters, Scenario } from '../types'

/**
 * Dev-only content check: dangling `next` ids, unknown glossary references and
 * unreachable nodes are content bugs that are invisible until you walk the
 * exact branch, so shout about them in the console instead.
 */
export function validateScenarios(): void {
  const problems: string[] = []
  const ANNOTATION = /\[([^\][]+)\]\(([a-z0-9-]+)\)/g

  // Drafts are checked too: they are still content, just not shown yet.
  for (const scenario of [...scenarios, ...drafts]) {
    const ids = new Set(Object.keys(scenario.nodes))
    if (!ids.has(scenario.startNodeId)) {
      problems.push(`${scenario.id}: startNodeId "${scenario.startNodeId}" missing`)
    }

    const reachable = new Set<string>()
    const queue = [scenario.startNodeId]
    while (queue.length) {
      const id = queue.pop()!
      if (reachable.has(id) || !ids.has(id)) continue
      reachable.add(id)
      for (const response of scenario.nodes[id].responses) {
        if (response.next) queue.push(response.next)
      }
    }

    for (const [key, node] of Object.entries(scenario.nodes)) {
      if (key !== node.id) {
        problems.push(`${scenario.id}: node key "${key}" disagrees with node.id "${node.id}"`)
      }
      if (!reachable.has(node.id)) problems.push(`${scenario.id}: node "${node.id}" unreachable`)
      for (const response of node.responses) {
        if (response.next && !ids.has(response.next)) {
          problems.push(`${scenario.id}/${node.id}: response "${response.id}" → unknown node "${response.next}"`)
        }
      }
      // A node made only of conditional lines could deliver nothing at all.
      if (!node.messages.some((message) => !message.when)) {
        problems.push(`${scenario.id}/${node.id}: every message is conditional`)
      }
      for (const message of node.messages) {
        if (!message.ru.trim()) {
          problems.push(`${scenario.id}/${node.id}: a message has an empty translation`)
        }
        for (const [, , id] of message.text.matchAll(ANNOTATION)) {
          if (!(id in glossary)) {
            problems.push(`${scenario.id}/${node.id}: unknown glossary id "${id}"`)
          }
        }
      }
      // Only incoming messages are parsed — the user's own words are rendered
      // verbatim, so an annotation in a response would show as raw brackets.
      for (const response of node.responses) {
        if (!response.ru.trim()) {
          problems.push(`${scenario.id}/${node.id}: response "${response.id}" has an empty translation`)
        }
        if (ANNOTATION.test(response.text)) {
          problems.push(
            `${scenario.id}/${node.id}: response "${response.id}" contains phrase markup`,
          )
        }
        ANNOTATION.lastIndex = 0
      }
    }

    // Objectives and outcomes only make sense together.
    if (scenario.objectives && !scenario.outcomes?.length) {
      problems.push(`${scenario.id}: has objectives but no outcomes`)
    }
    if (scenario.outcomes?.length && !scenario.objectives?.length) {
      problems.push(`${scenario.id}: has outcomes but no objectives`)
    }
    if (scenario.objectives?.length) {
      const objectiveIds = new Set(scenario.objectives.map((o) => o.id))
      const outcomes = scenario.outcomes ?? []
      const seenOutcomeIds = new Set<string>()

      for (const outcome of outcomes) {
        if (seenOutcomeIds.has(outcome.id)) {
          problems.push(`${scenario.id}: duplicate outcome id "${outcome.id}"`)
        }
        seenOutcomeIds.add(outcome.id)
        for (const id of outcome.achieved) {
          if (!objectiveIds.has(id)) {
            problems.push(`${scenario.id}/${outcome.id}: unknown objective "${id}"`)
          }
        }
      }

      // Without a condition-free outcome some runs would end with nothing.
      if (!outcomes.some((o) => !o.requires || Object.keys(o.requires).length === 0)) {
        problems.push(`${scenario.id}: no fallback outcome (one without \`requires\`)`)
      }

      for (const objective of scenario.objectives) {
        if (!outcomes.some((o) => o.achieved.includes(objective.id))) {
          problems.push(`${scenario.id}: objective "${objective.id}" can never be reached`)
        }
      }

      const raisable = new Set<string>()
      for (const node of Object.values(scenario.nodes)) {
        if (node.flag) raisable.add(node.flag)
        for (const response of node.responses) {
          if (response.flag) raisable.add(response.flag)
        }
      }
      for (const outcome of outcomes) {
        for (const flag of [...(outcome.requiresFlags ?? []), ...(outcome.forbidsFlags ?? [])]) {
          if (!raisable.has(flag)) {
            problems.push(`${scenario.id}/${outcome.id}: flag "${flag}" is never set anywhere`)
          }
        }
      }

      const moves = Object.values(scenario.nodes).some((node) =>
        node.responses.some((r) => r.effects && Object.keys(r.effects).length > 0),
      )
      if (!moves) {
        problems.push(`${scenario.id}: no response has effects, so the meters never move`)
      }
      for (const outcome of outcomes) {
        if (!outcome.consequences.length) {
          problems.push(`${scenario.id}/${outcome.id}: no consequences — the payoff would be empty`)
        }
      }
    }

    // Goal-driven scenarios may be shorter: their length comes from replaying
    // them with a different objective, and a polite café exchange really is
    // four taps. The floor still catches two-tap stubs.
    const floor = scenario.objectives ? 4 : 6
    problems.push(...unreachable(scenario))

    const { min, max } = choiceCounts(scenario)
    if (min < floor || max > 14) {
      problems.push(`${scenario.id}: paths take ${min}–${max} choices (aiming for ${floor}–12)`)
    }
  }

  if (problems.length) console.error('[nebenbei] content problems:\n' + problems.join('\n'))
}

/**
 * Walks every path through the graph, carrying the meters and flags, and
 * reports content that can never actually happen: a conditional line whose
 * threshold no route reaches, or an ending nothing resolves to.
 *
 * Worth the brute force — a variant that never fires is invisible in the app
 * and impossible to spot by reading the thresholds.
 */
function unreachable(scenario: Scenario): string[] {
  const seenLines = new Set<string>()
  const seenOutcomes = new Set<string>()
  let paths = 0

  const walk = (nodeId: string, meters: Meters, flags: string[], visited: Set<string>) => {
    if (paths > 200_000) return
    const node = scenario.nodes[nodeId]
    if (!node || visited.has(nodeId)) return

    const raised = node.flag ? [...flags, node.flag] : flags
    node.messages.forEach((message, index) => {
      if (matches(message.when, meters)) seenLines.add(`${nodeId}:${index}`)
    })

    if (!node.responses.length) {
      paths += 1
      const outcome = resolveOutcome(scenario, meters, raised)
      if (outcome) seenOutcomes.add(outcome.id)
      return
    }

    const next = new Set(visited).add(nodeId)
    for (const response of node.responses) {
      if (!response.next) continue
      walk(
        response.next,
        applyEffects(meters, response.effects),
        response.flag ? [...raised, response.flag] : raised,
        next,
      )
    }
  }

  walk(scenario.startNodeId, startingMeters(scenario), [], new Set())

  const problems: string[] = []
  for (const [nodeId, node] of Object.entries(scenario.nodes)) {
    node.messages.forEach((message, index) => {
      if (message.when && !seenLines.has(`${nodeId}:${index}`)) {
        problems.push(
          `${scenario.id}/${nodeId}: message ${index} never fires — no path meets its condition`,
        )
      }
    })
  }
  for (const outcome of scenario.outcomes ?? []) {
    if (!seenOutcomes.has(outcome.id)) {
      problems.push(`${scenario.id}: outcome "${outcome.id}" is unreachable`)
    }
  }
  return problems
}

/**
 * Shortest and longest number of taps from the first message to an end node.
 * Cycles are cut off by only walking each node once per path.
 */
function choiceCounts(scenario: Scenario): { min: number; max: number } {
  let min = Infinity
  let max = 0

  const walk = (nodeId: string, depth: number, seen: Set<string>) => {
    const node = scenario.nodes[nodeId]
    if (!node || seen.has(nodeId)) return
    if (node.responses.length === 0) {
      min = Math.min(min, depth)
      max = Math.max(max, depth)
      return
    }
    const next = new Set(seen).add(nodeId)
    for (const response of node.responses) {
      if (response.next) walk(response.next, depth + 1, next)
      else {
        min = Math.min(min, depth + 1)
        max = Math.max(max, depth + 1)
      }
    }
  }

  walk(scenario.startNodeId, 0, new Set())
  return { min: min === Infinity ? 0 : min, max }
}
