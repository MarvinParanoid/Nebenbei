import { useEffect } from 'react'
import { glossary } from '../data/glossary'
import type { GlossaryId } from '../types'

type Props = {
  id: GlossaryId
  views: number
  onClose: () => void
}

/**
 * Bottom sheet with the translation of one chunk. Deliberately shallow: it
 * closes and the conversation is exactly where it was.
 */
export function PhraseSheet({ id, views, onClose }: Props) {
  const entry = glossary[id]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!entry) return null

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label={entry.phrase}>
        <div className="sheet__grip" />
        <p className="sheet__phrase">{entry.phrase}</p>
        <p className="sheet__translation">{entry.translation}</p>
        <div className="sheet__example">
          <p>{entry.example}</p>
          <p>{entry.exampleTranslation}</p>
        </div>
        {views > 1 && <p className="sheet__seen">Schon {views}× nachgeschaut</p>}
      </div>
    </>
  )
}
