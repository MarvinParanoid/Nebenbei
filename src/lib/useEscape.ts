import { useEffect } from 'react'

/** Closes a sheet on Escape. Both sheets need it, neither should own it. */
export function useEscape(onEscape: () => void): void {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onEscape])
}
