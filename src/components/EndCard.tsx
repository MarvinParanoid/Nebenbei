import { glossary } from '../data/glossary'
import type { GlossaryId } from '../types'

type Props = {
  phrases: GlossaryId[]
  onRestart: () => void
  onHome: () => void
}

/**
 * Low-pressure closing note. No score, no "you learned N words" — just the
 * chunks that actually showed up in this chat.
 */
export function EndCard({ phrases, onRestart, onHome }: Props) {
  const entries = phrases.map((id) => glossary[id]).filter(Boolean).slice(0, 6)

  return (
    <div className="end">
      <p className="end__title">Das war's ✌️</p>
      {entries.length > 0 && (
        <>
          <p className="end__label">Aus diesem Chat</p>
          <ul className="end__list">
            {entries.map((entry) => (
              <li key={entry.phrase}>
                <b>{entry.phrase}</b> <span>— {entry.translation}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="end__actions">
        <button type="button" className="btn btn--primary" onClick={onHome}>
          Neue Unterhaltung
        </button>
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          Chat nochmal
        </button>
      </div>
    </div>
  )
}
