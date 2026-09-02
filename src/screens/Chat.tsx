import { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar } from '../components/Avatar'
import { Bubble } from '../components/Bubble'
import { CardBubble } from '../components/CardBubble'
import { Send } from '../components/Send'
import { SystemLine } from '../components/SystemLine'
import { EndCard } from '../components/EndCard'
import { OutcomeCard } from '../components/OutcomeCard'
import { PhraseSheet } from '../components/PhraseSheet'
import { TypingIndicator } from '../components/TypingIndicator'
import { glossary } from '../data/glossary'
import { clockAt } from '../lib/clock'
import { findChunks } from '../lib/message'
import { markEnding } from '../lib/endings'
import { hintDone, markHint } from '../lib/hints'
import { markFinished } from '../lib/progress'
import { remember } from '../lib/cast'
import { noteSelected, noteTranslated } from '../lib/signals'
import { useConversation } from '../lib/useConversation'
import { getLookupCount, recordLookup, recordTranslatedInMessage } from '../lib/vocab'
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
  const [phrase, setPhrase] = useState<GlossaryId | null>(null)
  /** Messages whose translation is currently unfolded, by item key. */
  const [open, setOpen] = useState<string[]>([])
  /** Shown until the user taps a text for the first time, ever. */
  const [hint, setHint] = useState(() => !hintDone('translate'))
  const threadRef = useRef<HTMLDivElement>(null)

  const openPhrase = useCallback((id: GlossaryId) => {
    const entry = glossary[id]
    if (!entry) return
    recordLookup(id, entry.phrase, entry.translation)
    setPhrase(id)
  }, [])

  const toggle = useCallback(
    (key: string, text: string) => {
      // The side effect stays outside the updater: React calls updaters twice
      // in development to catch exactly this, and it would count twice.
      if (!open.includes(key)) {
        // Asking for the whole message is a weaker signal than opening a
        // phrase, but it is still a signal about these expressions.
        recordTranslatedInMessage(findChunks(text))
      }
      setOpen((current) =>
        current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
      )
      markHint('translate')
      setHint(false)
    },
    [open],
  )

  // Follow the conversation as it grows.
  useEffect(() => {
    const el = threadRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: items.length > 1 ? 'smooth' : 'auto' })
  }, [items, typing, ready, finished])

  useEffect(() => {
    if (!finished) return
    markFinished(scenario.id)
    if (outcome) {
      markEnding(scenario.id, outcome.id)
      // The two things that outlive a run: that this conversation happened at
      // all, and anything it taught you. How it ended stays in the run — the
      // same person may reach five other endings tomorrow.
      remember([scenario.experience, ...(outcome.reveals ?? [])].filter(Boolean) as string[])
    }
  }, [finished, outcome, scenario.id, scenario.experience])

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
        {items.map((item, index) => {
          const shown = open.includes(item.key)
          const flip = () => toggle(item.key, item.text)
          if (item.kind === 'reaction') {
            return (
              <div className="reaction" key={item.key}>
                {item.emoji} 1
              </div>
            )
          }
          if (item.kind === 'system' || item.kind === 'action') {
            return (
              <SystemLine
                key={item.key}
                text={item.text}
                ru={item.ru}
                translated={shown}
                onToggle={flip}
              />
            )
          }
          if (item.kind === 'card' && item.card) {
            return (
              <CardBubble
                key={item.key}
                card={item.card}
                ru={item.ru}
                translated={shown}
                onToggle={flip}
              />
            )
          }
          return (
            <Bubble
              key={item.key}
              from={item.from}
              text={item.text}
              ru={item.ru}
              time={clockAt(scenario.startTime ?? '18:30', index)}
              translated={shown}
              onToggle={flip}
              openPhrase={phrase}
              onPhrase={openPhrase}
            />
          )
        })}
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
          {hint && <p className="dock__hint">Tippe auf einen Text, um ihn zu übersetzen.</p>}
          {choices.map((response) => {
            const shown = translated.includes(response.id)
            return (
              <div
                className={response.action ? 'choice choice--action' : 'choice'}
                key={response.id}
                data-translated={shown}
              >
                {/* Tapping the text only ever means "let me understand this" —
                    the same gesture as on a bubble. Nothing is sent by it. */}
                <button
                  type="button"
                  className="choice__text"
                  onClick={() => {
                    if (!shown) noteTranslated(scenario.id, response.id)
                    if (!shown) {
                      markHint('translate')
                      setHint(false)
                    }
                    setTranslated((current) =>
                      shown
                        ? current.filter((id) => id !== response.id)
                        : [...current, response.id],
                    )
                  }}
                >
                  {/* A line that exists only because this happened between you
                      before. Marked, but barely: the reward is the sentence
                      itself, and most people will just recognise the reference. */}
                  {response.callback && <span className="choice__recall">Damals</span>}
                  {response.action ? `[ ${response.text} ]` : response.text}
                  {/* German stays on top and Russian joins it underneath, the
                      same pair a bubble shows — one mental model, not two. */}
                  {shown && <span className="choice__ru-line">{response.ru}</span>}
                </button>
                {/* And the plane only ever means "send this one". */}
                <button
                  type="button"
                  className="choice__send"
                  data-choice={response.id}
                  aria-label="Senden"
                  onClick={() => {
                    noteSelected(scenario.id, response.id)
                    // Cleared here rather than in an effect: sending is the
                    // event that makes the old translations irrelevant.
                    setTranslated([])
                    choose(response.id)
                  }}
                >
                  <Send />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {phrase && <PhraseSheet id={phrase} onClose={() => setPhrase(null)} />}
    </div>
  )
}
