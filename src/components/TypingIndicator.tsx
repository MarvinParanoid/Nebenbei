export function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="typing" aria-label={`${name} schreibt …`}>
      <i />
      <i />
      <i />
    </div>
  )
}
