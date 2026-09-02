import { useCallback, useEffect, useRef, useState } from 'react'
import { Bubble } from '../components/Bubble'
import { EndCard } from '../components/EndCard'
import { PhraseSheet } from '../components/PhraseSheet'
import { TypingIndicator } from '../components/TypingIndicator'
import { glossary } from '../data/glossary'
import { markFinished } from '../lib/progress'
import { useConversation } from '../lib/useConversation'
import { getLookupCount, recordLookup } from '../lib/vocab'
import type { GlossaryId, Scenario } from '../types'

export function Chat({ scenario, onHome }: { scenario: Scenario; onHome: () => void }) {
  const { items, typing, choices, ready, finished, seen, choose, restart } = useConversation(scenario)
  const [phrase, setPhrase] = useState<{ id: GlossaryId; views: number } | null>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  const openPhrase = useCallback((id: GlossaryId) => {
    const entry = glossary[id]
    if (!entry) return
    const { views } = recordLookup(id, entry.phrase, entry.translation)
    setPhrase({ id, views })
  }, [])

  // Follow the conversation as it grows.
  useEffect(() => {
    const el = threadRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: items.length > 1 ? 'smooth' : 'auto' })
  }, [items, typing, ready, finished])

  useEffect(() => {
    if (finished) markFinished(scenario.id)
  }, [finished, scenario.id])

  // Phrases the user looked up float to the top of the closing list.
  const closingPhrases = finished
    ? [...seen].sort((a, b) => getLookupCount(b) - getLookupCount(a))
    : []

  return (
    <div className="chat">
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
          <div className="chat__context">{scenario.contextLine}</div>
        </div>
      </header>

      <div className="thread" ref={threadRef}>
        {items.map((item) => (
          <Bubble
            key={item.key}
            from={item.from}
            text={item.text}
            openPhrase={phrase?.id ?? null}
            onPhrase={openPhrase}
          />
        ))}
        {typing && <TypingIndicator name={scenario.character.name} />}
        {finished && (
          <EndCard
            phrases={closingPhrases}
            onRestart={restart}
            onHome={onHome}
          />
        )}
      </div>

      {choices.length > 0 && (
        // The dock is rendered while the reply is still arriving, faded out, so
        // the conversation above it never jumps between turns.
        <div className={ready ? 'dock' : 'dock dock--waiting'} aria-hidden={!ready}>
          {choices.map((response) => (
            <button
              key={response.id}
              type="button"
              className="choice"
              onClick={() => choose(response.id)}
            >
              {response.text}
            </button>
          ))}
        </div>
      )}

      {phrase && (
        <PhraseSheet id={phrase.id} views={phrase.views} onClose={() => setPhrase(null)} />
      )}
    </div>
  )
}
