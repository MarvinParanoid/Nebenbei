import { useEffect, useState } from 'react'
import { scenarioById } from './data/scenarios'
import { objectiveById } from './lib/meters'
import { Chat } from './screens/Chat'
import { Home } from './screens/Home'
import { FREE, Objectives } from './screens/Objectives'
import type { Scenario } from './types'

/**
 * Hash routing, so the browser back button behaves like a native back:
 *   #/s/<scenario>              → pick an objective
 *   #/s/<scenario>/<objective>  → the conversation itself
 */
type Route = { scenarioId?: string; objectiveId?: string }

function currentRoute(): Route {
  const match = window.location.hash.match(/^#\/s\/([\w-]+)(?:\/([\w-]+))?$/)
  return { scenarioId: match?.[1], objectiveId: match?.[2] }
}

export default function App() {
  const [route, setRoute] = useState<Route>(currentRoute)

  useEffect(() => {
    const onHash = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const scenario = scenarioById(route.scenarioId)
  const goals = scenario?.objectives

  const open = (next: Scenario) => {
    window.location.hash = `#/s/${next.id}`
  }
  const start = (objectiveId: string) => {
    if (scenario) window.location.hash = `#/s/${scenario.id}/${objectiveId}`
  }
  const toGoals = () => {
    if (scenario) window.location.hash = `#/s/${scenario.id}`
  }
  const home = () => {
    window.location.hash = ''
  }

  if (!scenario) {
    return (
      <div className="app">
        <Home onOpen={open} />
      </div>
    )
  }

  // A scenario with objectives always asks first; one without goes straight in.
  if (goals && !route.objectiveId) {
    return (
      <div className="app">
        <Objectives key={scenario.id} scenario={scenario} onStart={start} onHome={home} />
      </div>
    )
  }

  const objective =
    route.objectiveId && route.objectiveId !== FREE
      ? (objectiveById(scenario, route.objectiveId) ?? null)
      : null

  return (
    <div className="app">
      {/* Remount per objective, so picking a new goal starts a clean chat. */}
      <Chat
        key={`${scenario.id}/${route.objectiveId ?? 'plain'}`}
        scenario={scenario}
        objective={objective}
        onHome={home}
        onGoals={goals ? toGoals : home}
        onStart={start}
      />
    </div>
  )
}
