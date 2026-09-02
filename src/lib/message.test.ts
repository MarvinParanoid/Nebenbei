import { describe, expect, it } from 'vitest'
import { findChunks, isText, parseMessage, phraseIds, plainText, typingDuration } from './message'

describe('parseMessage', () => {
  it('splits an annotated chunk out of the surrounding text', () => {
    expect(parseMessage('Bist du [dabei](dabei-sein)?')).toEqual([
      { kind: 'text', text: 'Bist du ' },
      { kind: 'phrase', text: 'dabei', glossaryId: 'dabei-sein' },
      { kind: 'text', text: '?' },
    ])
  })

  it('degrades an unknown id to plain text instead of a dead tap target', () => {
    expect(parseMessage('Das ist [seltsam](gibt-es-nicht).')).toEqual([
      { kind: 'text', text: 'Das ist ' },
      { kind: 'text', text: 'seltsam' },
      { kind: 'text', text: '.' },
    ])
  })
})

describe('plainText', () => {
  it('reads the message the way the user sees it', () => {
    expect(plainText('Wir treffen uns [so gegen 8](so-gegen-acht).')).toBe(
      'Wir treffen uns so gegen 8.',
    )
  })
})

describe('phraseIds', () => {
  it('lists only ids the glossary actually has', () => {
    expect(phraseIds('[dabei](dabei-sein) und [nix](gibt-es-nicht)')).toEqual(['dabei-sein'])
  })
})

describe('findChunks', () => {
  it('finds a dictionary phrase in a line that carries no markup', () => {
    expect(findChunks('Keine Ahnung, ich komm da grad nicht ran.')).toContain('keine-ahnung')
  })

  it('respects letter boundaries', () => {
    // `halt` is a chunk; `haltbar` is a different word.
    expect(findChunks('Das ist bis Montag haltbar.')).not.toContain('halt')
    expect(findChunks('Das ist halt so.')).toContain('halt')
  })

  it('puts annotated chunks first and caps the list', () => {
    const found = findChunks('[ehrlich gesagt](ehrlich-gesagt) keine Ahnung, kein Stress', 2)
    expect(found[0]).toBe('ehrlich-gesagt')
    expect(found).toHaveLength(2)
  })
})

describe('typingDuration', () => {
  it('grows with the message but stays under a second and a half', () => {
    expect(typingDuration('Ja.')).toBeLessThan(typingDuration('Ja, aber eigentlich lieber morgen.'))
    expect(typingDuration('x'.repeat(500))).toBeLessThanOrEqual(1500)
  })
})

describe('isText', () => {
  it('separates bubbles from the other blocks', () => {
    expect(isText({ text: 'a', ru: 'b' })).toBe(true)
    expect(isText({ kind: 'system', text: 'a', ru: 'b' })).toBe(false)
    expect(isText({ kind: 'reaction', emoji: '👍' })).toBe(false)
  })
})
