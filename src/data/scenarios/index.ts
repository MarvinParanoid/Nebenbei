import type { Scenario } from '../../types'
import { cafeOrder } from './cafe-order'
import { coworkerFavor } from './coworker-favor'
import { lisaDrinks } from './lisa-drinks'
import { partySmalltalk } from './party-smalltalk'
import { weekendPlans } from './weekend-plans'

/** Order on the home screen: shortest and easiest first. */
export const scenarios: Scenario[] = [
  lisaDrinks,
  cafeOrder,
  coworkerFavor,
  weekendPlans,
  partySmalltalk,
]

export const scenarioById = (id: string | undefined): Scenario | undefined =>
  scenarios.find((s) => s.id === id)
