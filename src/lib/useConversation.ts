import { useCallback, useEffect, useReducer, useRef } from 'react'
import type { GlossaryId, Meters, ResponseChoice, Scenario } from '../types'
import { applyEffects, resolveOutcome, startingMeters, weight } from './meters'
import { phraseIds, typingDuration } from './message'

export type ChatItem = {
  key: string
  from: 'them' | 'me'
  text: string
  /** Full Russian translation, shown when the bubble is tapped. */
  ru: string
}

type State = {
  nodeId: string
  items: ChatItem[]
  /** Messages of the current node already shown. */
  delivered: number
  typing: boolean
  /** Glossary ids that have appeared in incoming messages so far. */
  seen: GlossaryId[]
  /** Hidden state of the other person. Never rendered as numbers. */
  meters: Meters
  /** The choice that moved the meters most — the line the outcome quotes. */
  tipping: { text: string; weight: number } | null
  /** Everything that happened, for endings that depend on deeds not moods. */
  flags: string[]
}

type Action =
  | { type: 'typing' }
  | { type: 'deliver'; text: string; ru: string; flag?: string }
  | {
      type: 'choose'
      text: string
      ru: string
      effects?: Partial<Meters>
      flag?: string
      next: string | null
    }
  | { type: 'restart'; startNodeId: string; meters: Meters }

let seq = 0
const key = () => `m${++seq}`

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'typing':
      return { ...state, typing: true }
    case 'deliver':
      return {
        ...state,
        typing: false,
        delivered: state.delivered + 1,
        items: [...state.items, { key: key(), from: 'them', text: action.text, ru: action.ru }],
        seen: [...new Set([...state.seen, ...phraseIds(action.text)])],
        flags: action.flag ? [...new Set([...state.flags, action.flag])] : state.flags,
      }
    case 'choose': {
      const moved = weight(action.effects)
      return {
        ...state,
        items: [...state.items, { key: key(), from: 'me', text: action.text, ru: action.ru }],
        nodeId: action.next ?? state.nodeId,
        delivered: action.next ? 0 : state.delivered,
        meters: applyEffects(state.meters, action.effects),
        // Ties go to the later line: the last straw, not the first.
        tipping:
          moved > 0 && moved >= (state.tipping?.weight ?? 1)
            ? { text: action.text, weight: moved }
            : state.tipping,
        flags: action.flag ? [...new Set([...state.flags, action.flag])] : state.flags,
      }
    }
    case 'restart':
      return {
        nodeId: action.startNodeId,
        items: [],
        delivered: 0,
        typing: false,
        seen: [],
        meters: action.meters,
        tipping: null,
        flags: [],
      }
  }
}

/** Stable identity, so consumers can use `choices` as an effect dependency. */
const NO_RESPONSES: ResponseChoice[] = []

/** Pause between the user tapping and the reply starting to "type". */
const REPLY_GAP = () => 380 + Math.round(Math.random() * 260)
/** Pause between two consecutive bubbles from the same person. */
const BUBBLE_GAP = 240

export function useConversation(scenario: Scenario) {
  const [state, dispatch] = useReducer(reducer, {
    nodeId: scenario.startNodeId,
    items: [],
    delivered: 0,
    typing: false,
    seen: [],
    meters: startingMeters(scenario),
    tipping: null,
    flags: [],
  })

  const node = scenario.nodes[state.nodeId]
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  // Deliver the current node's messages one at a time, with a typing state
  // in between. Re-runs whenever a message lands or the node changes.
  useEffect(() => {
    if (!node || state.delivered >= node.messages.length) return
    const message = node.messages[state.delivered]
    const isFirst = state.delivered === 0
    const gap = message.delay ?? (isFirst ? REPLY_GAP() : BUBBLE_GAP)

    const t1 = window.setTimeout(() => dispatch({ type: 'typing' }), gap)
    const t2 = window.setTimeout(
      () =>
        dispatch({
          type: 'deliver',
          text: message.text,
          ru: message.ru,
          // The node's own flag is raised as its first line lands.
          flag: isFirst ? node.flag : undefined,
        }),
      gap + typingDuration(message.text),
    )
    timers.current.push(t1, t2)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [node, state.delivered])

  useEffect(() => clearTimers, [clearTimers])

  /** The current node's choices. Known before they become tappable, so the UI
   * can reserve their space while the reply is still being "typed". */
  const choices = node?.responses ?? NO_RESPONSES
  const ready = !!node && state.delivered >= node.messages.length && !state.typing
  const finished = ready && choices.length === 0

  const choose = useCallback(
    (choiceId: string) => {
      if (!ready) return
      const choice = node?.responses.find((r) => r.id === choiceId)
      if (!choice) return
      dispatch({
        type: 'choose',
        text: choice.text,
        ru: choice.ru,
        effects: choice.effects,
        flag: choice.flag,
        next: choice.next,
      })
    },
    [ready, node],
  )

  const restart = useCallback(() => {
    clearTimers()
    dispatch({ type: 'restart', startNodeId: scenario.startNodeId, meters: startingMeters(scenario) })
  }, [clearTimers, scenario])

  return {
    items: state.items,
    typing: state.typing,
    choices,
    ready,
    finished,
    seen: state.seen,
    /** Resolved only at the end — nothing about it is visible before that. */
    outcome: finished ? resolveOutcome(scenario, state.meters, state.flags) : null,
    tippingLine: state.tipping?.text ?? null,
    choose,
    restart,
  }
}
