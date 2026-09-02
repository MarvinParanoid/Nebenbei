import { useRef, useState } from 'react'

/**
 * Drag a sheet down to dismiss it. Only the handle starts a drag, so taps on
 * the content — an expression row, for instance — are never swallowed.
 */
export function useDragToClose(onClose: () => void, threshold = 90) {
  const [offset, setOffset] = useState(0)
  const startY = useRef<number | null>(null)

  const onPointerDown = (event: React.PointerEvent) => {
    startY.current = event.clientY
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent) => {
    if (startY.current === null) return
    // Downwards only: dragging up shouldn't stretch the sheet.
    setOffset(Math.max(0, event.clientY - startY.current))
  }

  const onPointerUp = () => {
    if (startY.current === null) return
    startY.current = null
    const travelled = offset
    setOffset(0)
    if (travelled > threshold) onClose()
  }

  return {
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
    style: offset > 0 ? { transform: `translateY(${offset}px)`, animation: 'none' } : undefined,
  }
}
