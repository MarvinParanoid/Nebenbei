import { glossary } from '../data/glossary'
import type { GlossaryId } from '../types'
import { SheetShell } from './SheetShell'

type Props = {
  id: GlossaryId
  onClose: () => void
}

/**
 * Bottom sheet with the translation of one chunk. Deliberately shallow: it
 * closes and the conversation is exactly where it was.
 *
 * It deliberately says nothing about how often you have opened it before. That
 * is counted, but reporting it back would turn this into a vocabulary trainer.
 */
export function PhraseSheet({ id, onClose }: Props) {
  const entry = glossary[id]
  if (!entry) return null

  return (
    <SheetShell label={entry.phrase} onClose={onClose}>
      <p className="sheet__phrase">{entry.phrase}</p>
      <p className="sheet__translation">{entry.translation}</p>
      <div className="sheet__example">
        <p>{entry.example}</p>
        <p>{entry.exampleTranslation}</p>
      </div>
    </SheetShell>
  )
}
