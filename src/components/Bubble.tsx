import { glossary } from '../data/glossary'
import { findChunks, parseMessage } from '../lib/message'
import type { GlossaryId } from '../types'

type Props = {
  from: 'them' | 'me'
  text: string
  ru: string
  /** Clock label shown in the corner of the bubble. */
  time: string
  /** Whether the translation is currently unfolded under the message. */
  translated: boolean
  onToggle: () => void
  openPhrase: GlossaryId | null
  onPhrase: (id: GlossaryId) => void
}

/**
 * One chat bubble. Tapping it unfolds the translation right inside the bubble —
 * reading a message is far too frequent an action to deserve a dialog. Tapping
 * an annotated chunk opens that chunk's sheet instead.
 *
 * Own bubbles are rendered verbatim (the user "wrote" them) but stay tappable,
 * because "what did I just say?" is a real question. Their expressions can't be
 * annotated in the data — markup would show as brackets — so once the
 * translation is open, any dictionary phrase in the line is offered as a chip.
 */
export function Bubble({
  from,
  text,
  ru,
  time,
  translated,
  onToggle,
  openPhrase,
  onPhrase,
}: Props) {
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }
  const phrase = (id: GlossaryId) => (event: React.MouseEvent | React.KeyboardEvent) => {
    // Otherwise the bubble's own handler folds the translation open or shut.
    event.stopPropagation()
    onPhrase(id)
  }
  const chips = from === 'me' && translated ? findChunks(text, 3) : []

  return (
    <div
      className={`msg msg--${from}`}
      role="button"
      tabIndex={0}
      aria-label="Nachricht übersetzen"
      onClick={onToggle}
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
                onClick={phrase(token.glossaryId)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    phrase(token.glossaryId)(event)
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

      {translated && (
        <span className="msg__ru">
          {ru}
          {chips.length > 0 && (
            <span className="msg__chips">
              {chips.map((id) => (
                <button key={id} type="button" className="chip" onClick={phrase(id)}>
                  {glossary[id].phrase}
                </button>
              ))}
            </span>
          )}
        </span>
      )}
    </div>
  )
}
