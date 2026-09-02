import type { ReactNode } from 'react'
import { useDragToClose } from '../lib/useDragToClose'
import { useEscape } from '../lib/useEscape'

type Props = {
  label: string
  onClose: () => void
  children: ReactNode
}

/** Scrim, slide-up, Escape and drag-to-dismiss — shared by both sheets. */
export function SheetShell({ label, onClose, children }: Props) {
  useEscape(onClose)
  const { handleProps, style } = useDragToClose(onClose)

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label={label} style={style}>
        <div className="sheet__handle" {...handleProps}>
          <div className="sheet__grip" />
        </div>
        {children}
      </div>
    </>
  )
}
