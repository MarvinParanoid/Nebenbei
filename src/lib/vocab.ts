import type { GlossaryId } from '../types'

/**
 * Passive vocabulary log: every phrase the user has ever looked up.
 *
 * Deliberately dumb — this is raw material for later personalisation, not a
 * spaced-repetition schedule. Nothing in the UI grades the user on it.
 */
export type VocabRecord = {
  id: GlossaryId
  phrase: string
  translation: string
  views: number
  lastViewedAt: number
  firstViewedAt: number
}

const KEY = 'nebenbei.vocab.v1'

function read(): Record<GlossaryId, VocabRecord> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<GlossaryId, VocabRecord>) : {}
  } catch {
    return {}
  }
}

function write(all: Record<GlossaryId, VocabRecord>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // Private mode / full quota: tracking is a nice-to-have, never a blocker.
  }
}

export function recordLookup(
  id: GlossaryId,
  phrase: string,
  translation: string,
): VocabRecord {
  const all = read()
  const now = Date.now()
  const prev = all[id]
  const next: VocabRecord = {
    id,
    phrase,
    translation,
    views: (prev?.views ?? 0) + 1,
    lastViewedAt: now,
    firstViewedAt: prev?.firstViewedAt ?? now,
  }
  all[id] = next
  write(all)
  return next
}

export function getVocab(): VocabRecord[] {
  return Object.values(read()).sort((a, b) => b.lastViewedAt - a.lastViewedAt)
}

export function getLookupCount(id: GlossaryId): number {
  return read()[id]?.views ?? 0
}
