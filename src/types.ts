/**
 * Core data model for Nebenbei.
 *
 * A scenario is a small conversation tree. Nodes hold what the fictional
 * person says; responses are the intentions the user can pick from. Nothing
 * here encodes "right" or "wrong" — every response is a valid thing to say.
 */

export type NodeId = string

/** A vocabulary chunk the user can tap in an incoming message. */
export type GlossaryEntry = {
  /** Canonical form shown as the sheet's headline, e.g. "kommt drauf an". */
  phrase: string
  /** Russian translation / gloss. */
  translation: string
  /** A short natural German example using the chunk. */
  example: string
  /** Translation of the example. */
  exampleTranslation: string
}

export type GlossaryId = string

/**
 * One incoming chat bubble.
 *
 * `text` may contain inline phrase annotations in the form
 * `[surface form](glossary-id)`, e.g.
 *   "Wir treffen uns [so gegen 8](so-gegen-acht)."
 * See `parseMessage` in lib/message.ts.
 */
export type IncomingMessage = {
  text: string
  /**
   * Full Russian translation of the message. Required on purpose: "sometimes
   * there is no translation" is a worse experience than a slightly bigger
   * bundle, so the type system keeps the coverage complete.
   */
  ru: string
  /** Extra pause before this bubble, in ms. Defaults to a length-based guess. */
  delay?: number
  /** Reserved: later the user will be able to listen before revealing text. */
  audioUrl?: string
}

/**
 * Hidden state of the person you are talking to. Never shown as numbers during
 * the conversation — the moment the user can see a meter they optimise the
 * meter instead of reading the German.
 *
 * Meters react to *intent only*. There is deliberately no effect for "said it
 * correctly": you are judged on the social outcome, never on your German.
 */
export type MeterName =
  /** How angry the other person is. */
  | 'anger'
  /** How much they respect you. */
  | 'respect'
  /** How much slack they have left. */
  | 'patience'
  /** How much of the blame you took on yourself. */
  | 'guilt'
export type Meters = Record<MeterName, number>

export type ObjectiveId = string

/** What the user is trying to achieve. Picked before the conversation starts. */
export type Objective = {
  id: ObjectiveId
  emoji: string
  /** German label — the card's title. */
  title: string
  /** Russian gloss: you have to understand what you are signing up for. */
  ru: string
}

/** `['>=', 70]` — one condition on one meter. */
export type Comparison = ['>=' | '<=' | '>' | '<', number]

export type Outcome = {
  id: string
  /**
   * All conditions must hold. Outcomes are checked in order and the first
   * match wins, so the list runs from most specific to the fallback (which
   * has no conditions at all). A list of comparisons on one meter gives a
   * range — which is how an ending can ask for "some guilt, but not a lot".
   */
  requires?: Partial<Record<MeterName, Comparison | Comparison[]>>
  /** Objectives this ending counts as reached. Empty for a pure surprise. */
  achieved: ObjectiveId[]
  /** Short German verdict, e.g. "Jonas ist komplett sauer auf dich." */
  title: string
  titleRu: string
  /** A sentence or two. `{quote}` is replaced by the line that tipped it. */
  text: string
  textRu: string
  /** All of these must have been set during the conversation. */
  requiresFlags?: string[]
  /** None of these may have been set. */
  forbidsFlags?: string[]
  /** Not listed as an objective — found by playing, not by choosing. */
  secret?: boolean
}

export type ResponseChoice = {
  id: string
  text: string
  /** Full Russian translation — the user wants to know what they are saying. */
  ru: string
  /** Hidden nudges to the other person's state. */
  effects?: Partial<Meters>
  /**
   * Records that this was said. Some endings depend on what you did rather
   * than on how the other person feels — insisting on the wrong sandwich is
   * not an emotion, it is a decision.
   */
  flag?: string
  /** Node to continue with. `null` ends the conversation. */
  next: NodeId | null
}

export type ConversationNode = {
  id: NodeId
  /** Set when this point in the story is reached. */
  flag?: string
  /** 1–3 bubbles, delivered one after another like a real chat. */
  messages: IncomingMessage[]
  /** Empty means: the conversation is over. */
  responses: ResponseChoice[]
  /**
   * Reserved: later a node may also accept typed or spoken answers.
   * Absent means "choice", the only mode implemented today.
   */
  input?: 'choice' | 'text' | 'voice'
}

export type Character = {
  name: string
  /** Emoji stand-in for an avatar. */
  avatar: string
  /** Small line under the name in the chat header, e.g. "Freitagabend". */
  status?: string
}

export type Level = 'A2' | 'B1' | 'B2'

export type Scenario = {
  id: string
  title: string
  /** One short line of setup on the home screen. */
  context: string
  /** Two or three lines of setup for the objective screen. Falls back to `context`. */
  situation?: string
  /** Even shorter line for the chat header, e.g. "Freitagabend · Freunde". */
  contextLine: string
  duration: string
  level: Level
  /** Wall clock the first message arrives at, e.g. "18:12". */
  startTime?: string
  character: Character
  /** Accent hue (CSS hue angle) used for the avatar tint. */
  hue: number
  startNodeId: NodeId
  nodes: Record<NodeId, ConversationNode>
  /**
   * Absent → the conversation starts immediately and ends with a plain
   * sign-off, the way the first scenarios did. Present → the user picks an
   * objective first and gets an outcome at the end, and the same graph becomes
   * worth replaying.
   */
  objectives?: Objective[]
  /** Starting values for the hidden meters. Clamped to 0–100 as they move. */
  meters?: Meters
  /** Required together with `objectives`. Checked in order. */
  outcomes?: Outcome[]
}
