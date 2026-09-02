import { glossary } from '../data/glossary'
import { fillQuote } from '../lib/meters'
import type { GlossaryId, Objective, Outcome } from '../types'

type Props = {
  outcome: Outcome
  objective: Objective | null
  /** The line that moved the conversation most, quoted in the narrative. */
  quote: string | null
  phrases: GlossaryId[]
  onRetry: () => void
  onGoals: () => void
}

function verdict(outcome: Outcome, objective: Objective | null): string {
  if (outcome.secret) return 'Geheimes Ende 🕵️'
  if (!objective) return "Das war's ✌️"
  return outcome.achieved.includes(objective.id) ? `Ziel erreicht ${objective.emoji}` : 'Ziel verfehlt'
}

/**
 * How it ended. Not a score: the verdict is about what you achieved socially,
 * never about your German — and "Ziel verfehlt" is written to be funny, not
 * to punish.
 */
export function OutcomeCard({ outcome, objective, quote, phrases, onRetry, onGoals }: Props) {
  const entries = phrases.map((id) => glossary[id]).filter(Boolean).slice(0, 6)

  return (
    <div className="end">
      <p className="end__verdict">{verdict(outcome, objective)}</p>
      <p className="end__title">{outcome.title}</p>
      <p className="end__title-ru">{outcome.titleRu}</p>

      <p className="end__text">{fillQuote(outcome.text, quote)}</p>
      <p className="end__text-ru">{fillQuote(outcome.textRu, quote)}</p>

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
        <button type="button" className="btn btn--primary" onClick={onGoals}>
          Anderes Ziel
        </button>
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          Nochmal
        </button>
      </div>
    </div>
  )
}
