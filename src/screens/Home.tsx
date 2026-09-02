import { scenarios } from '../data/scenarios'
import { Avatar } from '../components/Avatar'
import { getFinished } from '../lib/progress'
import type { Scenario } from '../types'

export function Home({ onOpen }: { onOpen: (scenario: Scenario) => void }) {
  // The tagline explains the app to someone who has never opened it. After the
  // first conversation it is just furniture, so it goes away.
  const newcomer = getFinished().length === 0

  return (
    <div className="app__scroll home screen">
      <div className={newcomer ? 'home__head' : 'home__head home__head--compact'}>
        <h1 className="home__title">Nebenbei</h1>
        {newcomer && <p className="home__subtitle">Deutsch, ohne Deutsch zu lernen.</p>}
      </div>

      <div className="list">
        {scenarios.map((scenario) => (
          <button key={scenario.id} type="button" className="row" onClick={() => onOpen(scenario)}>
            <Avatar name={scenario.character.name} />
            <div className="row__body">
              <div className="row__who">{scenario.character.name}</div>
              <h2 className="row__title">{scenario.title}</h2>
              <p className="row__context">{scenario.context}</p>
              <p className="row__meta">{meta(scenario)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * "3 min · 4 Ziele · 6 Enden" — how long it takes comes first, because that is
 * what you decide on. How many endings you have found belongs on the scenario
 * screen, not here. The level stays in the data for picking content later; on
 * the card it only ever made this look like a course catalogue.
 */
function meta(scenario: Scenario): string {
  const parts = [scenario.duration]
  if (scenario.objectives?.length) parts.push(`${scenario.objectives.length} Ziele`)
  const endings = scenario.outcomes?.length ?? 0
  if (endings) parts.push(`${endings} Enden`)
  return parts.join(' · ')
}
