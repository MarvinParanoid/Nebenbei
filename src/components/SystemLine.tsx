/**
 * A line from the situation rather than from a person: "Jonas hat eine
 * Nachricht gelöscht." Tapping it shows the translation like anything else.
 */
export function SystemLine({
  text,
  ru,
  translated,
  onToggle,
}: {
  text: string
  ru: string
  translated: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="event"
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
      {text}
      {translated && <span className="event__ru">{ru}</span>}
    </div>
  )
}
