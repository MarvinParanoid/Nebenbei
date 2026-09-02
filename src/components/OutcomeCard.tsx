import { useState } from 'react'
import { glossary } from '../data/glossary'
import { getEndings } from '../lib/endings'
import type { GlossaryId, Meters, Objective, Outcome, Scenario } from '../types'

type Props = {
  scenario: Scenario
  outcome: Outcome
  objective: Objective | null
  /** The line that moved the conversation most, with its translation. */
  quote: { text: string; ru: string } | null
  /** Revealed here and only here — during the conversation they stay hidden. */
  meters: Meters
  phrases: GlossaryId[]
  onStart: (objectiveId: string) => void
  onGoals: () => void
}

function verdict(
  outcome: Outcome,
  objective: Objective | null,
): { text: string; tone: 'reached' | 'missed' | 'secret' | 'plain' } {
  if (outcome.secret) return { text: 'Geheimes Ende', tone: 'secret' }
  if (!objective) return { text: "Das war's", tone: 'plain' }
  return outcome.achieved.includes(objective.id)
    ? { text: 'Geschafft', tone: 'reached' }
    : { text: 'Nicht geschafft', tone: 'missed' }
}

/**
 * What to offer next. First choice is the opposite intention of what was just
 * played — that makes the replay a different conversation rather than a retry.
 * If that one is already done, any goal still without an ending.
 */
function suggest(scenario: Scenario, current: Objective | null): Objective | null {
  const objectives = scenario.objectives ?? []
  const found = new Set(getEndings(scenario.id))
  const done = (objective: Objective) =>
    scenario.outcomes?.some((o) => o.achieved.includes(objective.id) && found.has(o.id)) ?? false

  const contrast = objectives.find((o) => o.id === current?.contrast)
  if (contrast && !done(contrast)) return contrast

  const open = objectives.filter((o) => o.id !== current?.id && !done(o))
  return open[0] ?? contrast ?? objectives.find((o) => o.id !== current?.id) ?? null
}

const CELLS = 8

function Meter({ label, value }: { label: string; value: number }) {
  const filled = Math.round((value / 100) * CELLS)
  return (
    <div className="meter">
      <span className="meter__label">{label}</span>
      <span className="meter__track" aria-label={`${label}: ${value} von 100`}>
        {Array.from({ length: CELLS }, (_, i) => (
          <span key={i} className="meter__cell" data-on={i < filled} />
        ))}
      </span>
    </div>
  )
}

/**
 * How it ended: the verdict, what it cost, how the other person feels now, and
 * the line that decided it. Not a score — the judgement is about what you
 * achieved socially, never about your German, and a missed goal is written to
 * be funny rather than punishing.
 */
export function OutcomeCard({
  scenario,
  outcome,
  objective,
  quote,
  meters,
  phrases,
  onStart,
  onGoals,
}: Props) {
  // Three at most: more than that and the payoff turns into a word list.
  const entries = phrases.map((id) => glossary[id]).filter(Boolean).slice(0, 3)
  const { text, tone } = verdict(outcome, objective)
  const next = suggest(scenario, objective)
  const [ru, setRu] = useState(false)

  return (
    <div className="end">
      <div className="end__head">
        <p className="end__verdict" data-tone={tone}>
          {text}
        </p>
        <button
          type="button"
          className="ru-toggle"
          aria-label={ru ? 'Deutsch anzeigen' : 'Übersetzung anzeigen'}
          data-on={ru}
          onClick={() => setRu(!ru)}
        >
          {ru ? 'DE' : 'RU'}
        </button>
      </div>

      <p className="end__title">{outcome.title}</p>
      {ru && <p className="end__title-ru">{outcome.titleRu}</p>}

      <ul className="end__consequences">
        {outcome.consequences.map((line) => (
          <li key={line.de}>
            <span className="end__de">{line.de}</span>
            {ru && <span className="end__ru">{line.ru}</span>}
          </li>
        ))}
      </ul>

      {quote && (
        <>
          <p className="end__label">{outcome.quoteLabel ?? 'Der Satz, der es entschieden hat'}</p>
          <p className="end__quote">„{quote.text}"</p>
          {ru && <p className="end__ru">{quote.ru}</p>}
        </>
      )}

      <p className="end__label">{scenario.character.name}</p>
      <div className="end__meters">
        <Meter label="Ärger" value={meters.anger} />
        <Meter label="Respekt" value={meters.respect} />
      </div>

      {entries.length > 0 && (
        <>
          <p className="end__label">Nebenbei aufgeschnappt</p>
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
        {next && (
          <button type="button" className="btn btn--primary" onClick={() => onStart(next.id)}>
            Nochmal — diesmal: {next.title}
          </button>
        )}
        <button type="button" className="btn btn--ghost" onClick={onGoals}>
          Alle Ziele
        </button>
      </div>
    </div>
  )
}
