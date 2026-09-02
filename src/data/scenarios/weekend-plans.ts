import type { Scenario } from '../../types'

/** Making a weekend plan with a friend: where, weather, when, what to bring. */
export const weekendPlans: Scenario = {
  id: 'weekend-plans',
  title: 'Wochenende?',
  context: 'Nina hat eine Idee für Sonntag.',
  contextLine: 'Donnerstagabend · Pläne machen',
  duration: '3 min',
  level: 'B1',
  hue: 152,
  character: { name: 'Nina', avatar: '🚲', status: 'Donnerstag, 21:04' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey du 👋' },
        { text: '[Hast du am Wochenende schon was vor?](was-vorhaben)' },
      ],
      responses: [
        { id: 'nichts', text: 'Noch nichts. Was schwebt dir vor?', next: 'idee' },
        { id: 'sonntag', text: 'Samstag bin ich verplant, Sonntag frei.', next: 'sonntag' },
        { id: 'faul', text: 'Ich wollte eigentlich gar nichts machen 😄', next: 'faul' },
      ],
    },

    idee: {
      id: 'idee',
      messages: [
        { text: 'Ich hätte [Bock](bock-haben) auf Fahrrad und See.' },
        { text: '[Wenn das Wetter hält](wenn-das-wetter-haelt), natürlich.' },
      ],
      responses: [
        { id: 'see', text: 'Klingt super. Wie weit ist der See?', next: 'see' },
        { id: 'park', text: 'Fahrrad ja, See nein. Ich schwimm nicht gern.', next: 'park' },
        { id: 'rad', text: 'Mein Rad steht seit Wochen platt im Keller 😅', next: 'rad' },
      ],
    },

    sonntag: {
      id: 'sonntag',
      messages: [
        { text: 'Sonntag [passt mir](passt-mir-gut) sogar besser.' },
        { text: 'Wollen wir zum See? Mit dem Rad sind es vierzig Minuten.' },
      ],
      responses: [
        { id: 'see', text: 'Vierzig Minuten geht klar. Erzähl.', next: 'see' },
        { id: 'park', text: 'Bisschen weit. Gibt es was Näheres?', next: 'park' },
        { id: 'rad', text: 'Ich hab gar kein Rad.', next: 'rad' },
      ],
    },

    faul: {
      id: 'faul',
      messages: [
        { text: 'Verstehe 😄 Nichts machen ist auch ein Plan.' },
        { text: 'Aber wenn du doch [Lust hast](lust-haben): Fahrrad und See, Sonntag?' },
      ],
      responses: [
        { id: 'see', text: 'Ok, überredet. Wo ist der See?', next: 'see' },
        { id: 'park', text: 'Fahrrad ist mir zu viel. Park?', next: 'park' },
        { id: 'rad', text: 'Mein Rad hat einen Platten.', next: 'rad' },
      ],
    },

    see: {
      id: 'see',
      messages: [
        { text: 'Einmal raus aus der Stadt, dann nur noch Wiese und Wasser.' },
        { text: 'Ich war letztes Jahr da — [lohnt sich](sich-lohnen) echt.' },
      ],
      responses: [
        { id: 'gut', text: 'Dann machen wir das.', next: 'wetter' },
        { id: 'baden', text: 'Kann man da auch baden, oder nur Füße rein?', next: 'wetter' },
        { id: 'weg', text: 'Ist der Weg dahin okay? Ich fahr nicht gern an Autos vorbei.', next: 'wetter' },
      ],
    },

    park: {
      id: 'park',
      messages: [
        { text: 'Dann Stadtpark — zehn Minuten von dir.' },
        { text: 'Decke, was zu trinken, fertig. [Hört sich doch gut an?](hoert-sich-gut-an)' },
      ],
      responses: [
        { id: 'ja', text: 'Ja, das reicht mir völlig.', next: 'wetter' },
        { id: 'essen', text: 'Ich bring was zu essen mit.', next: 'wetter' },
        { id: 'wer', text: 'Kommt noch jemand mit?', next: 'wer' },
      ],
    },

    wer: {
      id: 'wer',
      messages: [
        { text: 'Ich frag Jule, aber die sagt meistens [spontan](spontan) ab 😄' },
        { text: 'Ansonsten nur wir zwei.' },
      ],
      responses: [
        { id: 'gut', text: 'Passt mir gut so.', next: 'wetter' },
        { id: 'frag', text: 'Frag sie trotzdem, ich mag sie.', next: 'wetter' },
      ],
    },

    rad: {
      id: 'rad',
      messages: [
        { text: 'Kein Problem, du kannst das von meiner Mitbewohnerin nehmen.' },
        { text: 'Sie fährt es eh [kaum](kaum).' },
      ],
      responses: [
        { id: 'danke', text: 'Perfekt, danke!', next: 'wetter' },
        { id: 'park', text: 'Dann doch lieber Park, das ist mir sicherer.', next: 'park' },
        { id: 'damenrad', text: 'Ist das so ein Rad mit Blumenkorb? 😄', next: 'rad-zwei' },
      ],
    },

    'rad-zwei': {
      id: 'rad-zwei',
      messages: [{ text: 'Ja 🌸' }, { text: 'Macht doch nichts, es fährt.' }],
      responses: [
        { id: 'nehm', text: 'Stimmt. Ich nehm es.', next: 'wetter' },
        { id: 'probier', text: "Ok, ich probier's 😄", next: 'wetter' },
      ],
    },

    wetter: {
      id: 'wetter',
      messages: [
        { text: 'Laut App: Samstag Regen, Sonntag Sonne.' },
        { text: '[Kommt drauf an](kommt-drauf-an), welcher App man glaubt 😄 Aber: Sonntag, oder?' },
      ],
      responses: [
        { id: 'sonntag', text: 'Sonntag dann.', next: 'wann' },
        { id: 'apps', text: 'Apps lügen 😄 Aber ok, Sonntag.', next: 'wann' },
        { id: 'spontan', text: 'Ich sag dir Samstagabend Bescheid.', next: 'spontan' },
      ],
    },

    spontan: {
      id: 'spontan',
      messages: [
        { text: 'Ok, aber sag wirklich Bescheid 🙂' },
        { text: 'Ich plan Sonntag dann erst mal mit dir. Vormittags ist es noch leer draußen.' },
      ],
      responses: [
        { id: 'ja', text: 'Mach ich. Vormittags klingt gut.', next: 'wann' },
        { id: 'nachmittag', text: 'Vormittags schaff ich nicht, sorry.', next: 'wann' },
      ],
    },

    wann: {
      id: 'wann',
      messages: [{ text: 'Wann passt dir? Ich bin flexibel.' }],
      responses: [
        { id: 'elf', text: 'Elf wär gut.', next: 'mitbringen' },
        { id: 'nachmittag', text: 'Lieber nach dem Mittagessen.', next: 'mitbringen' },
        { id: 'egal', text: 'Ist mir egal, sag du.', next: 'mitbringen' },
      ],
    },

    mitbringen: {
      id: 'mitbringen',
      messages: [
        { text: 'Ich bring Brot, Käse und Tomaten mit.' },
        { text: 'Bringst du was zu trinken?' },
      ],
      responses: [
        { id: 'trinken', text: 'Klar, Wasser und Limo.', next: 'treffen' },
        { id: 'kuchen', text: 'Ich bring lieber Kuchen, trinken hab ich nichts da.', next: 'treffen' },
        { id: 'unterwegs', text: 'Ich kauf unterwegs was. Passt das?', next: 'treffen' },
      ],
    },

    treffen: {
      id: 'treffen',
      messages: [
        { text: '[Klingt gut](klingt-gut).' },
        { text: 'Dann treffen wir uns am Brunnen.' },
        { text: 'Und wenn es doch regnet, gehen wir einfach Kaffee trinken ☕' },
      ],
      responses: [
        { id: 'deal', text: 'Deal 🙂', next: 'ende' },
        { id: 'kekse', text: 'Und ich bring Kekse mit, für alle Fälle.', next: 'ende' },
        { id: 'schreib', text: 'Schreib mir vorher, ja?', next: 'ende' },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Mach ich! Bis Sonntag ☀️' }],
      responses: [],
    },
  },
}
