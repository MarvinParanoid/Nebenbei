import type { Scenario } from '../../types'

/** Small talk with a stranger at a party: who do you know, where are you from. */
export const partySmalltalk: Scenario = {
  id: 'party-smalltalk',
  title: 'Neben dem Kühlschrank',
  context: 'Sami spricht dich auf einer Party an.',
  contextLine: 'Samstagnacht · Neue Leute',
  duration: '4 min',
  level: 'B2',
  hue: 22,
  character: { name: 'Sami', avatar: '🎧', status: 'auf der Party' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [{ text: 'Hey, ich bin Sami.' }, { text: 'Bist du auch über Lena hier?' }],
      responses: [
        { id: 'arbeit', text: 'Ja, wir arbeiten zusammen.', next: 'arbeit' },
        { id: 'marc', text: 'Nee, ich kenne eigentlich nur den Gastgeber.', next: 'gastgeber' },
        { id: 'keineahnung', text: 'Ehrlich gesagt weiß ich nicht, wessen Party das ist 😄', next: 'wessen' },
      ],
    },

    arbeit: {
      id: 'arbeit',
      messages: [
        { text: '[Ach so](ach-so), dann bist du in dem Architekturbüro?' },
        { text: 'Lena erzählt viel davon.' },
      ],
      responses: [
        { id: 'genau', text: 'Genau. Seit anderthalb Jahren.', next: 'woher' },
        { id: 'nebenan', text: 'Nicht ganz — ich bin in der Firma nebenan 😄', next: 'woher' },
        { id: 'anderes', text: 'Ja, aber lass uns über was anderes reden 😄', next: 'woher' },
      ],
    },

    gastgeber: {
      id: 'gastgeber',
      messages: [
        { text: 'Ah, den Marc kenn ich auch [kaum](kaum).' },
        { text: 'Ich bin eigentlich nur wegen der Musik hier, ehrlich gesagt.' },
      ],
      responses: [
        { id: 'musik', text: 'Die ist wirklich gut. Wer legt auf?', next: 'musik' },
        { id: 'ich-auch', text: 'Bei mir ist es das Essen 😄', next: 'woher' },
        { id: 'kennen', text: 'Und woher kennst du Marc dann?', next: 'woher' },
      ],
    },

    wessen: {
      id: 'wessen',
      messages: [
        { text: 'Willkommen im Club 😄' },
        { text: 'Ich glaub, es ist Marcs Geburtstag. Oder Einzug. Irgendwas mit M.' },
      ],
      responses: [
        { id: 'lustig', text: 'Dann trinken wir einfach auf M 🥂', next: 'woher' },
        { id: 'fragen', text: 'Sollten wir vielleicht mal fragen?', next: 'woher' },
        { id: 'musik', text: 'Solange die Musik gut ist, egal.', next: 'musik' },
      ],
    },

    musik: {
      id: 'musik',
      messages: [
        { text: 'Marcs Bruder. Der macht das auch auf Hochzeiten 😄' },
        { text: 'Aber gute Playlist, muss man sagen.' },
      ],
      responses: [
        { id: 'ja', text: 'Wirklich gut. Ich hab schon zwei Songs gesucht.', next: 'woher' },
        { id: 'hochzeit', text: 'Deshalb kam vorhin dieser Schlager 😅', next: 'woher' },
      ],
    },

    woher: {
      id: 'woher',
      messages: [
        { text: 'Sag mal, wo kommst du eigentlich her?' },
        { text: 'Ich hör einen Akzent, aber [ich komm nicht drauf](drauf-kommen) 😄' },
      ],
      responses: [
        { id: 'russland', text: 'Aus Russland. Seit zwei Jahren hier.', next: 'wie-lange' },
        { id: 'raten', text: 'Rate mal 😄', next: 'raten' },
        { id: 'nichtvonhier', text: 'Von hier definitiv nicht 😄', next: 'wie-lange' },
      ],
    },

    raten: {
      id: 'raten',
      messages: [{ text: 'Polen? Nein… Tschechien?' }, { text: 'Ok, ich hör auf. Sag es mir 😄' }],
      responses: [
        { id: 'russland', text: 'Russland. Aber knapp dran.', next: 'wie-lange' },
        { id: 'spaeter', text: 'Später, wenn du mir was zu trinken holst 😄', next: 'wie-lange' },
      ],
    },

    'wie-lange': {
      id: 'wie-lange',
      messages: [
        { text: 'Und dein Deutsch ist schon so gut.' },
        { text: 'Wie hast du das gemacht — Kurs, oder einfach so [nebenbei](nebenbei)?' },
      ],
      responses: [
        { id: 'kurs', text: 'Kurs am Anfang, dann einfach viel geredet.', next: 'reden' },
        { id: 'serien', text: 'Serien, Kollegen und viele Fehler 😄', next: 'fehler' },
        { id: 'passiv', text: 'Ich versteh mehr, als ich sagen kann. Wie alle 😄', next: 'verstehen' },
      ],
    },

    reden: {
      id: 'reden',
      messages: [
        { text: 'Reden ist echt der Trick.' },
        { text: 'Ich hab in England gewohnt und drei Monate nur genickt 😄' },
      ],
      responses: [
        { id: 'kenne', text: 'Das Nicken kenn ich sehr gut.', next: 'stadt' },
        { id: 'wielange', text: 'Und wann hat es geklickt?', next: 'stadt' },
      ],
    },

    fehler: {
      id: 'fehler',
      messages: [
        { text: 'Fehler sind das Beste, ehrlich.' },
        { text: 'Ich hab mal in einer Bäckerei nach einem Brief statt einem Brot gefragt 😅' },
      ],
      responses: [
        { id: 'gut', text: 'Und, hast du einen bekommen?', next: 'stadt' },
        { id: 'meins', text: 'Ich hab mal „Rathaus" und „Nachhaus" verwechselt.', next: 'stadt' },
      ],
    },

    verstehen: {
      id: 'verstehen',
      messages: [
        { text: 'Das ist doch normal.' },
        { text: 'Und wenn du nicht weiterkommst, sagst du einfach „[wie heißt das nochmal](wie-heisst-das-nochmal)" — machen wir alle.' },
      ],
      responses: [
        { id: 'stimmt', text: 'Stimmt, das mach ich zu selten.', next: 'stadt' },
        { id: 'peinlich', text: 'Ist mir immer ein bisschen peinlich.', next: 'stadt' },
      ],
    },

    stadt: {
      id: 'stadt',
      messages: [{ text: 'Und [wie findest du](wie-findest-du) die Stadt so? Ehrlich.' }],
      responses: [
        { id: 'winter', text: 'Gut. Nur der Winter ist hart.', next: 'winter' },
        { id: 'leute', text: 'Die Leute brauchen lange, aber dann ist es echt.', next: 'leute' },
        { id: 'spaeter', text: 'Frag mich im Februar nochmal 😄', next: 'winter' },
      ],
    },

    winter: {
      id: 'winter',
      messages: [
        { text: 'Der Winter hier ist auch für uns hart 😄' },
        { text: 'Zwei Monate grau, dann tun alle so, als wäre nichts gewesen.' },
      ],
      responses: [
        { id: 'genau', text: 'Genau das meine ich.', next: 'weiter' },
        { id: 'sport', text: 'Ich hab angefangen zu schwimmen, das hilft.', next: 'weiter' },
      ],
    },

    leute: {
      id: 'leute',
      messages: [
        { text: 'Das trifft es ziemlich gut.' },
        { text: 'Dafür sagt hier keiner „wir müssen mal", wenn er es nicht meint.' },
      ],
      responses: [
        { id: 'stimmt', text: 'Das mag ich tatsächlich.', next: 'weiter' },
        { id: 'anfang', text: 'Am Anfang war es trotzdem einsam.', next: 'weiter' },
      ],
    },

    weiter: {
      id: 'weiter',
      messages: [
        { text: 'Sag mal, wir stehen hier seit zwanzig Minuten neben dem Kühlschrank 😄' },
        { text: 'Willst du was trinken? Ich hol mir was.' },
      ],
      responses: [
        { id: 'ja', text: 'Gerne. Was ohne Alkohol, wenn es was gibt.', next: 'trinken' },
        { id: 'mit', text: 'Ich komm mit, dann seh ich, was da ist.', next: 'trinken' },
        { id: 'los', text: 'Ich muss eigentlich gleich los, ehrlich gesagt.', next: 'los' },
      ],
    },

    trinken: {
      id: 'trinken',
      messages: [
        { text: 'Perfekt.' },
        { text: 'Und danach stell ich dich Marc vor — dann weißt du auch, wessen Party das ist 😄' },
      ],
      responses: [
        { id: 'endlich', text: 'Endlich 😄', next: 'ende' },
        { id: 'gerne', text: 'Sehr gerne.', next: 'ende' },
      ],
    },

    los: {
      id: 'los',
      messages: [
        { text: 'Schade! Aber ich versteh das.' },
        { text: 'Wir sehen uns bestimmt nochmal — [war echt nett](war-nett).' },
      ],
      responses: [
        { id: 'auch', text: 'Fand ich auch. Bis dann!', next: 'ende' },
        { id: 'lena', text: 'Grüß Lena von mir 👋', next: 'ende' },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Bis dann! 👋' }],
      responses: [],
    },
  },
}
