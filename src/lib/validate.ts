import { glossary } from '../data/glossary'
import { drafts, scenarios } from '../data/scenarios'
import { isText } from './message'
import { applyEffects, matches, resolveOutcome, startingMeters } from './meters'
import { recalls } from './cast'
import type { MemoryId, Meters, Scenario } from '../types'

/**
 * Dev-only content check: dangling `next` ids, unknown glossary references and
 * unreachable nodes are content bugs that are invisible until you walk the
 * exact branch, so shout about them in the console instead.
 */
export function validateScenarios(): void {
  const problems = findProblems()
  if (problems.length) console.error('[nebenbei] content problems:\n' + problems.join('\n'))
}

/** Every content problem in every scenario. Pure, so a test can assert on it. */
export function findProblems(): string[] {
  const problems: string[] = []
  const ANNOTATION = /\[([^\][]+)\]\(([a-z0-9-]+)\)/g

  // Memories cross scenario borders, so they are collected across all of them
  // first: a gate on an id no ending ever writes is a line that can never be
  // said, and unlike a dead threshold it reads perfectly reasonably.
  const written = new Set<MemoryId>()
  const experiences = new Map<MemoryId, string>()
  for (const scenario of [...scenarios, ...drafts]) {
    if (scenario.experience) {
      const owner = experiences.get(scenario.experience)
      if (owner) {
        problems.push(
          `${scenario.id}: experience "${scenario.experience}" is already left by ${owner}`,
        )
      }
      experiences.set(scenario.experience, scenario.id)
      written.add(scenario.experience)
      // Gating a scenario on its own experience means it only shows up once
      // you have played it, which is never.
      if (scenario.after?.includes(scenario.experience)) {
        problems.push(`${scenario.id}: waits for its own experience, so it can never appear`)
      }
    }
    for (const outcome of scenario.outcomes ?? []) {
      for (const id of outcome.reveals ?? []) written.add(id)
    }
  }
  const everything = new Set(written)

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
      // A node made only of conditional lines could deliver nothing at all —
      // including a node whose only unconditional line is gated on a memory,
      // which would come out empty for anyone playing it first.
      if (!node.messages.some((message) => !message.when && !message.after && !message.unless)) {
        problems.push(`${scenario.id}/${node.id}: every message is conditional`)
      }
      // Same for the choices: a turn where every reply needs a past would be a
      // dead end for a newcomer.
      if (node.responses.length && !node.responses.some((r) => !r.after && !r.unless)) {
        problems.push(`${scenario.id}/${node.id}: every response needs a memory`)
      }
      for (const gate of [node, ...node.messages, ...node.responses]) {
        for (const id of [...('after' in gate ? gate.after ?? [] : []), ...('unless' in gate ? gate.unless ?? [] : [])]) {
          if (!written.has(id)) {
            problems.push(`${scenario.id}/${node.id}: memory "${id}" is never remembered by any ending`)
          }
        }
      }
      for (const block of node.messages) {
        // A reaction has nothing to translate; everything else does.
        if ('kind' in block && block.kind === 'reaction') continue
        if (!block.ru.trim()) {
          problems.push(`${scenario.id}/${node.id}: a message has an empty translation`)
        }
        // A card is pure typography: its label and rows have no parser, so an
        // annotation there would render as literal brackets.
        if ('kind' in block && block.kind === 'card') {
          const cells = [
            block.card.label,
            ...block.card.rows.flatMap((row) => [row.left, row.right ?? '']),
            block.card.total?.left ?? '',
            block.card.total?.right ?? '',
          ]
          if (cells.some((cell) => ANNOTATION.test(cell))) {
            problems.push(`${scenario.id}/${node.id}: a card contains phrase markup`)
          }
          ANNOTATION.lastIndex = 0
          continue
        }
        if (!isText(block)) continue
        for (const [, , id] of block.text.matchAll(ANNOTATION)) {
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
    problems.push(...cycles(scenario))

    // Two histories, because a memory gate is fixed for a whole conversation:
    // someone playing this first, and someone for whom everything has already
    // happened. A line has to be reachable in one of them, and the graph has
    // to hold up in both.
    const histories: Set<MemoryId>[] = [new Set(), everything]
    const live = { lines: new Set<string>(), outcomes: new Set<string>() }
    let min = Infinity
    let max = 0
    for (const memories of histories) {
      const seen = walkPaths(scenario, memories)
      for (const line of seen.lines) live.lines.add(line)
      for (const id of seen.outcomes) live.outcomes.add(id)
      const counts = choiceCounts(scenario, memories)
      min = Math.min(min, counts.min)
      max = Math.max(max, counts.max)
    }
    problems.push(...deadContent(scenario, live))

    if (min < floor || max > 12) {
      problems.push(`${scenario.id}: paths take ${min}–${max} choices (aiming for ${floor}–12)`)
    }
  }

  return problems
}

/**
 * Every choice has to move the conversation forward.
 *
 * A cycle lets the user loop the same two nodes for as long as they like,
 * pushing the meters to their ceiling and making the ending meaningless — and
 * the path walks below would never notice, because they stop at nodes they
 * have already visited.
 */
function cycles(scenario: Scenario): string[] {
  const problems: string[] = []
  const seen = new Set<string>()

  const walk = (nodeId: string, stack: string[]) => {
    for (const response of scenario.nodes[nodeId]?.responses ?? []) {
      const next = response.next
      if (!next) continue
      const at = stack.indexOf(next)
      if (at !== -1) {
        const loop = [...stack.slice(at), next].join(' → ')
        if (!seen.has(loop)) {
          seen.add(loop)
          problems.push(`${scenario.id}: the conversation can loop — ${loop}`)
        }
        continue
      }
      walk(next, [...stack, next])
    }
  }

  walk(scenario.startNodeId, [scenario.startNodeId])
  return problems
}

/**
 * Walks every path through the graph, carrying the meters and flags, and
 * records what actually happened: which conditional lines fired and which
 * endings something resolved to.
 *
 * Worth the brute force — a variant that never fires is invisible in the app
 * and impossible to spot by reading the thresholds. `memories` fixes the
 * history the walk is played with, since that cannot change mid-conversation.
 */
function walkPaths(
  scenario: Scenario,
  memories: Set<MemoryId>,
): { lines: Set<string>; outcomes: Set<string> } {
  const lines = new Set<string>()
  const outcomes = new Set<string>()
  let paths = 0

  const walk = (nodeId: string, meters: Meters, flags: string[], visited: Set<string>) => {
    if (paths > 200_000) return
    const node = scenario.nodes[nodeId]
    if (!node || visited.has(nodeId)) return

    const raised = node.flag ? [...flags, node.flag] : flags
    node.messages.forEach((message, index) => {
      if (matches(message.when, meters) && recalls(message, memories)) lines.add(`${nodeId}:${index}`)
    })

    const open = node.responses.filter((response) => recalls(response, memories))
    if (!open.length) {
      paths += 1
      const outcome = resolveOutcome(scenario, meters, raised)
      if (outcome) outcomes.add(outcome.id)
      return
    }

    const next = new Set(visited).add(nodeId)
    for (const response of open) {
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
  return { lines, outcomes }
}

/** Lines and endings that no history and no route can produce. */
function deadContent(
  scenario: Scenario,
  live: { lines: Set<string>; outcomes: Set<string> },
): string[] {
  const problems: string[] = []
  for (const [nodeId, node] of Object.entries(scenario.nodes)) {
    node.messages.forEach((message, index) => {
      const gated = message.when || message.after || message.unless
      if (gated && !live.lines.has(`${nodeId}:${index}`)) {
        problems.push(
          `${scenario.id}/${nodeId}: message ${index} never fires — no path meets its condition`,
        )
      }
    })
  }
  for (const outcome of scenario.outcomes ?? []) {
    if (!live.outcomes.has(outcome.id)) {
      problems.push(`${scenario.id}: outcome "${outcome.id}" is unreachable`)
    }
  }
  return problems
}

/**
 * Shortest and longest number of taps from the first message to an end node.
 * Cycles are cut off by only walking each node once per path.
 */
function choiceCounts(scenario: Scenario, memories: Set<MemoryId>): { min: number; max: number } {
  let min = Infinity
  let max = 0

  const walk = (nodeId: string, depth: number, seen: Set<string>) => {
    const node = scenario.nodes[nodeId]
    if (!node || seen.has(nodeId)) return
    const open = node.responses.filter((response) => recalls(response, memories))
    if (open.length === 0) {
      min = Math.min(min, depth)
      max = Math.max(max, depth)
      return
    }
    const next = new Set(seen).add(nodeId)
    for (const response of open) {
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
