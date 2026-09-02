import { scenarios } from '../data/scenarios'
import { getFinished } from '../lib/progress'
import type { Scenario } from '../types'

export function Home({ onOpen }: { onOpen: (scenario: Scenario) => void }) {
  const finished = new Set(getFinished())

  return (
    <div className="app__scroll home screen">
      <div className="home__head">
        <h1 className="home__title">Nebenbei</h1>
        <p className="home__subtitle">Deutsch, ohne Deutsch zu lernen.</p>
      </div>

      <div className="home__label">Unterhaltungen</div>
      <div className="list">
        {scenarios.map((scenario) => (
          <button key={scenario.id} type="button" className="row" onClick={() => onOpen(scenario)}>
            <div className="avatar" style={{ ['--hue' as string]: scenario.hue }}>
              {scenario.character.avatar}
            </div>
            <div className="row__body">
              <div className="row__top">
                <h2 className="row__title">{scenario.title}</h2>
                <span className="row__meta">
                  {finished.has(scenario.id) && <span className="done">✓ </span>}
                  {scenario.duration} · {scenario.level}
                </span>
              </div>
              <p className="row__context">{scenario.context}</p>
              {/* The goals, as emoji: sets the expectation that this is
                  replayable without printing a number at anyone. */}
              {scenario.objectives && (
                <p className="row__goals" aria-label={`${scenario.objectives.length} Ziele`}>
                  {scenario.objectives.map((objective) => (
                    <span key={objective.id}>{objective.emoji}</span>
                  ))}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <p className="home__foot">
        Jedes Gespräch hat mehrere Ziele — und mehrere Enden. Tippe auf eine Nachricht für die ganze
        Übersetzung, auf unterstrichene Stellen für einzelne Wendungen.
      </p>
    </div>
  )
}
