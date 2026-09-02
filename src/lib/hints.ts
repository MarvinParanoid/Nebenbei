/**
 * One-time nudges. The only one so far: that a text can be tapped for its
 * translation. It disappears the first time the user does it, and never comes
 * back — an app that keeps explaining itself is an app nobody read.
 */
const KEY = 'nebenbei.hints.v1'

export function hintDone(id: string): boolean {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]).includes(id)
  } catch {
    return false
  }
}

export function markHint(id: string): void {
  try {
    const all = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[])
    all.add(id)
    localStorage.setItem(KEY, JSON.stringify([...all]))
  } catch {
    // ignore
  }
}
