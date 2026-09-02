import { glossary } from '../data/glossary'
import { scenarios } from '../data/scenarios'
import type { Scenario } from '../types'

/**
 * Dev-only content check: dangling `next` ids, unknown glossary references and
 * unreachable nodes are content bugs that are invisible until you walk the
 * exact branch, so shout about them in the console instead.
 */
export function validateScenarios(): void {
  const problems: string[] = []
  const ANNOTATION = /\[([^\][]+)\]\(([a-z0-9-]+)\)/g

  for (const scenario of scenarios) {
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
      for (const message of node.messages) {
        for (const [, , id] of message.text.matchAll(ANNOTATION)) {
          if (!(id in glossary)) {
            problems.push(`${scenario.id}/${node.id}: unknown glossary id "${id}"`)
          }
        }
      }
    }

    const { min, max } = choiceCounts(scenario)
    if (min < 6 || max > 14) {
      problems.push(`${scenario.id}: paths take ${min}–${max} choices (aiming for 6–12)`)
    }
  }

  if (problems.length) console.error('[nebenbei] content problems:\n' + problems.join('\n'))
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
