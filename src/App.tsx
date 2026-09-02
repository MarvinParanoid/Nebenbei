import { useEffect, useState } from 'react'
import { scenarioById } from './data/scenarios'
import { Chat } from './screens/Chat'
import { Home } from './screens/Home'
import type { Scenario } from './types'

/** Hash routing, so the browser back button behaves like a native back. */
function currentScenarioId(): string | undefined {
  const match = window.location.hash.match(/^#\/chat\/([\w-]+)$/)
  return match?.[1]
}

export default function App() {
  const [scenarioId, setScenarioId] = useState<string | undefined>(currentScenarioId)

  useEffect(() => {
    const onHash = () => setScenarioId(currentScenarioId())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const scenario = scenarioById(scenarioId)

  const open = (next: Scenario) => {
    window.location.hash = `#/chat/${next.id}`
  }
  const home = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.hash = ''
  }

  return (
    <div className="app">
      {scenario ? (
        // Remount on scenario change so each chat starts from a clean state.
        <Chat key={scenario.id} scenario={scenario} onHome={home} />
      ) : (
        <Home onOpen={open} />
      )}
    </div>
  )
}
