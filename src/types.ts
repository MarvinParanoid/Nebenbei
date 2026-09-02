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
 * A document shared into the chat: a bill, a departure board, an ad. Pure
 * typography, no assets — and often the language task itself rather than
 * decoration.
 */
export type Card = {
  /** Small label above the rows, e.g. "Rechnung". */
  label: string
  /** The body: a left column, and an optional right one for prices or times. */
  rows: { left: string; right?: string }[]
  /** Emphasised final row — a total, a delay, a price. */
  total?: { left: string; right: string }
}

/**
 * What a node can put into the conversation.
 *
 * A chat is not only sentences, and a scenario built purely from them reads as
 * a wall of text. The union is meant to grow: photos, voice messages, a
 * location and a listing card are the next ones, and each new kind needs a
 * renderer before it can be written into content — an unrendered kind would
 * silently vanish from the thread.
 */
export type MessageBlock = IncomingMessage | SystemBlock | CardBlock | ReactionBlock

/**
 * Something a past conversation left behind, read by the lines and choices of
 * later scenarios and **never shown to the user** — the only way anyone finds
 * out is that the next conversation sounds different.
 *
 * **Nebenbei remembers experiences, not endings.** Replaying is part of the
 * loop: the same person can end up with all six endings of one conversation,
 * so an ending cannot be what the world is built on — Jonas would believe
 * there is a cleaning plan *and* that you slammed the door. Two things are
 * therefore remembered, and nothing else:
 *
 * - a `Scenario.experience` — that this conversation happened at all. True
 *   after any ending, and still true after five more.
 * - an `Outcome.reveals` — something you *found out*, or something that left
 *   the world different. Knowledge does not un-happen on a replay: once Elif
 *   has told you her account is empty, you know it, whatever the sixth run
 *   ends like. This is the only kind of fact allowed to survive an ending.
 *
 * What is never remembered: how it ended, how they feel about you, who
 * apologised. Those belong to the run they happened in — that is what
 * `1 / 6 Enden` is for.
 *
 * Deliberately a flat set of facts rather than a second layer of hidden
 * numbers: a relationship score across scenarios cannot be authored or
 * validated, while "this happened" can.
 */
export type MemoryId = string

/**
 * Whether a line or a choice exists at all this time round.
 *
 * `when` reacts to the conversation you are in (the meters), `after` and
 * `unless` react to the ones you already had. Both are invisible: the user
 * sees a person who remembers, not a condition that was met.
 */
export type Availability = {
  /**
   * Deliver this only while the conditions hold.
   *
   * This is how the same node sounds different depending on how the
   * conversation has gone: two mutually exclusive variants of one line, or an
   * extra bubble that only appears once someone is annoyed. Every node must
   * keep at least one unconditional message, so a turn can never come out
   * empty — the validator enforces that.
   */
  when?: Conditions
  /** Only if every one of these is remembered. */
  after?: MemoryId[]
  /** Never if any of these is remembered. */
  unless?: MemoryId[]
}

/** A line from the situation rather than from a person. */
export type SystemBlock = {
  kind: 'system'
  /** "Jonas hat eine Nachricht gelöscht." */
  text: string
  ru: string
} & Availability

/**
 * The other person reacts to your last message instead of answering it. Far
 * more expressive than another bubble — and an emoji here is a person using a
 * messenger, not the interface speaking.
 */
export type ReactionBlock = {
  kind: 'reaction'
  emoji: string
} & Availability

export type CardBlock = {
  kind: 'card'
  card: Card
  /** One line of Russian saying what the card is. */
  ru: string
} & Availability

/**
 * One incoming chat bubble.
 *
 * `text` may contain inline phrase annotations in the form
 * `[surface form](glossary-id)`, e.g.
 *   "Wir treffen uns [so gegen 8](so-gegen-acht)."
 * See `parseMessage` in lib/message.ts.
 */
export type IncomingMessage = {
  kind?: 'text'
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
} & Availability

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

/**
 * What the user is trying to achieve. Picked before the conversation starts.
 *
 * No emoji: the app's own interface never speaks in emoji — only the people
 * inside the conversation do. The personality lives in the wording.
 */
export type Objective = {
  id: ObjectiveId
  /** German label — the card's title. */
  title: string
  /** One German line of flavour under it. */
  hint: string
  /** Russian gloss, shown only when the user asks for it. */
  ru: string
  /**
   * How the replay is offered after another goal was played: the tail of
   * "Nochmal — …". A line in the product's voice, not the name of a function.
   */
  cta: string
  /**
   * The goal to offer after this one — deliberately the opposite intention, so
   * the replay is a different conversation rather than a retry.
   */
  contrast?: ObjectiveId
}

/** `['>=', 70]` — one condition on one meter. */
export type Comparison = ['>=' | '<=' | '>' | '<', number]

/**
 * Conditions on the hidden meters. A list of comparisons on one meter gives a
 * range. Used both for choosing an ending and for choosing which version of a
 * line the other person says.
 */
export type Conditions = Partial<Record<MeterName, Comparison | Comparison[]>>

export type Outcome = {
  id: string
  /**
   * All conditions must hold. Outcomes are checked in order and the first
   * match wins, so the list runs from most specific to the fallback (which
   * has no conditions at all).
   */
  requires?: Conditions
  /** Objectives this ending counts as reached. Empty for a pure surprise. */
  achieved: ObjectiveId[]
  /**
   * The ending's name, e.g. "Der Putzplan" or "Die zugeschlagene Tür".
   *
   * A goal is what you wanted; an ending is what happened. Naming endings is
   * what turns "1 / 6 Enden entdeckt" into something worth collecting.
   */
  name: string
  nameRu: string
  /** One sentence of what that ending actually is. */
  title: string
  titleRu: string
  /**
   * What it actually cost or bought you: two or three flat facts. These are
   * the payoff of the whole conversation, so they read as consequences rather
   * than as a paragraph of prose.
   */
  consequences: { de: string; ru: string }[]
  /**
   * Heading over the quoted line, e.g. "Hier ist es eskaliert". The moment
   * reads differently depending on how it ended.
   */
  quoteLabel?: string
  /** All of these must have been set during the conversation. */
  requiresFlags?: string[]
  /** None of these may have been set. */
  forbidsFlags?: string[]
  /** Not listed as an objective — found by playing, not by choosing. */
  secret?: boolean
  /**
   * What you now know, or what is now different in the world — and nothing
   * else. `elif-geldsorgen` (she told you why), `lea-kennengelernt` (you have
   * met her). Never `putzplan-haengt` or `jonas-ist-sauer`: a later replay can
   * reach a different ending, and two contradictory facts would both be true.
   *
   * The test for whether something belongs here: would it still be true after
   * five more runs of this conversation? If not, it is not a revelation, it is
   * an ending.
   */
  reveals?: MemoryId[]
}

export type ResponseChoice = {
  id: string
  text: string
  /** Full Russian translation — the user wants to know what they are saying. */
  ru: string
  /** Hidden nudges to the other person's state. */
  effects?: Partial<Meters>
  /**
   * Renders as a deed instead of a sentence — `[Standort senden]`,
   * `[Nicht antworten]`. `text` is the button label; this is what the thread
   * shows afterwards.
   */
  action?: { done: string; doneRu: string }
  /**
   * Records that this was said. Some endings depend on what you did rather
   * than on how the other person feels — insisting on the wrong sandwich is
   * not an emotion, it is a decision.
   */
  flag?: string
  /** Only offered if every one of these is remembered. */
  after?: MemoryId[]
  /** Never offered if any of these is remembered. */
  unless?: MemoryId[]
  /**
   * Marks a line that refers back to something that actually happened between
   * you. The card gets a quiet `Damals` label — the reward for having a past
   * with someone is a thing you can say, not a badge.
   */
  callback?: boolean
  /** Node to continue with. `null` ends the conversation. */
  next: NodeId | null
}

export type ConversationNode = {
  id: NodeId
  /** Set when this point in the story is reached. */
  flag?: string
  /** 1–3 blocks, delivered one after another like a real chat. */
  messages: MessageBlock[]
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
  /** Small line under the name in the chat header, e.g. "Freitagabend". */
  status?: string
}

export type Level = 'A2' | 'B1' | 'B2'

/**
 * The situation's pictogram on the home list. A closed set on purpose: adding
 * one means drawing it, so the marks stay in one style instead of drifting
 * into a pile of clip art.
 */
export type IconName =
  | 'plate'
  | 'cup'
  | 'glasses'
  | 'bin'
  | 'door'
  | 'form'
  | 'stamp'
  | 'laptop'
  | 'bike'
  | 'tag'
  | 'train'
  | 'clock'

export type Scenario = {
  id: string
  title: string
  /** One short line of setup on the home screen. */
  context: string
  /** Two or three lines of setup for the objective screen. Falls back to `context`. */
  situation?: string
  /** Russian setup, shown only when the user asks for it. */
  situationRu?: string
  /** Even shorter line for the chat header, e.g. "Freitagabend · Freunde". */
  contextLine: string
  duration: string
  level: Level
  /** Shown on the home list — the situation's mark, not the person's. */
  icon: IconName
  /** Wall clock the first message arrives at, e.g. "18:12". */
  startTime?: string
  character: Character
  startNodeId: NodeId
  nodes: Record<NodeId, ConversationNode>
  /**
   * Absent → the conversation starts immediately and ends with a plain
   * sign-off, the way the first scenarios did. Present → the user picks an
   * objective first and gets an outcome at the end, and the same graph becomes
   * worth replaying.
   */
  objectives?: Objective[]
  /**
   * What finishing this conversation adds to your history, whatever it ended
   * like: `spuelmaschine-gespraech`. Later scenarios read it to know that you
   * and this person have a past — which is true after one run and after six.
   */
  experience?: MemoryId
  /**
   * Only offered once every one of these is remembered — the conversation
   * that only happens because of what came before. There is no lock and no
   * hint that something is missing: a scenario the user has not earned simply
   * is not in the list yet, and one that no longer fits (`unless`) quietly
   * stops being offered.
   */
  after?: MemoryId[]
  /** Never offered once any of these is remembered. */
  unless?: MemoryId[]
  /** Starting values for the hidden meters. Clamped to 0–100 as they move. */
  meters?: Meters
  /** Required together with `objectives`. Checked in order. */
  outcomes?: Outcome[]
}
