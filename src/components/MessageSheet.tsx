import { plainText } from '../lib/message'
import { useEscape } from '../lib/useEscape'

type Props = {
  text: string
  ru: string
  onClose: () => void
}

/**
 * Full translation of one message — the other person's or the user's own.
 * Deliberately just two lines: the sentence and what it means. Individual
 * chunks keep their own sheet.
 */
export function MessageSheet({ text, ru, onClose }: Props) {
  useEscape(onClose)

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label="Übersetzung">
        <div className="sheet__grip" />
        <p className="sheet__german">{plainText(text)}</p>
        <p className="sheet__translation">{ru}</p>
      </div>
    </>
  )
}
