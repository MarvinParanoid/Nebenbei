import { glossary } from '../data/glossary'
import type { GlossaryId } from '../types'

export type MessageToken =
  | { kind: 'text'; text: string }
  | { kind: 'phrase'; text: string; glossaryId: GlossaryId }

const ANNOTATION = /\[([^\][]+)\]\(([a-z0-9-]+)\)/g

/**
 * Splits a message into plain text and tappable phrase tokens.
 *
 * Annotations look like `[so gegen 8](so-gegen-acht)`. Unknown ids degrade to
 * plain text rather than rendering a dead tap target.
 */
export function parseMessage(text: string): MessageToken[] {
  const tokens: MessageToken[] = []
  let cursor = 0

  for (const match of text.matchAll(ANNOTATION)) {
    const [full, surface, id] = match
    const at = match.index
    if (at > cursor) tokens.push({ kind: 'text', text: text.slice(cursor, at) })
    if (id in glossary) {
      tokens.push({ kind: 'phrase', text: surface, glossaryId: id })
    } else {
      tokens.push({ kind: 'text', text: surface })
    }
    cursor = at + full.length
  }

  if (cursor < text.length) tokens.push({ kind: 'text', text: text.slice(cursor) })
  return tokens
}

/** The message as a reader sees it, without annotation syntax. */
export function plainText(text: string): string {
  return text.replace(ANNOTATION, '$1')
}

/** Every glossary id referenced by a message. */
export function phraseIds(text: string): GlossaryId[] {
  return [...text.matchAll(ANNOTATION)].map((m) => m[2]).filter((id) => id in glossary)
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Notable expressions in a message, for the translation sheet.
 *
 * Annotated chunks come first — those are authored, so they are exact. After
 * them, any dictionary entry whose phrase literally occurs in the text: the
 * user's own lines carry no annotations (markup there would render as
 * brackets), and "what was that expression I just used?" is a fair question.
 * A literal match is a bonus, not a promise — lemma forms like `dabei sein`
 * simply won't match, and that is fine.
 */
export function findChunks(text: string, limit = 4): GlossaryId[] {
  const found = [...phraseIds(text)]
  const plain = plainText(text)
  for (const [id, entry] of Object.entries(glossary)) {
    if (found.length >= limit) break
    if (found.includes(id)) continue
    // Letter boundaries, so `halt` doesn't match `haltbar`.
    const pattern = new RegExp(`(?<!\\p{L})${escape(entry.phrase)}(?!\\p{L})`, 'iu')
    if (pattern.test(plain)) found.push(id)
  }
  return found.slice(0, limit)
}

/**
 * How long the character "types" a message. Long messages take longer, but
 * never long enough to make the chat feel slow.
 */
export function typingDuration(text: string): number {
  const chars = plainText(text).length
  return Math.round(Math.min(1500, 420 + chars * 11))
}
