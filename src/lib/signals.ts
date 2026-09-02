/**
 * Quiet learning signals: which responses the user asked to see in Russian and
 * which ones they then sent. Nothing is shown anywhere — this is the substrate
 * for later personalisation, and it is deliberately the cheapest possible
 * record of "I wasn't sure what this meant".
 */
const KEY = 'nebenbei.signals.v1'

type Counts = { translated: number; selected: number }

function read(): Record<string, Counts> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<string, Counts>) : {}
  } catch {
    return {}
  }
}

function bump(scenarioId: string, choiceId: string, field: keyof Counts): void {
  const all = read()
  const key = `${scenarioId}/${choiceId}`
  const current = all[key] ?? { translated: 0, selected: 0 }
  all[key] = { ...current, [field]: current[field] + 1 }
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // Tracking is a nice-to-have, never a blocker.
  }
}

export const noteTranslated = (scenarioId: string, choiceId: string) =>
  bump(scenarioId, choiceId, 'translated')

export const noteSelected = (scenarioId: string, choiceId: string) =>
  bump(scenarioId, choiceId, 'selected')

export function getSignals(): Record<string, Counts> {
  return read()
}
