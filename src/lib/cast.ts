import type { Availability, MemoryId } from '../types'

/**
 * What the people in Nebenbei remember about you.
 *
 * Nebenbei is not a library of independent conversations — it is one life in
 * German where the same handful of people write to you again. This is the
 * whole of that: a flat set of facts a finished conversation left behind
 * (`putzplan-vereinbart`, `rad-verkauft`), written by an `Outcome` and read by
 * the lines and choices of later scenarios.
 *
 * It is never rendered. No profiles, no relationship bars, no "Jonas mag dich
 * (7/10)" — the only evidence is that Jonas opens the next conversation
 * differently, and that a reply exists which would not exist otherwise. The
 * moment this becomes a screen it turns into a stat to farm.
 */
const KEY = 'nebenbei.cast.v1'

export function getMemories(): Set<MemoryId> {
  try {
    const raw = localStorage.getItem(KEY)
    return new Set(raw ? (JSON.parse(raw) as MemoryId[]) : [])
  } catch {
    return new Set()
  }
}

export function remember(ids: MemoryId[] | undefined): void {
  if (!ids?.length) return
  const all = getMemories()
  for (const id of ids) all.add(id)
  try {
    localStorage.setItem(KEY, JSON.stringify([...all]))
  } catch {
    // ignore
  }
}

/** Only used by the dev console and the tests — there is no reset in the UI. */
export function forget(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

/**
 * Whether a line, a choice or a whole scenario is available to someone with
 * this history. The counterpart of `matches()` in meters.ts: that one asks how
 * *this* conversation has gone, this one asks which ones happened before.
 */
export function recalls(gate: Pick<Availability, 'after' | 'unless'>, memories: Set<MemoryId>): boolean {
  if (gate.after?.some((id) => !memories.has(id))) return false
  if (gate.unless?.some((id) => memories.has(id))) return false
  return true
}
