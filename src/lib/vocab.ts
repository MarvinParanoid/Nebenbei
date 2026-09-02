import { glossary } from '../data/glossary'
import type { GlossaryId } from '../types'

/**
 * Passive vocabulary log.
 *
 * Three signals per phrase: how often it went past you, how often you needed
 * the whole message translated, and how often you opened the phrase itself.
 * The distance between them is the interesting part — "seen five times, looked
 * up once, then understood without help".
 *
 * Invisible infrastructure, not a metric: nothing in the UI ever reports this
 * back at the user. It exists so a later story can quietly reuse the
 * expressions you struggled with.
 */
export type VocabRecord = {
  id: GlossaryId
  phrase: string
  translation: string
  /** Times the phrase card was opened — "I wasn't sure about this one". */
  views: number
  /** Times the phrase appeared in a message that was delivered. */
  seen: number
  /** Times a message containing it was translated as a whole. */
  translated: number
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

const blank = (id: GlossaryId, now: number): VocabRecord => ({
  id,
  phrase: glossary[id]?.phrase ?? id,
  translation: glossary[id]?.translation ?? '',
  views: 0,
  seen: 0,
  translated: 0,
  lastViewedAt: now,
  firstViewedAt: now,
})

export function recordLookup(
  id: GlossaryId,
  phrase: string,
  translation: string,
): VocabRecord {
  const all = read()
  const now = Date.now()
  const next: VocabRecord = {
    ...blank(id, now),
    ...all[id],
    phrase,
    translation,
    views: (all[id]?.views ?? 0) + 1,
    lastViewedAt: now,
  }
  all[id] = next
  write(all)
  return next
}

/** The phrase went past the user, in a message that was actually delivered. */
export function recordSeen(ids: GlossaryId[]): void {
  if (!ids.length) return
  const all = read()
  const now = Date.now()
  for (const id of ids) {
    const prev = all[id] ?? blank(id, now)
    all[id] = { ...prev, seen: prev.seen + 1 }
  }
  write(all)
}

/** The user asked for the whole message rather than for this phrase. */
export function recordTranslatedInMessage(ids: GlossaryId[]): void {
  if (!ids.length) return
  const all = read()
  const now = Date.now()
  for (const id of ids) {
    const prev = all[id] ?? blank(id, now)
    all[id] = { ...prev, translated: prev.translated + 1 }
  }
  write(all)
}

export function getVocab(): VocabRecord[] {
  return Object.values(read()).sort((a, b) => b.lastViewedAt - a.lastViewedAt)
}

export function getLookupCount(id: GlossaryId): number {
  return read()[id]?.views ?? 0
}
