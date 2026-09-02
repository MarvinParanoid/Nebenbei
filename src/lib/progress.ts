/**
 * Which conversations the user has already been through. Used only for a
 * quiet "schon gelesen" mark on the home screen — no streaks, no counters.
 */
const KEY = 'nebenbei.finished.v1'

export function getFinished(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function markFinished(scenarioId: string): void {
  const all = new Set(getFinished())
  all.add(scenarioId)
  try {
    localStorage.setItem(KEY, JSON.stringify([...all]))
  } catch {
    // ignore
  }
}
