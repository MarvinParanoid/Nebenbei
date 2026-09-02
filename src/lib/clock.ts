/**
 * A plausible clock for the chat. Messengers show times, and their absence is
 * one of the things that made the thread feel like an exercise rather than a
 * conversation. Three bubbles to the minute reads naturally without ever
 * mattering.
 */
export function clockAt(start: string, index: number): string {
  const [hours, minutes] = start.split(':').map(Number)
  const total = hours * 60 + minutes + Math.floor(index / 3)
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}
