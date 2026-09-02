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

/**
 * How long the character "types" a message. Long messages take longer, but
 * never long enough to make the chat feel slow.
 */
export function typingDuration(text: string): number {
  const chars = plainText(text).length
  return Math.round(Math.min(1500, 420 + chars * 11))
}
