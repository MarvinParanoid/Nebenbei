import { useCallback, useEffect, useReducer, useRef } from 'react'
import type { GlossaryId, ResponseChoice, Scenario } from '../types'
import { phraseIds, typingDuration } from './message'

export type ChatItem =
  | { key: string; from: 'them'; text: string }
  | { key: string; from: 'me'; text: string }

type State = {
  nodeId: string
  items: ChatItem[]
  /** Messages of the current node already shown. */
  delivered: number
  typing: boolean
  /** Glossary ids that have appeared in incoming messages so far. */
  seen: GlossaryId[]
}

type Action =
  | { type: 'typing' }
  | { type: 'deliver'; text: string }
  | { type: 'choose'; text: string; next: string | null }
  | { type: 'restart'; startNodeId: string }

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
        items: [...state.items, { key: key(), from: 'them', text: action.text }],
        seen: [...new Set([...state.seen, ...phraseIds(action.text)])],
      }
    case 'choose':
      return {
        ...state,
        items: [...state.items, { key: key(), from: 'me', text: action.text }],
        nodeId: action.next ?? state.nodeId,
        delivered: action.next ? 0 : state.delivered,
      }
    case 'restart':
      return { nodeId: action.startNodeId, items: [], delivered: 0, typing: false, seen: [] }
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
      () => dispatch({ type: 'deliver', text: message.text }),
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
      dispatch({ type: 'choose', text: choice.text, next: choice.next })
    },
    [ready, node],
  )

  const restart = useCallback(() => {
    clearTimers()
    dispatch({ type: 'restart', startNodeId: scenario.startNodeId })
  }, [clearTimers, scenario.startNodeId])

  return {
    items: state.items,
    typing: state.typing,
    choices,
    ready,
    finished,
    seen: state.seen,
    choose,
    restart,
  }
}
