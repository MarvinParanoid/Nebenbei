import type { Scenario } from '../../types'
import { buergeramtTermin } from './buergeramt-termin'
import { cafeFalscheBestellung } from './cafe-falsche-bestellung'
import { cafeOrder } from './cafe-order'
import { coworkerFavor } from './coworker-favor'
import { jobcenterUnterlagen } from './jobcenter-unterlagen'
import { lisaDrinks } from './lisa-drinks'
import { muellNachbar } from './muell-nachbar'
import { nachbarLaerm } from './nachbar-laerm'
import { partySmalltalk } from './party-smalltalk'
import { weekendPlans } from './weekend-plans'
import { wgSpuelmaschine } from './wg-spuelmaschine'

/** Shown on the home screen: the conversations that have objectives. */
export const scenarios: Scenario[] = [wgSpuelmaschine, cafeFalscheBestellung]

/**
 * Written and fully translated, but still without objectives and outcomes, so
 * they stay out of the app until they get them. Kept here (and validated in
 * dev) rather than deleted — the content is good, it just isn't a game yet.
 */
export const drafts: Scenario[] = [
  lisaDrinks,
  muellNachbar,
  nachbarLaerm,
  jobcenterUnterlagen,
  buergeramtTermin,
  cafeOrder,
  coworkerFavor,
  weekendPlans,
  partySmalltalk,
]

export const scenarioById = (id: string | undefined): Scenario | undefined =>
  scenarios.find((s) => s.id === id)
