import { useCallback, useEffect, useRef, useState } from 'react'
import { Bubble } from '../components/Bubble'
import { EndCard } from '../components/EndCard'
import { MessageSheet } from '../components/MessageSheet'
import { OutcomeCard } from '../components/OutcomeCard'
import { PhraseSheet } from '../components/PhraseSheet'
import { TypingIndicator } from '../components/TypingIndicator'
import { glossary } from '../data/glossary'
import { clockAt } from '../lib/clock'
import { findChunks } from '../lib/message'
import { markEnding } from '../lib/endings'
import { markFinished } from '../lib/progress'
import { useConversation } from '../lib/useConversation'
import { getLookupCount, recordLookup } from '../lib/vocab'
import type { GlossaryId, Objective, Scenario } from '../types'

/** What the bottom sheet is currently showing, if anything. */
type SheetState =
  | { kind: 'phrase'; id: GlossaryId; views: number; back?: SheetState }
  | { kind: 'message'; text: string; ru: string; chunks: GlossaryId[] }

type Props = {
  scenario: Scenario
  /** The goal the user picked, or null in free mode / goal-less scenarios. */
  objective: Objective | null
  onHome: () => void
  onGoals: () => void
}

export function Chat({ scenario, objective, onHome, onGoals }: Props) {
  const { items, typing, choices, ready, finished, seen, outcome, tippingLine, choose, restart } =
    useConversation(scenario)
  const [sheet, setSheet] = useState<SheetState | null>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  const openPhrase = useCallback((id: GlossaryId) => {
    const entry = glossary[id]
    if (!entry) return
    const { views } = recordLookup(id, entry.phrase, entry.translation)
    // Opened from a message sheet? Closing should go back there, not to zero.
    setSheet((current) => ({
      kind: 'phrase',
      id,
      views,
      back: current?.kind === 'message' ? current : undefined,
    }))
  }, [])

  const openMessage = useCallback((text: string, ru: string) => {
    setSheet({ kind: 'message', text, ru, chunks: findChunks(text) })
  }, [])

  const closeSheet = useCallback(() => {
    setSheet((current) => (current?.kind === 'phrase' ? (current.back ?? null) : null))
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
        <div className="avatar chat__avatar" style={{ ['--hue' as string]: scenario.hue }}>
          {scenario.character.avatar}
        </div>
        <div className="chat__who">
          <div className="chat__name">{scenario.character.name}</div>
          {/* A reminder of what you came here to do — not a meter. */}
          <div className="chat__context">
            {objective ? `${objective.emoji} ${objective.title}` : scenario.contextLine}
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
            openPhrase={sheet?.kind === 'phrase' ? sheet.id : null}
            onPhrase={openPhrase}
            onMessage={openMessage}
          />
        ))}
        {typing && <TypingIndicator name={scenario.character.name} />}
        {finished &&
          (outcome ? (
            <OutcomeCard
              outcome={outcome}
              objective={objective}
              quote={tippingLine}
              phrases={closingPhrases}
              onRetry={restart}
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
          {choices.map((response) => (
            <div className="choice" key={response.id}>
              <button
                type="button"
                className="choice__send"
                data-choice={response.id}
                onClick={() => choose(response.id)}
              >
                {response.text}
              </button>
              {/* Separate target: tapping the card itself sends it, and
                  "what am I about to say?" must not cost you the turn. */}
              <button
                type="button"
                className="choice__ru"
                aria-label="Übersetzung anzeigen"
                onClick={() => openMessage(response.text, response.ru)}
              >
                RU
              </button>
            </div>
          ))}
        </div>
      )}

      {sheet?.kind === 'phrase' && (
        <PhraseSheet id={sheet.id} views={sheet.views} onClose={closeSheet} />
      )}
      {sheet?.kind === 'message' && (
        <MessageSheet
          text={sheet.text}
          ru={sheet.ru}
          chunks={sheet.chunks}
          onPhrase={openPhrase}
          onClose={closeSheet}
        />
      )}
    </div>
  )
}
