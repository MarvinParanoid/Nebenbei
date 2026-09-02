/**
 * Which endings the user has already reached, per scenario. Used for a quiet
 * "already found" mark on the objective screen — a list of discovered endings,
 * not a score.
 */
const KEY = 'nebenbei.endings.v1'

type Found = Record<string, string[]>

function read(): Found {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Found) : {}
  } catch {
    return {}
  }
}

export function getEndings(scenarioId: string): string[] {
  return read()[scenarioId] ?? []
}

export function markEnding(scenarioId: string, outcomeId: string): void {
  const all = read()
  const found = new Set(all[scenarioId] ?? [])
  found.add(outcomeId)
  all[scenarioId] = [...found]
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // ignore
  }
}
