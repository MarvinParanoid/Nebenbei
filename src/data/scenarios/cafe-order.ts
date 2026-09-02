import type { Scenario } from '../../types'

/** At the counter of a small café. Short turns, service German. */
export const cafeOrder: Scenario = {
  id: 'cafe-order',
  title: 'Kaffee holen',
  context: 'Mia nimmt am Tresen die Bestellung auf.',
  contextLine: 'Vormittags · Café Nord',
  duration: '2 min',
  level: 'A2',
  hue: 62,
  character: { name: 'Mia', avatar: '🥐', status: 'Café Nord' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [{ text: 'Hallo!' }, { text: "[Was darf's sein?](was-darfs-sein)" }],
      responses: [
        { id: 'cappu', text: 'Einen Cappuccino, bitte.', next: 'milch' },
        { id: 'tipp', text: 'Was könnt ihr denn empfehlen?', next: 'empfehlung' },
        { id: 'filter', text: 'Einen Filterkaffee. Zum Mitnehmen, bitte.', next: 'dazu' },
      ],
    },

    empfehlung: {
      id: 'empfehlung',
      messages: [
        { text: 'Der Flat White läuft heute gut.' },
        { text: 'Und die Zimtschnecken sind gerade frisch aus dem Ofen 😌' },
      ],
      responses: [
        { id: 'flat', text: 'Dann einen Flat White, bitte.', next: 'milch' },
        { id: 'tee', text: 'Für mich was ohne Kaffee — habt ihr Tee?', next: 'tee' },
        { id: 'schnecke', text: 'Zimtschnecke auf jeden Fall. Und einen Espresso.', next: 'dazu' },
      ],
    },

    tee: {
      id: 'tee',
      messages: [{ text: 'Klar: Pfefferminz, Ingwer oder Chai.' }],
      responses: [
        { id: 'ingwer', text: 'Ingwer, bitte.', next: 'dazu' },
        { id: 'chai', text: "Chai. Mit Hafermilch, wenn's geht.", next: 'milch' },
        { id: 'du', text: 'Nimm du für mich 😄', next: 'dazu' },
      ],
    },

    milch: {
      id: 'milch',
      messages: [{ text: 'Gerne.' }, { text: 'Normale Milch oder Hafer?' }],
      responses: [
        { id: 'hafer', text: 'Hafer, bitte.', next: 'dazu' },
        { id: 'normal', text: 'Normal ist gut.', next: 'dazu' },
        { id: 'preis', text: 'Ist Hafer extra?', next: 'hafer-preis' },
      ],
    },

    'hafer-preis': {
      id: 'hafer-preis',
      messages: [
        { text: 'Fünfzig Cent.' },
        { text: "Wenn's dir zu viel ist: [macht nichts](macht-nichts), dann nehmen wir normale." },
      ],
      responses: [
        { id: 'trotzdem', text: 'Dann nehm ich Hafer trotzdem.', next: 'dazu' },
        { id: 'normal', text: 'Ach, dann lieber normal.', next: 'dazu' },
      ],
    },

    dazu: {
      id: 'dazu',
      messages: [
        { text: '[Sonst noch was?](sonst-noch-was) Wir hätten Zimtschnecken, Bananenbrot und belegte Brötchen.' },
      ],
      responses: [
        { id: 'schnecke', text: 'Eine Zimtschnecke, bitte.', next: 'hier-oder' },
        { id: 'nur', text: 'Danke, nur den Kaffee.', next: 'hier-oder' },
        { id: 'was', text: 'Was ist auf den Brötchen drauf?', next: 'broetchen' },
      ],
    },

    broetchen: {
      id: 'broetchen',
      messages: [
        { text: 'Käse, oder Hummus mit Gurke.' },
        { text: '[Ehrlich gesagt](ehrlich-gesagt) ist das mit Hummus besser 😄' },
      ],
      responses: [
        { id: 'hummus', text: 'Dann Hummus, bitte.', next: 'hier-oder' },
        { id: 'kaese', text: 'Käse ist auch ok.', next: 'hier-oder' },
        { id: 'nix', text: 'Nächstes Mal. Heute nur Kaffee.', next: 'hier-oder' },
      ],
    },

    'hier-oder': {
      id: 'hier-oder',
      messages: [{ text: '[Hier oder zum Mitnehmen?](hier-oder-zum-mitnehmen)' }],
      responses: [
        { id: 'mit', text: 'Zum Mitnehmen, bitte.', next: 'zahlen' },
        { id: 'hier', text: 'Ich bleib hier, ich hab Zeit.', next: 'zahlen' },
        { id: 'platz', text: 'Kommt drauf an — ist noch ein Platz frei?', next: 'platz' },
      ],
    },

    platz: {
      id: 'platz',
      messages: [{ text: 'Da hinten am Fenster wird gerade einer frei 🙂' }],
      responses: [
        { id: 'perfekt', text: 'Perfekt, danke.', next: 'zahlen' },
        { id: 'doch', text: 'Dann doch zum Mitnehmen, ich muss weiter.', next: 'zahlen' },
      ],
    },

    zahlen: {
      id: 'zahlen',
      messages: [{ text: 'Macht vier achtzig.' }, { text: 'Karte oder bar?' }],
      responses: [
        { id: 'karte', text: 'Karte, bitte.', next: 'karte' },
        { id: 'bar', text: "Bar. Moment, ich hab's passend." , next: 'bar' },
        { id: 'handy', text: 'Geht auch mit dem Handy?', next: 'karte' },
      ],
    },

    karte: {
      id: 'karte',
      messages: [
        { text: 'Klar, einmal auflegen.' },
        { text: "Danke! Ich [sag Bescheid](bescheid-sagen), wenn's fertig ist — zwei Minuten." },
      ],
      responses: [
        { id: 'gut', text: 'Alles gut, danke!', next: 'fertig' },
        { id: 'warte', text: 'Kein Stress, ich warte hier.', next: 'fertig' },
        { id: 'hinten', text: 'Ich sitz da hinten am Fenster.', next: 'fertig' },
      ],
    },

    bar: {
      id: 'bar',
      messages: [{ text: 'Danke dir.' }, { text: 'Und zwanzig Cent zurück.' }],
      responses: [
        { id: 'stimmt', text: 'Stimmt so 🙂', next: 'fertig' },
        { id: 'danke', text: 'Danke!', next: 'fertig' },
      ],
    },

    fertig: {
      id: 'fertig',
      messages: [{ text: 'Deiner ist fertig ☕' }, { text: 'Schönen Tag noch!' }],
      responses: [
        { id: 'gleichfalls', text: 'Danke, gleichfalls!', next: 'ende' },
        { id: 'bis', text: 'Danke dir! Bis nächste Woche 👋', next: 'ende' },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Bis dann 😊' }],
      responses: [],
    },
  },
}
