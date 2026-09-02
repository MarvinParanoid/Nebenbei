import { getEndings } from '../lib/endings'
import type { Scenario } from '../types'

type Props = {
  scenario: Scenario
  onStart: (objectiveId: string) => void
  onHome: () => void
}

/** The `free` objective: same conversation, no goal, no verdict. */
export const FREE = 'free'

/**
 * Between the home screen and the conversation: what are you trying to
 * achieve? The graph doesn't change — only what counts as a good ending —
 * which is what makes the same chat worth replaying.
 */
export function Objectives({ scenario, onStart, onHome }: Props) {
  const found = new Set(getEndings(scenario.id))
  const reached = (objectiveId: string) =>
    scenario.outcomes?.some((o) => o.achieved.includes(objectiveId) && found.has(o.id)) ?? false
  const secrets = scenario.outcomes?.filter((o) => o.secret) ?? []
  const secretFound = secrets.some((o) => found.has(o.id))

  return (
    <div className="goals screen">
      <header className="chat__header">
        <button type="button" className="back" onClick={onHome} aria-label="Zurück">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="avatar chat__avatar" style={{ ['--hue' as string]: scenario.hue }}>
          {scenario.character.avatar}
        </div>
        <div className="chat__who">
          <div className="chat__name">{scenario.character.name}</div>
          <div className="chat__context">{scenario.contextLine}</div>
        </div>
      </header>

      <div className="goals__body">
        <p className="goals__situation">{scenario.situation ?? scenario.context}</p>
        <h1 className="goals__title">Was willst du erreichen?</h1>

        <div className="goals__list">
          {scenario.objectives?.map((objective) => (
            <button
              key={objective.id}
              type="button"
              className="goal"
              onClick={() => onStart(objective.id)}
            >
              <span className="goal__emoji" aria-hidden="true">
                {objective.emoji}
              </span>
              <span className="goal__body">
                <span className="goal__label">
                  {objective.title}
                  {reached(objective.id) && <span className="goal__done"> ✓</span>}
                </span>
                <span className="goal__ru">{objective.ru}</span>
              </span>
            </button>
          ))}

          <button type="button" className="goal goal--free" onClick={() => onStart(FREE)}>
            <span className="goal__emoji" aria-hidden="true">
              🎲
            </span>
            <span className="goal__body">
              <span className="goal__label">Egal, einfach reden</span>
              <span className="goal__ru">Без цели — просто поговорить</span>
            </span>
          </button>
        </div>

        {secrets.length > 0 && (
          <p className="goals__secret">
            {secretFound
              ? 'Ein geheimes Ende hast du schon gefunden ✓'
              : 'Irgendwo hier ist noch ein Ende versteckt.'}
          </p>
        )}
      </div>
    </div>
  )
}
