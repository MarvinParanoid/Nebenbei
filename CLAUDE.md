# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # vite dev server on :5173
npm run build    # tsc -b && vite build — the only typecheck gate
npm run lint     # oxlint (react/rules-of-hooks, typescript, oxc)
npm run preview  # serve dist/
```

There is no test runner. The safety net for content is `validateScenarios()`
([src/lib/validate.ts](src/lib/validate.ts)), which runs automatically on every dev-mode page load and
`console.error`s dangling `next` ids, unreachable nodes, node-key/`node.id`
mismatches, unknown glossary ids, and scenarios whose paths fall outside 6–12
choices. A clean console means the content graphs are sound.

Node is not installed system-wide on this machine; development used
`~/.local/opt/node-v24.20.0-linux-x64/bin` on `PATH`.

## Deployment

The test deployment is https://nebenbei.duckdns.org — a static build served by
nginx inside the image, bound to `127.0.0.1:8001` on the VPS behind Caddy, with
`/root/deploy-nebenbei.sh` as the forced-command target for the CI deploy key.
There is no server-side state: everything the visitor accumulates lives in their
`localStorage`. See [DEPLOY.md](DEPLOY.md); the image is what
`.github/workflows/ci.yml` builds, smoke-tests and publishes to GHCR.

## Product constraints (these shape code review, not just copy)

The app must read as a messenger, not as courseware. Do not add: scores, XP,
streaks, hearts, daily goals, progress bars, red/green correct-vs-incorrect
feedback, quizzes, or grammar drills. Response choices are competing
*intentions* — every option is a natural, valid thing to say, and the user picks
what they want to communicate. Anything that grades the user contradicts the
product.

## Architecture

Static content → a conversation state machine → two screens. No backend, no
auth, no AI calls at runtime.

**Content** lives in [src/data/scenarios/](src/data/scenarios/) (one file per conversation) plus a
shared chunk dictionary in [src/data/glossary.ts](src/data/glossary.ts). A scenario is a graph of
`ConversationNode`s: each node carries the 1–3 bubbles the character sends and
2–4 responses pointing at `next` node ids. `responses: []` marks an end node.
Branches are expected to diverge for a few turns and then **converge** back onto
a shared spine — that is what keeps every path 6–12 taps without multiplying
content. When a path gets too short, add a shared node to the spine rather than
lengthening one branch.

**Emoji live inside the conversation, never in the app's own interface.** A
character may write "Ist noch was von der Lasagne da? 😄" and the user may
answer "Sorry 😅" — those are people in a messenger. But Nebenbei itself never
speaks in emoji: no `😈` on an objective card, no `🎉` on a verdict, no emoji
avatars (monogram initials instead). The personality belongs in the wording; the
shell stays quiet and adult. The same reasoning keeps CEFR levels off the home
card — `level` stays in the data for picking content, but printing it turned the
list into a course catalogue.

**The other person reacts to how you got there.** A node's `messages` may carry
`when` conditions on the meters, so the same node can sound different: two
mutually exclusive variants of a line, or an extra bubble that only appears once
someone is annoyed (`Und jetzt lass es gut sein, ja?`). The graph still never
branches on meters — only the wording does — which keeps the structure readable
while removing the worst artificiality, a friendly reply after six cold ones.
Every node must keep at least one unconditional message so a turn can never
come out empty, and `validate.ts` walks **every path** through the graph
carrying meters and flags to prove that each conditional line and each outcome
is actually reachable. Thresholds cannot be eyeballed: the first two variants
written by hand were both dead, and only the walk found it.

**A goal is what you wanted; an ending is what happened.** Every `Outcome` has
a `name` of its own (`Der Putzplan`, `Die zugeschlagene Tür`, `Der kalte
Krieg`), and that is what the outcome card leads with — the name is the thing
being collected, which is what makes "1 / 6 Enden entdeckt" mean anything. A
missed goal reads `Ziel verfehlt`, never "nicht geschafft": you missed a goal
you set for fun, you did not fail an exercise. The ✓ next to an objective means
an ending that *achieves* it has been reached — not that it was played.

The card's order is game layer first, language layer below it: ending name →
what it was → consequences → how the other person feels → the line that decided
it → chunks → replay. The replay button speaks in the product's voice
(`Objective.cta`: "Nochmal — diesmal passiv-aggressiv?") and never offers a goal
already achieved, including one achieved by the ending being shown.

**Objectives and outcomes.** `scenario → objective → conversation → outcome`.
A scenario with `objectives` asks for a goal first (`#/s/<id>` → `#/s/<id>/<goal>`,
`free` for no goal) and ends with `OutcomeCard`; one without them goes straight
in and ends with `EndCard`. Four hidden meters (`anger`, `respect`, `patience`,
`guilt`) accumulate from each choice's `effects`; `resolveOutcome` returns the
first `Outcome` whose `requires` / `requiresFlags` / `forbidsFlags` all hold, so
the list must run specific → fallback and end with a condition-free entry. The
An outcome carries `consequences` — two or three flat facts about what it cost
or bought you — rather than a paragraph of prose. The outcome card is the payoff
screen: verdict, consequences, the meters **revealed here and only here**, the
line that decided it (the choice with the largest `weight`, ties to the later
line, under a heading that depends on the ending — `quoteLabel`, e.g. "Hier ist
es eskaliert"), at most three chunks picked up along the way, and a one-tap
invitation to replay with `objective.contrast` — deliberately the opposite
intention, so the replay is a different conversation rather than a retry.

Priority order for anything new, in this order: **game → language → learning**.
If the learning layer starts showing through the interface — word lists,
counters, progress — it should go back into the background.

Three rules that keep this from becoming a test, and that a reviewer should
enforce: meters are **never rendered as numbers** during a conversation; effects
react to **intent only** (never to grammar or vocabulary); and "Ziel verfehlt"
copy is written to be funny, never punishing. `data-choice` on `.choice__send`
carries the response id for automation.

Only scenarios with objectives are exported as `scenarios` (shown, routable).
The rest live in `drafts` — still validated in dev, tree-shaken out of
production, deliberately not reachable until they get objectives.

**Russian is shown on request, never by default.** Every message and every
response carries a required `ru` field, so a missing translation fails `tsc`
rather than surfacing as a gap — but the screens stay German until the user
asks. There is one affordance for asking (`.ru-toggle`, and `.choice__ru` on a
response card) and it always toggles in place:

- a bubble unfolds its translation inside itself (`.msg__ru`) — reading a
  message is far too frequent to deserve a dialog;
- a response card swaps its own text to Russian, so finding out what you are
  about to say never costs you the turn (`.choice__send` sends, `.choice__ru`
  toggles — automation must click `.choice__send`);
- the objective screen and the outcome card each have one toggle for the whole
  screen;
- `PhraseSheet` stays a sheet: a chunk with its example is the one interaction
  rich enough to earn one. Opening it *is* the signal that the phrase was
  unfamiliar — nothing is saved by hand.

Chunks are annotated only in incoming messages (markup in a response would
render as brackets — the validator rejects it), so an own line offers its
expressions as chips once its translation is open, matched by `findChunks`.
Russian for the user's own lines uses masculine forms where Russian grammar
forces a choice; prefer neutral phrasing when it costs nothing.

**Phrase annotations** are inline in message text: `[surface form](glossary-id)`,
parsed by `parseMessage` in [src/lib/message.ts](src/lib/message.ts). Only incoming messages render
taps; the user's own bubbles are plain. Conventions the validator does not
enforce: every glossary entry should be referenced by at least one scenario, and
glosses/examples are written in Russian.

**[src/lib/useConversation.ts](src/lib/useConversation.ts)** is the state machine. A reducer holds
`items` (transcript), `delivered` (how many of the current node's messages have
landed), `typing`, and `seen` (glossary ids encountered). An effect schedules the
next undelivered message: a gap (~380–640 ms after a choice, 240 ms between
bubbles), then a typing state, then the bubble, then it re-runs. Two returned
values look redundant but are not:

- `choices` — the current node's responses, known *before* they are tappable.
- `ready` — whether every message of the node has landed.

[src/screens/Chat.tsx](src/screens/Chat.tsx) always renders `choices` in the dock and only adds
`.dock--waiting` (opacity 0, `pointer-events: none`) while `!ready`. This holds
the dock's height across a turn so the bottom-anchored thread never jumps.
Rendering the dock conditionally on `ready` reintroduces that jump; `choose()`
already ignores taps when `!ready`.

Two other non-obvious details: tappable chunks must stay `<span role="button">`
— a `<button>` is an atomic inline box, so a long chunk gets pushed onto its own
line instead of wrapping — and any automation should target
`.dock:not(.dock--waiting) .choice`, since faded cards are still in the DOM
(`element.click()` bypasses `pointer-events`).

**Persistence** is two versioned localStorage keys, both fail-soft in
`try/catch`: `nebenbei.vocab.v1` (every lookup: phrase, translation, `views`,
timestamps — collected for future personalisation, never shown as statistics)
and `nebenbei.finished.v1` (a quiet ✓ on the home row). Reloading mid-chat
restarts that conversation; only these two keys survive.

**Routing** is hash-based (`#/chat/<scenario-id>`) in [src/App.tsx](src/App.tsx) so the browser
back button works. `<Chat key={scenario.id}>` remounts per scenario, which is
what resets conversation state.

**Reserved for later features** — present in [src/types.ts](src/types.ts), unread by the UI:
`IncomingMessage.audioUrl` (listen before revealing text) and
`ConversationNode.input?: 'choice' | 'text' | 'voice'` (typed/spoken replies).

**Styling** is one hand-written stylesheet, [src/index.css](src/index.css): CSS custom
properties on `:root` with a `prefers-color-scheme: dark` override, avatar tints
computed as `oklch(var(--tint-l) var(--tint-c) var(--hue))` from `scenario.hue`,
a `prefers-reduced-motion` block that flattens every animation, and a phone-width
column that gains a device frame above 620px. No CSS framework or UI library —
react and react-dom are the only runtime dependencies.

## Writing German content

Casual spoken/chat German at roughly B1, the kind used with friends, coworkers
and in cafés: contractions, fillers, particles (`halt`, `eh`, `mal`), short
incomplete messages, occasional emoji. Prefer teaching conversational chunks
(`kommt drauf an`, `so gegen acht`, `Bescheid sagen`) over isolated words.

Textbook register (`Guten Tag. Wie geht es Ihnen?`) is wrong for the casual
scenarios — but the neighbour and Amt scenarios (`muell-nachbar`,
`nachbar-laerm`, `jobcenter-unterlagen`, `buergeramt-termin`) are deliberately
`Sie` and deliberately carry Amtsdeutsch (`Unterlagen`, `Frist`, `Bescheid`,
`Nachweis`, `zuständig`), because that is the German those situations actually
arrive in. Their humour comes from the situation and from the person on the
other end staying human — never from mocking the user or making one response
option the "wrong" one.
