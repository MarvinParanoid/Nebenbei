# Writing a scenario

A scenario is a small conflict you can walk into with an intention. Everything
else — the graph, the meters, the endings — exists to make that intention
matter. This is the guide for inventing one, and the contract it has to satisfy
to compile and pass the checks.

The priority order, for every decision below: **game → language → learning.**

---

## 1. Finding the situation

The two that work (`wg-spuelmaschine`, `cafe-falsche-bestellung`) share a shape.

**The other person must be right about something.** Jonas hasn't run the
dishwasher — but he took the bin out on Sunday and nobody thanked him. Ben
brought the wrong sandwich — but he didn't take the order. Frau Kessler is nosy —
but everyone's bin fees went up because of the mis-sorted bins. If the other
person is simply wrong, escalating costs nothing and the comedy dies with it.

**The stake must be small and physical.** Dishes, a sandwich, a bin, forty
euros, a Saturday. Not "respect", not "communication". You can film it.

**You must want something they can grant or refuse.** That is what makes an
objective a goal rather than a mood.

**Service counters are the weakest material.** "Order a coffee", "buy a ticket",
"ask for directions" have no stake: nobody can refuse you, so no goal is
interesting. If the situation has no friction, it belongs in the drafts pile,
not in the app.

Good candidates, in rough order of promise:

- Kleinanzeigen: someone offers €40 for a thing worth €120, and won't budge.
- A friend cancels for the third time, two hours before.
- The neighbour downstairs insists **you** are the one making noise at night.
- A coworker tries to hand you their shift, very politely.
- A date turns out to be nothing like their messages.
- The Hausverwaltung has not fixed the heating since November.
- The hairdresser asks "gefällt es dir?" and it does not.

## 2. The objectives

Four, plus the `Einfach reden` card the UI adds for free. They are **different
intentions, never difficulty levels**. Two axes worth knowing:

- The universal set: cooperate / escalate / passive-aggressive / end up
  apologising yourself. Works for any interpersonal conflict.
- The situation-specific set: get it for free / convince them of something
  untrue / get the thing you actually ordered. Stronger when the situation
  allows it.

**One objective should be useless in real life and irresistible anyway** —
convincing Ben that the tuna sandwich is what you ordered. That is the one
people press out of curiosity, and curiosity is what makes them read German
twice.

Each objective carries a German `title`, one German `hint` of flavour, a Russian
`ru` gloss (shown only on request), a `cta` in the product's voice
(`'diesmal passiv-aggressiv?'`) and a `contrast` — the opposite intention, which
is what gets offered for the replay.

## 3. The endings

Five to seven, and **every one of them gets a name**: `Der Putzplan`,
`Die zugeschlagene Tür`, `Der kalte Krieg`, `Aufs Haus`, `Der Thunfisch`.

> If you cannot name it in two to four words, it is not an ending — it is a
> mood, and it should be merged into a neighbouring one.

Rules that hold for the whole list:

- exactly one has **no** `requires` and no flags — the fallback, last in the
  list, reached when nothing else matches;
- one is `secret: true` — not listed among the objectives, found only by
  playing. Ask for a *combination* no single strategy produces (warm **and**
  one honest apology), not simply "very high respect". Usually `achieved: []`;
  give it a goal only when the ending genuinely is the biggest version of that
  goal, as `elif-sagt-ab` does with `wahrheit`;
- every objective must be `achieved` by at least one ending, or it can never be
  reached;
- order runs specific → general, because the first match wins;
- `consequences` are two or three flat facts, not prose. "Die Spülmaschine ist
  immer noch voll." "Jonas ist bei Mira." That is the payoff;
- `quoteLabel` names the moment for that ending: `Hier ist es eskaliert`,
  `Das hat Jonas überzeugt`, `Der Satz, der gesessen hat`.

## 3a. Recurring people

A scenario may be a conversation with someone the user already knows. Two
fields carry that, and nothing else:

```ts
experience: 'spuelmaschine-gespraech',   // on the scenario: this happened
reveals: ['elif-geldsorgen'],            // on an outcome: this is now known
```

and three gates read them — on a message block, on a response, and on the
scenario itself:

```ts
{ text: 'Keine Sorge, diesmal geht es nicht um die Spülmaschine.', ru: '…',
  after: ['spuelmaschine-gespraech'] }

{ id: 'damals', text: 'Bis Sonntag — so wie damals „ich mach sie gleich an“?',
  ru: '…', after: ['spuelmaschine-gespraech'], callback: true, next: 'getroffen' }
```

**Nebenbei remembers experiences, not endings.** Replaying is part of the loop,
so the same player can reach all six endings of one conversation. An ending
therefore cannot be a fact about the world — remembering them all would make
Jonas believe there is a cleaning plan *and* that you slammed the door. Write
`reveals` only for something the user **found out** (`elif-geldsorgen`) or
something now plainly different (`lea-kennengelernt`). The test: would it still
be true after five more runs? `putzplan-haengt` fails it. So does
`rad-verkauft`, which is why the returning Jonas scenario *asks* whether the
bike is still in the cellar instead of assuming it is gone.

Three rules the validator enforces, because each one is invisible in the source:

- every node keeps at least one message **and** one response that need no
  memory — otherwise a newcomer gets an empty turn or a dead end;
- a gate may only name a memory some scenario actually leaves behind;
- a scenario may not wait for its own experience, which would mean waiting
  forever.

And one it cannot: a gated line has to be true in every history that reaches
it. `Und ich mach vorher die Küche` is safe after any dishwasher ending;
`Unser Putzplan funktioniert übrigens super` is not.

A callback is worth more than any reward screen, so spend them: the line the
user can only say because of what happened between them is the whole point.
Two callbacks gated on the same memory would always appear together — put them
in different nodes.

## 4. The graph

12–18 nodes. Branch wide at the top, converge in the middle, and let the last
two nodes be shared by everyone. Full independence for eight turns would need
hundreds of nodes; convergence is the whole reason this is affordable.

- 2–4 responses per node, each a natural thing a native would say. **No option
  is ever wrong German** — the choice is about intention, never correctness.
  Three or four is the norm, because that is where there is room for a
  neutral answer, a jab, an escalation and a retreat. But never pad a node to
  four: if the fourth option only exists to fill the row, the node is better
  with three.
- Paths must take **4–12 choices**. Escalation may be shorter than negotiation,
  but a two-tap ending is a stub.
- A rude choice must lead somewhere the other person actually reacts badly. If
  it lands in a node where they stay friendly, the rudeness was free and the
  fiction breaks.
- Nodes hold 1–3 blocks. Short bubbles ("Weißt du was?") carry more than long
  ones.

**Not every block is a sentence.** A wall of text is the failure mode of this
format, so use the other kinds where the situation offers them:

| kind | what it is | when it earns its place |
| --- | --- | --- |
| text | a bubble | the default |
| `system` | a line from the situation | "Jonas hat eine Nachricht gelöscht.", read receipts, silence |
| `card` | a document: bill, timetable, note, ad | when reading it *is* the language task |
| `reaction` | they react with an emoji instead of answering | when a thumbs-up says more than a bubble |

And a choice can be a deed instead of an utterance:

```ts
{ id: 'schweigen', text: 'Nicht antworten', ru: 'Не отвечать',
  action: { done: 'Du hast nicht geantwortet.', doneRu: 'Ты не ответил.' },
  effects: { anger: 6 }, next: 'ende' }
```

A card is pure typography — no assets, no illustration. `label`, `rows` of a
left column with an optional right one, an optional emphasised `total`, and one
line of `ru` saying what the document is. The strongest use is a card the user
has to actually read to answer: a menu, a bill, a departure board, someone's
notepad that contradicts what you are claiming.

## 5. The meters

`anger`, `respect`, `patience`, `guilt` (how much blame you took). Hidden during
the conversation, revealed only on the outcome card, and **they react to
intention only** — there is never an effect for "said it correctly".

The convention that makes a scenario readable from its numbers:

| tone | effects |
| --- | --- |
| cooperative | `respect +6…10`, `anger −6…10` |
| apologetic | `guilt +12…24`, `anger −6…12` |
| passive-aggressive | `anger +8`, `respect +6…8`, `patience −8…12` |
| rude | `anger +20…30`, `respect −8…20` |

Passive aggression earns respect on purpose: the words are polite, so it cannot
be held against you. Six cold turns should land around 55–65 anger — annoyed,
not detonated — while a rude run should clear 78.

**Never trust a threshold you picked by hand.** `npm run dev` walks every path
in the graph carrying the meters and reports any conditional line or ending that
no route can reach. The first two variants written for `wg-spuelmaschine` were
both dead and only the walk found it.

## 6. Making the person react to how you got there

A node's messages may carry `when` conditions, so the same node sounds different
depending on the conversation so far:

```ts
messages: [
  { text: 'Ok, machen wir es konkret.', ru: '…', when: { anger: ['<', 38] } },
  { text: 'Ok. Machen wir es konkret, dann hab ich Ruhe.', ru: '…', when: { anger: ['>=', 38] } },
  { text: 'Und was ist mit dem Rest — Bad, Müll, Boden?', ru: '…' },
]
```

Two shapes are worth using: mutually exclusive variants of one line, and an
extra bubble that only appears in a certain state (`Und jetzt lass es gut sein,
ja?`). Put them where the most different paths converge — that is where the
artificiality shows. **Every node must keep at least one unconditional
message**, or the turn could come out empty.

Endings that depend on what you *did* rather than how they feel use flags:
`flag` on a choice ("insisted on the tuna") or on a node ("the drink went on the
house"), and `requiresFlags` / `forbidsFlags` on the outcome.

## 7. The German

Casual chat register at roughly B1: contractions, particles (`halt`, `eh`,
`mal`, `doch`), short incomplete messages, the occasional emoji **inside the
conversation** (never in the app's own interface). No textbook register unless
the situation is genuinely formal — the Amt and neighbour scenarios are
deliberately `Sie` and full of Amtsdeutsch, because that is the German those
situations arrive in.

Prefer chunks over words: `kommt drauf an`, `so gegen acht`, `Bescheid sagen`,
`mir reicht's`, `selber schuld`. Mark them in incoming messages as
`[surface form](glossary-id)` and add missing entries to `data/glossary.ts` —
canonical phrase, Russian gloss, one natural example and its translation.

Markup in a **response** renders as literal brackets; the validator rejects it.
An own line offers its expressions as chips instead, matched from the glossary.

The joke is always the situation, never the user. `Ziel verfehlt` copy is
written to be funny.

## 8. Translations

**The Russian does not have to mirror the German.** It has to give a Russian
reader the same social feeling the German gives a German — that is the thing
being taught, not sentence-for-sentence equivalence. `Danke, dass du normal
gefragt hast` is «Спасибо, что нормально спросил», not «что спросил нормально»;
`ich hör auf` is «всё, прекращаю», not «я замолчал»; `ich war weg` is «меня не
было дома», not «я был занят». And the Russian should be as spoken as the
German: if the German has `grad`, `eh`, `Sag mal`, the Russian cannot read like
a subtitle.

**Traps worth knowing, all of them found in review rather than by a checker:**

- a jab translated from English stays grammatical and still sounds foreign —
  `Einmal Müll rausbringen ist noch kein Charakter` had to become
  `…macht dich noch nicht zum Helden`;
- verbs of placing: you *hang* a Putzplan `an den Kühlschrank`, writing
  `an den Kühlschrank` means writing on the appliance;
- `frei` is not how something is free of charge — `geht aufs Haus`,
  `kostenlos`, `gratis`;
- a negation at the end carries the German intonation: `entscheidet er, nicht
  ich`, not `…, ich nicht`;
- don't compress an order into its topping: nobody orders `Käse`, they order a
  `Käse-Sandwich`;
- a glossary entry must teach the chunk, not the bare verb: `etwas geht vor`,
  because `vorgehen` alone means five other things.

None of these are grammar mistakes, which is exactly why the checks cannot find
them and a reading pass has to.

`ru` is **required** on every message and every response — a missing one is a
type error, not a gap someone notices later. Russian is shown only on request,
so write it as a real translation, not as an explanation. Where Russian grammar
forces a gender for the user's own lines, use masculine; prefer phrasing that
avoids the choice.

## 9. The checklist before it ships

```bash
npm test          # every content invariant, plus the logic around it
npm run build     # tsc: every ru present, every field typed
npm run dev       # console: the same validator, silent when healthy
```

The validator refuses: dangling `next` ids, unreachable nodes, **a graph that
can loop**, unknown glossary ids, markup in a response, an empty translation, a
node whose every message is conditional, an objective nothing can achieve, an
outcome nothing resolves to, a missing fallback outcome, a flag nobody sets, a
conditional line no path reaches, an unused glossary entry, and paths outside
4–12 choices.

**Every choice must move the conversation forward.** A cycle — `plan → gereizt →
plan` — lets the player loop two nodes indefinitely, push the meters to their
ceiling and make the ending meaningless. When a rude answer needs to exist after
an agreement, point it at the blow-up rather than back at the argument.

Then play it: every objective, plus one deliberately contradictory run (aim to
escalate and be nice about it). If the miss is funnier than the hit, the
scenario is done.

## 10. Getting the German checked

Neither of us is a native speaker, and the register is the part most likely to
be subtly off. The scenarios are TypeScript with Russian and mechanics mixed in,
which is unreadable for a reviewer, so there is a round trip:

```bash
npm run de:export             # → review/<scenario>.md and review/lines.tsv
npm run de:apply -- fixed.tsv # writes the corrections back
```

`review/*.md` is for a human or a model to read: the situation, the goals, every
line in conversation order with its node, the conditions under which a variant
fires, and the endings. `review/lines.tsv` is the same text as `id⇥text`, which
is what comes back. Ids are stable, unknown ones are skipped with a warning, and
a line whose text is no longer unique in the source is skipped rather than
guessed at. Run `npm test` afterwards — a correction that drops an annotation's
brackets will fail the content checks.

What a reviewer must be told, or the review will make the German *worse*:

- keep it spoken. Contractions, particles and unfinished sentences are the
  point, not mistakes to be tidied into textbook German;
- the rude options are meant to be rude, and the passive-aggressive ones are
  meant to be deniable. Don't soften them;
- `[so gegen 8](so-gegen-acht)` — the text inside the brackets may change, the
  brackets and the id must survive;
- flag only what a native would not say, and say why. "Correct but nobody talks
  like that" is exactly the note worth having.

A prompt that holds that line:

> Hier sind Dialoge einer Sprachlern-App: ein Alltagskonflikt als Chat, B1,
> gesprochenes Deutsch. Prüfe jede Zeile darauf, ob eine deutsche
> Muttersprachlerin sie so sagen würde — nicht darauf, ob sie grammatisch
> „schöner" sein könnte. Umgangssprache, Partikeln (`halt`, `eh`, `mal`),
> Verschleifungen und unvollständige Sätze sind gewollt. Grobe Antworten sollen
> grob bleiben, passiv-aggressive sollen unangreifbar bleiben. Ändere nichts an
> `[Text](id)`-Klammern. Antworte als TSV `id⇥korrigierter Text`, nur für
> Zeilen, die du tatsächlich änderst, und danach eine kurze Liste mit Begründung.

## 11. Skeleton

```ts
import type { Scenario } from '../../types'

export const situation: Scenario = {
  id: 'kleinanzeigen-40-euro',
  title: '40 Euro, mehr nicht',
  context: 'Bietet 40 € für dein Fahrrad. Es steht für 120 € drin.',
  situation: 'Zwei Sätze, kein Hallo, und ein Angebot, das ein Drittel ist. Er will es heute abholen.',
  situationRu: '…',
  contextLine: 'Kleinanzeigen · Chat',
  duration: '3 min',
  level: 'B1',
  startTime: '20:15',
  character: { name: 'Tarek', status: 'Kleinanzeigen' },
  meters: { anger: 0, respect: 50, patience: 55, guilt: 0 },

  objectives: [
    { id: 'preis', title: '…', hint: '…', ru: '…', cta: 'diesmal …?', contrast: 'abzocken' },
    // three more
  ],

  outcomes: [
    { id: '…', requires: { … }, achieved: ['…'], quoteLabel: '…',
      name: '…', nameRu: '…', title: '…', titleRu: '…',
      consequences: [{ de: '…', ru: '…' }] },
    // … specific → general, exactly one without `requires`, one `secret`
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [{ text: '…', ru: '…' }],
      responses: [{ id: 'ok', text: '…', ru: '…', effects: { respect: 8 }, next: '…' }],
    },
  },
}
```

Register it in `data/scenarios/index.ts` — `scenarios` for the app, `drafts`
for anything without objectives yet.

## 12. As an LLM prompt

Everything above is the specification; the parts a generator must not get wrong
are these:

> Write a German conversation scenario as a TypeScript object matching
> `src/types.ts`. A small everyday conflict where the other person has a
> legitimate position. 12–18 nodes, 2–4 responses each, every path 4–12 choices,
> branches converging in the middle. Four objectives that are different
> intentions (not difficulty levels), one of them useless in real life and
> irresistible. Five to seven endings, each with a two-to-four-word German name,
> exactly one without conditions, one secret requiring a combination no single
> strategy produces. Hidden meters react to intention only, following the
> effects table. Every message and response needs a Russian translation; mark
> useful chunks in incoming messages only, as `[surface](glossary-id)`. Casual
> chat German at B1, particles and contractions, emoji only inside the
> conversation. No response may be wrong German — the user picks what they want
> to say, never what is correct.
