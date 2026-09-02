import { parseMessage } from '../lib/message'
import type { GlossaryId } from '../types'

type Props = {
  from: 'them' | 'me'
  text: string
  ru: string
  /** Clock label shown in the corner of the bubble. */
  time: string
  openPhrase: GlossaryId | null
  onPhrase: (id: GlossaryId) => void
  onMessage: (text: string, ru: string) => void
}

/**
 * One chat bubble. Tapping it opens the full translation; tapping an annotated
 * chunk inside an incoming message opens that chunk instead. Own bubbles are
 * rendered verbatim — the user wrote them — but stay tappable, because
 * "what did I just say?" is a real question.
 */
export function Bubble({ from, text, ru, time, openPhrase, onPhrase, onMessage }: Props) {
  const translate = () => onMessage(text, ru)
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      translate()
    }
  }

  return (
    <div
      className={`msg msg--${from}`}
      role="button"
      tabIndex={0}
      aria-label="Nachricht übersetzen"
      onClick={translate}
      onKeyDown={onKeyDown}
    >
      {from === 'me'
        ? text
        : parseMessage(text).map((token, i) =>
            token.kind === 'text' ? (
              <span key={i}>{token.text}</span>
            ) : (
              // A span, not a button: a button is an atomic inline box, so a
              // long chunk would get pushed onto its own line instead of
              // wrapping.
              <span
                key={i}
                role="button"
                tabIndex={0}
                className="phrase"
                data-open={openPhrase === token.glossaryId}
                onClick={(event) => {
                  // Otherwise the bubble's own handler opens the full
                  // translation on top of the chunk.
                  event.stopPropagation()
                  onPhrase(token.glossaryId)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    event.stopPropagation()
                    onPhrase(token.glossaryId)
                  }
                }}
              >
                {token.text}
              </span>
            ),
          )}
      <span className="msg__time">
        {time}
        {from === 'me' && (
          <span className="msg__ticks" aria-hidden="true">
            ✓✓
          </span>
        )}
      </span>
    </div>
  )
}
