import { parseMessage } from '../lib/message'
import type { GlossaryId } from '../types'

type Props = {
  from: 'them' | 'me'
  text: string
  openPhrase: GlossaryId | null
  onPhrase: (id: GlossaryId) => void
}

/**
 * One chat bubble. Incoming messages render their annotated chunks as
 * tappable spans; outgoing messages are plain (the user wrote them).
 */
export function Bubble({ from, text, openPhrase, onPhrase }: Props) {
  if (from === 'me') {
    return <div className="msg msg--me">{text}</div>
  }

  return (
    <div className="msg msg--them">
      {parseMessage(text).map((token, i) =>
        token.kind === 'text' ? (
          <span key={i}>{token.text}</span>
        ) : (
          // A span, not a button: a button is an atomic inline box, so a long
          // chunk would get pushed onto its own line instead of wrapping.
          <span
            key={i}
            role="button"
            tabIndex={0}
            className="phrase"
            data-open={openPhrase === token.glossaryId}
            onClick={() => onPhrase(token.glossaryId)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onPhrase(token.glossaryId)
              }
            }}
          >
            {token.text}
          </span>
        ),
      )}
    </div>
  )
}
