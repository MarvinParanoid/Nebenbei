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
  screens/Home.tsx          the list of conversations
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

### Vocabulary

Chunks are annotated inline as `[surface form](glossary-id)` and rendered as
tappable text. Tapping opens a bottom sheet with the translation and one
example; closing it leaves the conversation exactly where it was. Every lookup
is logged to `localStorage` (`phrase`, `translation`, `views`, timestamps) —
nothing is shown to the user yet, it's the input for later personalisation.

### Content safety net

`npm run dev` runs `validateScenarios()` once and logs to the console if a
scenario has a dangling `next` id, an unreachable node, an unknown glossary id,
or paths outside the 6–12 choice target. Content bugs otherwise stay invisible
until someone happens to walk that exact branch.

## Deliberate MVP shortcuts

- No audio and no free-form input. `IncomingMessage.audioUrl` and
  `ConversationNode.input` exist in the model but nothing reads them yet.
- Reloading mid-conversation restarts that conversation (the hash route keeps
  you in it). Only vocabulary and "finished" flags persist.
- Only annotated chunks are tappable, not every word.
- Emoji instead of avatar images.
