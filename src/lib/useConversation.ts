import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import type { Card, GlossaryId, Meters, MessageBlock, ResponseChoice, Scenario } from '../types'
import { applyEffects, matches, resolveOutcome, startingMeters, weight } from './meters'
import { isText, phraseIds, typingDuration } from './message'
import { getMemories, recalls } from './cast'
import { recordSeen } from './vocab'

export type ChatItem = {
  key: string
  from: 'them' | 'me'
  kind: 'text' | 'system' | 'card' | 'reaction' | 'action'
  text: string
  /** Full Russian translation, shown when the bubble is tapped. */
  ru: string
  card?: Card
  emoji?: string
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
  tipping: { text: string; ru: string; weight: number } | null
  /** Everything that happened, for endings that depend on deeds not moods. */
  flags: string[]
}

type Action =
  | { type: 'typing' }
  | { type: 'deliver'; block: MessageBlock; flag?: string }
  | {
      type: 'choose'
      text: string
      ru: string
      effects?: Partial<Meters>
      flag?: string
      /** Set when the choice was a deed rather than a sentence. */
      done?: { done: string; doneRu: string }
      next: string | null
    }
  | { type: 'restart'; startNodeId: string; meters: Meters }

let seq = 0
const key = () => `m${++seq}`

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'typing':
      return { ...state, typing: true }
    case 'deliver': {
      const block = action.block
      const item: ChatItem =
        'kind' in block && block.kind === 'card'
          ? { key: key(), from: 'them', kind: 'card', text: '', ru: block.ru, card: block.card }
          : 'kind' in block && block.kind === 'reaction'
            ? { key: key(), from: 'them', kind: 'reaction', text: '', ru: '', emoji: block.emoji }
            : {
                key: key(),
                from: 'them',
                kind: 'kind' in block && block.kind === 'system' ? 'system' : 'text',
                text: block.text,
                ru: block.ru,
              }
      return {
        ...state,
        typing: false,
        delivered: state.delivered + 1,
        items: [...state.items, item],
        seen: isText(block)
          ? [...new Set([...state.seen, ...phraseIds(block.text)])]
          : state.seen,
        flags: action.flag ? [...new Set([...state.flags, action.flag])] : state.flags,
      }
    }
    case 'choose': {
      const moved = weight(action.effects)
      return {
        ...state,
        items: [
          ...state.items,
          action.done
            ? { key: key(), from: 'me', kind: 'action', text: action.done.done, ru: action.done.doneRu }
            : { key: key(), from: 'me', kind: 'text', text: action.text, ru: action.ru },
        ],
        nodeId: action.next ?? state.nodeId,
        delivered: action.next ? 0 : state.delivered,
        meters: applyEffects(state.meters, action.effects),
        // Ties go to the later line: the last straw, not the first.
        tipping:
          moved > 0 && moved >= (state.tipping?.weight ?? 1)
            ? { text: action.text, ru: action.ru, weight: moved }
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
  /**
   * What earlier conversations left behind. Read once: nothing this session
   * writes can change what the other person already remembers, and re-reading
   * localStorage on every delivery tick would be silly.
   */
  const memories = useMemo(() => getMemories(), [])
  /**
   * The lines this node actually says this time round. Meters only move when
   * a choice is made, so this stays stable while a turn is being delivered.
   */
  const lines =
    node?.messages.filter(
      (message) => matches(message.when, state.meters) && recalls(message, memories),
    ) ?? []
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  // Deliver the current node's messages one at a time, with a typing state
  // in between. Re-runs whenever a message lands or the node changes.
  useEffect(() => {
    if (!node) return
    // Re-filtered here rather than closing over `lines`, so the effect depends
    // on exactly what it reads: the node, the meters and how far we got.
    const current = node.messages.filter(
      (message) => matches(message.when, state.meters) && recalls(message, memories),
    )
    if (state.delivered >= current.length) return
    const block = current[state.delivered]
    const isFirst = state.delivered === 0
    const gap = (isText(block) ? block.delay : undefined) ?? (isFirst ? REPLY_GAP() : BUBBLE_GAP)
    // A card or a reaction isn't typed, it is just dropped into the chat.
    const compose = isText(block) ? typingDuration(block.text) : 420

    const t1 = window.setTimeout(() => dispatch({ type: 'typing' }), gap)
    const t2 = window.setTimeout(() => {
      if (isText(block)) recordSeen(phraseIds(block.text))
      dispatch({
        type: 'deliver',
        block,
        // The node's own flag is raised as its first line lands.
        flag: isFirst ? node.flag : undefined,
      })
    }, gap + compose)
    timers.current.push(t1, t2)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [node, state.delivered, state.meters, memories])

  useEffect(() => clearTimers, [clearTimers])

  /** The current node's choices. Known before they become tappable, so the UI
   * can reserve their space while the reply is still being "typed". */
  const choices = useMemo(
    () => node?.responses.filter((response) => recalls(response, memories)) ?? NO_RESPONSES,
    [node, memories],
  )
  const ready = !!node && state.delivered >= lines.length && !state.typing
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
        done: choice.action,
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
    /** Shown only on the outcome card: during the conversation they stay hidden. */
    meters: state.meters,
    tipping: state.tipping,
    choose,
    restart,
  }
}
