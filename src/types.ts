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
  /** Extra pause before this bubble, in ms. Defaults to a length-based guess. */
  delay?: number
  /** Reserved: later the user will be able to listen before revealing text. */
  audioUrl?: string
}

export type ResponseChoice = {
  id: string
  text: string
  /** Node to continue with. `null` ends the conversation. */
  next: NodeId | null
}

export type ConversationNode = {
  id: NodeId
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
  /** Even shorter line for the chat header, e.g. "Freitagabend · Freunde". */
  contextLine: string
  duration: string
  level: Level
  character: Character
  /** Accent hue (CSS hue angle) used for the avatar tint. */
  hue: number
  startNodeId: NodeId
  nodes: Record<NodeId, ConversationNode>
}
