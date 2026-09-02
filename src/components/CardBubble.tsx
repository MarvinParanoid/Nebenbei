import type { Card } from '../types'

/**
 * A document shared into the chat — a bill, a departure board, an ad. Built
 * from type alone, and often the language task itself: reading it *is* the
 * exercise, which is why it gets no illustration.
 */
export function CardBubble({
  card,
  ru,
  translated,
  onToggle,
}: {
  card: Card
  ru: string
  translated: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="doc"
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onToggle()
        }
      }}
    >
      <p className="doc__label">{card.label}</p>
      <dl className="doc__rows">
        {card.rows.map((row) => (
          <div key={row.left} className="doc__row">
            <dt>{row.left}</dt>
            {row.right && <dd>{row.right}</dd>}
          </div>
        ))}
      </dl>
      {card.total && (
        <div className="doc__row doc__row--total">
          <span>{card.total.left}</span>
          <span>{card.total.right}</span>
        </div>
      )}
      {translated && <p className="doc__ru">{ru}</p>}
    </div>
  )
}
