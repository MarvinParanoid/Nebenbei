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
incomplete messages, occasional emoji. No textbook register (`Guten Tag. Wie
geht es Ihnen?`) unless the situation is genuinely formal. Prefer teaching
conversational chunks (`kommt drauf an`, `so gegen acht`, `Bescheid sagen`) over
isolated words.
