import type {
  Comparison,
  Conditions,
  MeterName,
  Meters,
  Objective,
  Outcome,
  Scenario,
} from '../types'

export const NEUTRAL_METERS: Meters = { anger: 0, respect: 50, patience: 60, guilt: 0 }

const clamp = (value: number) => Math.max(0, Math.min(100, value))

export function startingMeters(scenario: Scenario): Meters {
  return { ...(scenario.meters ?? NEUTRAL_METERS) }
}

export function applyEffects(meters: Meters, effects?: Partial<Meters>): Meters {
  if (!effects) return meters
  const next = { ...meters }
  for (const name of Object.keys(effects) as MeterName[]) {
    next[name] = clamp(next[name] + (effects[name] ?? 0))
  }
  return next
}

/** How far one choice moved the conversation, in any direction. */
export function weight(effects?: Partial<Meters>): number {
  if (!effects) return 0
  return Object.values(effects).reduce((sum, value) => sum + Math.abs(value ?? 0), 0)
}

function holds(value: number, [operator, threshold]: Comparison): boolean {
  switch (operator) {
    case '>=':
      return value >= threshold
    case '<=':
      return value <= threshold
    case '>':
      return value > threshold
    case '<':
      return value < threshold
  }
}

/** Whether the meters currently satisfy a set of conditions. */
export function matches(conditions: Conditions | undefined, meters: Meters): boolean {
  if (!conditions) return true
  return (Object.entries(conditions) as [MeterName, Comparison | Comparison[]][]).every(
    ([name, condition]) => {
      const list = Array.isArray(condition[0])
        ? (condition as Comparison[])
        : [condition as Comparison]
      return list.every((comparison) => holds(meters[name], comparison))
    },
  )
}

/** First outcome whose conditions all hold; the last one should have none. */
export function resolveOutcome(
  scenario: Scenario,
  meters: Meters,
  flags: string[] = [],
): Outcome | null {
  const raised = new Set(flags)
  for (const outcome of scenario.outcomes ?? []) {
    if (outcome.requiresFlags?.some((flag) => !raised.has(flag))) continue
    if (outcome.forbidsFlags?.some((flag) => raised.has(flag))) continue
    if (matches(outcome.requires, meters)) return outcome
  }
  return null
}

export function objectiveById(
  scenario: Scenario,
  id: string | undefined,
): Objective | undefined {
  return scenario.objectives?.find((objective) => objective.id === id)
}
