import { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar } from '../components/Avatar'
import { Bubble } from '../components/Bubble'
import { EndCard } from '../components/EndCard'
import { OutcomeCard } from '../components/OutcomeCard'
import { PhraseSheet } from '../components/PhraseSheet'
import { TypingIndicator } from '../components/TypingIndicator'
import { glossary } from '../data/glossary'
import { clockAt } from '../lib/clock'
import { markEnding } from '../lib/endings'
import { markFinished } from '../lib/progress'
import { noteSelected, noteTranslated } from '../lib/signals'
import { useConversation } from '../lib/useConversation'
import { getLookupCount, recordLookup } from '../lib/vocab'
import type { GlossaryId, Objective, Scenario } from '../types'

type Props = {
  scenario: Scenario
  /** The goal the user picked, or null in free mode / goal-less scenarios. */
  objective: Objective | null
  onHome: () => void
  onGoals: () => void
  onStart: (objectiveId: string) => void
}

export function Chat({ scenario, objective, onHome, onGoals, onStart }: Props) {
  const { items, typing, choices, ready, finished, seen, outcome, meters, tipping, choose, restart } =
    useConversation(scenario)
  /** Choices the user asked to see in Russian, by id. Reset every turn. */
  const [translated, setTranslated] = useState<string[]>([])
  const [phrase, setPhrase] = useState<{ id: GlossaryId; views: number } | null>(null)
  /** Messages whose translation is currently unfolded, by item key. */
  const [open, setOpen] = useState<string[]>([])
  const threadRef = useRef<HTMLDivElement>(null)

  const openPhrase = useCallback((id: GlossaryId) => {
    const entry = glossary[id]
    if (!entry) return
    const { views } = recordLookup(id, entry.phrase, entry.translation)
    setPhrase({ id, views })
  }, [])

  const toggle = useCallback((key: string) => {
    setOpen((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
    )
  }, [])

  // Follow the conversation as it grows.
  useEffect(() => {
    const el = threadRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: items.length > 1 ? 'smooth' : 'auto' })
  }, [items, typing, ready, finished])

  useEffect(() => {
    if (!finished) return
    markFinished(scenario.id)
    if (outcome) markEnding(scenario.id, outcome.id)
  }, [finished, outcome, scenario.id])

  // Phrases the user looked up float to the top of the closing list.
  const closingPhrases = finished
    ? [...seen].sort((a, b) => getLookupCount(b) - getLookupCount(a))
    : []

  return (
    <div className="chat screen">
      <header className="chat__header">
        <button type="button" className="back" onClick={onHome} aria-label="Zurück">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Avatar name={scenario.character.name} small />
        <div className="chat__who">
          <div className="chat__name">{scenario.character.name}</div>
          {/* A reminder of what you came here to do — not a meter. */}
          <div className={objective ? 'chat__context chat__goal' : 'chat__context'}>
            {objective ? objective.title : scenario.contextLine}
          </div>
        </div>
      </header>

      <div className="thread" ref={threadRef}>
        <div className="thread__day">Heute</div>
        {items.map((item, index) => (
          <Bubble
            key={item.key}
            from={item.from}
            text={item.text}
            ru={item.ru}
            time={clockAt(scenario.startTime ?? '18:30', index)}
            translated={open.includes(item.key)}
            onToggle={() => toggle(item.key)}
            openPhrase={phrase?.id ?? null}
            onPhrase={openPhrase}
          />
        ))}
        {typing && <TypingIndicator name={scenario.character.name} />}
        {finished &&
          (outcome ? (
            <OutcomeCard
              scenario={scenario}
              outcome={outcome}
              objective={objective}
              quote={tipping}
              meters={meters}
              phrases={closingPhrases}
              onStart={onStart}
              onGoals={onGoals}
            />
          ) : (
            <EndCard phrases={closingPhrases} onRestart={restart} onHome={onHome} />
          ))}
      </div>

      {choices.length > 0 && (
        // The dock is rendered while the reply is still arriving, faded out, so
        // the conversation above it never jumps between turns.
        <div className={ready ? 'dock' : 'dock dock--waiting'} aria-hidden={!ready}>
          {choices.map((response) => {
            const shown = translated.includes(response.id)
            return (
              <div className="choice" key={response.id} data-translated={shown}>
                <button
                  type="button"
                  className="choice__send"
                  data-choice={response.id}
                  onClick={() => {
                    noteSelected(scenario.id, response.id)
                    // Cleared here rather than in an effect: sending is the
                    // event that makes the old translations irrelevant.
                    setTranslated([])
                    choose(response.id)
                  }}
                >
                  {response.text}
                  {/* German stays on top and Russian joins it underneath, the
                      same pair a bubble shows — one mental model, not two. */}
                  {shown && <span className="choice__ru-line">{response.ru}</span>}
                </button>
                {/* Swaps this one card to Russian in place — no dialog, and
                    tapping the card itself still sends it. */}
                <button
                  type="button"
                  className="choice__ru"
                  aria-label={shown ? 'Deutsch anzeigen' : 'Übersetzung anzeigen'}
                  onClick={() => {
                    if (!shown) noteTranslated(scenario.id, response.id)
                    setTranslated((current) =>
                      shown
                        ? current.filter((id) => id !== response.id)
                        : [...current, response.id],
                    )
                  }}
                >
                  {shown ? 'DE' : 'RU'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {phrase && (
        <PhraseSheet id={phrase.id} views={phrase.views} onClose={() => setPhrase(null)} />
      )}
    </div>
  )
}
