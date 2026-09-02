# Nebenbei

_Deutsch, ohne Deutsch zu lernen._

A small mobile-first web app for conversational German. You read a chat message,
tap the reply **you** want to send, and the conversation continues. No lessons,
no scores, no streaks — the conversation is the product.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + bundle), `npm run lint`, `npm run preview`.

Node 20+ is required. If `node` isn't on your PATH, this repo was developed with
a local install at `~/.local/opt/node-v24.20.0-linux-x64/bin`.

Writing a new conversation — what makes a situation work, and the contract it
has to satisfy — is [SCENARIOS.md](SCENARIOS.md). Deployment (VPS, Docker, GHCR)
is [DEPLOY.md](DEPLOY.md).

## How it works

Everything is static local data — no backend, no auth, no AI calls.

```
src/
  types.ts                  data model (scenarios, nodes, choices, glossary)
  data/glossary.ts          shared chunk dictionary (phrase → RU + example)
  data/scenarios/*.ts       one file per conversation tree
  lib/useConversation.ts    the conversation state machine (timing, typing, branching)
  lib/message.ts            inline phrase-annotation parser
  lib/vocab.ts              localStorage log of looked-up phrases
  lib/progress.ts           localStorage set of finished conversations
  lib/validate.ts           dev-only content check (see below)
  lib/meters.ts             hidden meters, outcome resolution
  lib/endings.ts            localStorage set of endings already found
  screens/Home.tsx          the list of conversations
  screens/Objectives.tsx    pick a goal before the conversation
  screens/Chat.tsx          the conversation screen
  components/               bubble, typing dots, phrase sheet, closing card
```

### Conversation data

A scenario is a small graph. Each node holds the messages the other person
sends, plus 2–4 responses — all of them natural, none of them "correct":

```ts
nodes: {
  start: {
    id: 'start',
    messages: [{ text: 'Hey 😊' }, { text: 'Bist du heute Abend [dabei](dabei-sein)?' }],
    responses: [
      { id: 'ja',   text: 'Klar, bin dabei! Wo trefft ihr euch?', next: 'ort' },
      { id: 'nein', text: "Heute schaff ich's leider nicht.",     next: 'nein' },
    ],
  },
}
```

Branches diverge for a few turns and then converge again, which keeps every
path 6–10 taps long without exploding the amount of content.

### Objectives, meters and outcomes

A conversation is not "talk to the waiter" but **pick a goal → talk → find out
how it went**. The same graph serves every objective; only what counts as a good
ending changes, which is what makes it worth replaying — and replaying is how
you meet the same German constructions again, on your own initiative.

```
Was willst du erreichen?
  Das Richtige bekommen           Einfach das, was du bestellt hast.
  Nichts bezahlen                 Gar nichts. Keinen Cent.
  Ben soll dich nicht wiedersehen wollen
                                  Den Fehler hat er nicht gemacht. Egal.
  Behaupten, du hattest Thunfisch Du hattest keinen Thunfisch.
  Einfach reden                   Kein Ziel. Schau, wo es endet.
```

While you talk, four meters move invisibly — `anger`, `respect`, `patience`,
`guilt` (how much blame you took). **They are never shown as numbers during the
conversation**: the moment a meter is visible, people optimise the meter instead
of reading the German. They also react to *intent only* — there is deliberately
no effect for "said it correctly". You are judged on the social outcome, never
on your German, which is what keeps "Ziel verfehlt" a joke rather than a grade.

At the end the first matching `Outcome` wins. The card is the payoff screen —
verdict, consequences, the meters (revealed here and only here), the line that
decided it, and an invitation to replay with a goal you haven't reached:

```
GESCHAFFT
Jonas ist raus und hat die Tür zugemacht.

  Die Spülmaschine ist immer noch voll.
  Jonas ist bei Mira.
  Geredet wird morgen nicht.

JONAS   Ärger ██████████   Respekt ░░░░░░░░░░

DER SATZ, DER ES ENTSCHIEDEN HAT
„Und du bist echt faul. Passt ja zusammen."

[ Nochmal — diesmal: Das Problem lösen ]
```

Emoji live inside the conversation and never in the interface itself: the
characters write them, Nebenbei doesn't.

The same node can also *sound* different depending on how the conversation has
gone — a message may carry `when` conditions on the meters:

```ts
messages: [
  { text: 'Ok, machen wir es konkret.', ru: '…', when: { anger: ['<', 38] } },
  { text: 'Ok. Machen wir es konkret, dann hab ich Ruhe.', ru: '…', when: { anger: ['>=', 38] } },
  { text: 'Ich mach die Maschine heute an. Und was ist mit dem Rest?', ru: '…' },
]
```

The graph itself never branches on meters, only the wording does. `validate.ts`
walks every path with the meters carried along, so a variant whose threshold no
route reaches is reported rather than silently never firing.

Endings can also depend on what you *did* rather than on how the other person
feels — `flag` on a choice or a node, `requiresFlags` / `forbidsFlags` on an
outcome. Insisting that the tuna sandwich is what you ordered is a decision,
not a mood. Some outcomes are `secret`: not listed among the objectives, found
only by playing.

### The conversations

Shown in the app — the ones that have objectives:

| | |
| --- | --- |
| `wg-spuelmaschine` | Jonas asks about leftover lasagne. His dishes are three days old |
| `cafe-falsche-bestellung` | Chai and tuna arrive. You ordered flat white and cheese |
| `kleinanzeigen-fahrrad` | A stranger offers 40 € for the bike you listed at 120 |
| `elif-sagt-ab` | A close friend cancels dinner twenty minutes before — the third time |
| `nebenkosten-nachzahlung` | The landlord's yearly statement: 640 € to pay, one line too many |
| `chef-samstag` | Friday, 17:42. Someone is sick and the boss needs your Saturday |
| `nur-bis-sonntag` | Jonas again. His girlfriend is coming "until Sunday" — ten days |

Written, fully translated, still without objectives, so they are kept in
`drafts` and stay out of the app (dev-validated, tree-shaken out of production):
`lisa-drinks`, `muell-nachbar` (Frau Kessler and the wrong bin), `nachbar-laerm`
(22:15, the drill), `jobcenter-unterlagen`, `buergeramt-termin` ("the next free
appointment is in March"), `cafe-order`, `coworker-favor`, `weekend-plans`,
`party-smalltalk`.

The neighbour and Amt conversations are deliberately `Sie` and full of
Amtsdeutsch — that is the German those situations actually arrive in. The joke
is always the situation, never the user: no option is the wrong one.

### Understanding a message

Two levels, both one tap and neither of them leaves the conversation:

- **A whole message** — tap the bubble. Own bubbles too: "what did I just
  say?" is a real question, and the user's line is a sentence they didn't
  write themselves.
- **A single chunk** — tap the dotted underline inside an incoming message.

Response cards carry a quiet `RU` button on the right, because tapping the card
itself sends it — finding out what you are about to say must not cost you the
turn.

Both `IncomingMessage.ru` and `ResponseChoice.ru` are **required** fields. That
is deliberate: "sometimes there is no translation" is a worse experience than a
slightly bigger bundle, so coverage is a type error rather than a good
intention.

### Vocabulary

Chunks are annotated inline as `[surface form](glossary-id)` and rendered as
tappable text. Tapping opens a bottom sheet with the translation and one
example; closing it leaves the conversation exactly where it was. Every lookup
is logged to `localStorage` (`phrase`, `translation`, `views`, timestamps) —
nothing is shown to the user yet, it's the input for later personalisation.

### Content safety net

`npm run dev` runs `validateScenarios()` once and logs to the console if a
scenario has a dangling `next` id, an unreachable node, an unknown glossary id,
phrase markup in a response (only incoming messages are parsed), or paths
outside the 6–12 choice target. Content bugs otherwise stay invisible
until someone happens to walk that exact branch.

## Deliberate MVP shortcuts

- No audio and no free-form input. `IncomingMessage.audioUrl` and
  `ConversationNode.input` exist in the model but nothing reads them yet.
- Reloading mid-conversation restarts that conversation (the hash route keeps
  you in it). Only vocabulary and "finished" flags persist.
- Only annotated chunks are tappable, not every word.
- Emoji instead of avatar images.
