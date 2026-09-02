/**
 * A monogram, not an emoji: the interface itself stays quiet, and emoji are
 * left to the people inside the conversation.
 */
export function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <div className={small ? 'avatar avatar--small' : 'avatar'} aria-hidden="true">
      {name.slice(0, 1)}
    </div>
  )
}
