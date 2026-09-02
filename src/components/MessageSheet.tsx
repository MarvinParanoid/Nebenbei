import { glossary } from '../data/glossary'
import { plainText } from '../lib/message'
import type { GlossaryId } from '../types'
import { SheetShell } from './SheetShell'

type Props = {
  text: string
  ru: string
  /** Notable expressions in this message; tapping one opens its own sheet. */
  chunks: GlossaryId[]
  onPhrase: (id: GlossaryId) => void
  onClose: () => void
}

/**
 * Full translation of one message — the other person's or the user's own —
 * plus the expressions worth keeping from it. Both questions ("what does this
 * sentence mean?" and "what was that turn of phrase?") arrive at the same
 * moment, so they belong in the same sheet.
 */
export function MessageSheet({ text, ru, chunks, onPhrase, onClose }: Props) {
  const entries = chunks.map((id) => [id, glossary[id]] as const).filter(([, entry]) => entry)

  return (
    <SheetShell label="Übersetzung" onClose={onClose}>
      <p className="sheet__german">{plainText(text)}</p>
      <p className="sheet__translation">{ru}</p>

      {entries.length > 0 && (
        <>
          <p className="sheet__label">Wendungen</p>
          <ul className="sheet__chunks">
            {entries.map(([id, entry]) => (
              <li key={id}>
                <button type="button" className="chunk" onClick={() => onPhrase(id)}>
                  <b>{entry.phrase}</b> <span>— {entry.translation}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </SheetShell>
  )
}
