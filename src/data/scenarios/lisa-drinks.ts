import type { Scenario } from '../../types'

/**
 * Freitagabend. Lisa asks whether you're joining for drinks.
 * Branches on "yes / maybe / not today" and converges again at the end.
 */
export const lisaDrinks: Scenario = {
  id: 'lisa-drinks',
  title: 'Kurz was trinken?',
  context: 'Lisa fragt, ob du heute Abend mitkommst.',
  contextLine: 'Freitagabend · Freunde treffen',
  duration: '2 min',
  level: 'B1',
  hue: 268,
  character: { name: 'Lisa', avatar: '🌿', status: 'Freitag, 18:12' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey 😊' },
        {
          text: 'Bist du heute Abend [dabei](dabei-sein)? Wir wollten [so gegen 8](so-gegen-acht) noch was trinken gehen.',
        },
      ],
      responses: [
        { id: 'ja', text: 'Klar, bin dabei! Wo trefft ihr euch?', next: 'ort' },
        { id: 'nein', text: "Heute schaff ich's leider nicht. Morgen vielleicht?", next: 'nein' },
        { id: 'wer', text: 'Kommt drauf an 😄 Wer kommt denn alles?', next: 'wer' },
      ],
    },

    wer: {
      id: 'wer',
      messages: [
        { text: '[Keine Ahnung](keine-ahnung), ob Tim kommt. Ich, Jonas und Mira auf jeden Fall.' },
        { text: 'Nichts Großes, wir wollen einfach [ein bisschen](ein-bisschen) quatschen.' },
      ],
      responses: [
        { id: 'gut', text: 'Klingt gut, dann bin ich dabei.', next: 'ort' },
        { id: 'mira', text: 'Ah, Mira ist auch da? Dann komm ich 🙂', next: 'ort' },
        { id: 'raus', text: 'Ich glaub, ich lass es heute. Bin echt müde.', next: 'nein' },
      ],
    },

    ort: {
      id: 'ort',
      messages: [
        { text: 'Super 🙌' },
        { text: "Wir sind im Kaverne, das kleine Café in der Wagnerstraße. Kennst du's?" },
      ],
      responses: [
        { id: 'nie', text: "Noch nie gehört, aber ich find's schon.", next: 'hinkommen' },
        { id: 'kenne', text: 'Ja klar, war letzte Woche da. Ist echt nett.', next: 'kennt' },
        {
          id: 'standort',
          text: 'Schick mir am besten den Standort, ich bin schlecht mit Straßennamen 😅',
          next: 'hinkommen',
        },
      ],
    },

    kennt: {
      id: 'kennt',
      messages: [
        { text: 'Dann weißt du ja, wie gut die Limo da ist ☺️' },
        { text: 'Ich reserviere was draußen, ist ja noch warm. Oder lieber drinnen?' },
      ],
      responses: [
        { id: 'draussen', text: 'Draußen ist perfekt.', next: 'zeit' },
        { id: 'drinnen', text: 'Lieber drinnen, mir wird abends immer kalt.', next: 'zeit' },
        { id: 'egal', text: 'Mir egal, ich setz mich einfach dazu 😄', next: 'zeit' },
      ],
    },

    hinkommen: {
      id: 'hinkommen',
      messages: [
        { text: 'Mach ich, schick ich dir [gleich](gleich) 👍' },
        { text: 'Kommst du mit dem Rad oder mit der Bahn?' },
      ],
      responses: [
        { id: 'rad', text: 'Mit dem Rad, sind ja nur zehn Minuten.', next: 'zeit' },
        {
          id: 'bahn',
          text: "Bahn. Kann also sein, dass ich fünf Minuten später bin.",
          next: 'spaeter',
        },
        { id: 'weissnicht', text: "Weiß ich noch nicht, ich schau wie's Wetter wird.", next: 'zeit' },
      ],
    },

    zeit: {
      id: 'zeit',
      messages: [
        { text: 'Alles klar.' },
        { text: '[Passt dir](passt-mir-gut) acht, oder ist das zu früh nach der Arbeit?' },
      ],
      responses: [
        { id: 'acht', text: 'Acht passt mir gut.', next: 'wer-noch' },
        { id: 'halbneun', text: 'Mach lieber halb neun, dann komm ich in Ruhe hin.', next: 'spaeter' },
        { id: 'knapp', text: "Ich versuch's um acht, kann aber knapp werden.", next: 'spaeter' },
      ],
    },

    spaeter: {
      id: 'spaeter',
      messages: [
        { text: '[Kein Stress](kein-stress), wir [sitzen](rumsitzen) eh erst mal nur rum.' },
        { text: 'Sollen wir vorher noch was essen, oder hast du schon?' },
      ],
      responses: [
        { id: 'schon', text: 'Hab schon gegessen, aber danke!', next: 'wer-noch' },
        { id: 'kleines', text: 'Auf was Kleines hätt ich schon Lust.', next: 'essen' },
        { id: 'hunger', text: 'Ehrlich gesagt hab ich richtig Hunger 😄', next: 'essen' },
      ],
    },

    'wer-noch': {
      id: 'wer-noch',
      messages: [
        { text: 'Ach, Jonas bringt vielleicht seinen Mitbewohner mit — [mal schauen](mal-schauen).' },
        { text: 'Der ist ganz nett, redet [halt](halt) viel 😄' },
      ],
      responses: [
        { id: 'zuhoeren', text: 'Kein Problem, ich hör gern zu.', next: 'essen' },
        { id: 'arbeit', text: 'Solange er nicht die ganze Zeit über Arbeit redet 😄', next: 'essen' },
        { id: 'wer', text: 'Keine Ahnung, wen du meinst — aber ok!', next: 'essen' },
      ],
    },

    essen: {
      id: 'essen',
      messages: [
        { text: 'Die haben da so Bowls und ziemlich gute Sandwiches.' },
        { text: 'Ich nehm [auf jeden Fall](auf-jeden-fall) was. Und trinken? Wein, Bier, oder [was ohne](was-ohne)?' },
      ],
      responses: [
        { id: 'bier', text: 'Ein Bier klingt gut nach der Woche.', next: 'getraenk' },
        { id: 'ohne', text: 'Für mich was ohne, ich fahr noch.', next: 'getraenk' },
        { id: 'vorort', text: 'Mal schauen, ich entscheide vor Ort 😄', next: 'getraenk' },
      ],
    },

    getraenk: {
      id: 'getraenk',
      messages: [
        { text: 'Perfekt.' },
        { text: 'Dann bis nachher! Ich bin ab acht da — [sag einfach Bescheid](bescheid-sagen), wenn du davor stehst.' },
      ],
      responses: [
        { id: 'bis', text: 'Bis nachher! 👋', next: 'ende' },
        { id: 'freu', text: 'Alles klar, bis dann. Freu mich!', next: 'ende' },
        { id: 'duschen', text: 'Bin gleich da, muss nur noch duschen 😄', next: 'ende' },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Bis später ✌️' }],
      responses: [],
    },

    // ——— "heute nicht" ———

    nein: {
      id: 'nein',
      messages: [
        { text: 'Schade! Aber [kein Stress](kein-stress).' },
        { text: 'Morgen wär auch noch [was drin](drin-sein). [Wie sieht\'s bei dir aus?](wie-siehts-bei-dir-aus)' },
      ],
      responses: [
        { id: 'morgen', text: 'Morgen könnte klappen, eher abends.', next: 'morgen' },
        { id: 'woche', text: 'Morgen bin ich verplant. Nächste Woche?', next: 'naechste-woche' },
        { id: 'spontan', text: 'Schreib mir einfach spontan, mal schauen.', next: 'spontan' },
      ],
    },

    morgen: {
      id: 'morgen',
      messages: [
        { text: 'Ok, dann sag ich Jonas Bescheid.' },
        { text: 'Wollen wir dann was essen, oder wieder nur was trinken?' },
      ],
      responses: [
        { id: 'essen', text: 'Essen wär schön, ich koch die ganze Woche selbst 😄', next: 'morgen-plan' },
        { id: 'trinken', text: 'Nur was trinken, das reicht mir völlig.', next: 'morgen-plan' },
        { id: 'preis', text: "Kommt drauf an, wie teuer's wird, ehrlich gesagt.", next: 'morgen-plan' },
      ],
    },

    'morgen-plan': {
      id: 'morgen-plan',
      messages: [
        { text: 'Passt. Ich such was raus und schick es dir.' },
        { text: 'Irgendwas in der Nähe, damit du nicht durch die halbe Stadt musst.' },
      ],
      responses: [
        { id: 'danke', text: 'Perfekt, danke dir!', next: 'heute-abend' },
        { id: 'weiter', text: 'Mir egal, ich fahr auch mal weiter.', next: 'heute-abend' },
        { id: 'laden', text: 'Hauptsache nicht wieder der Laden vom letzten Mal 😄', next: 'heute-abend' },
      ],
    },

    'heute-abend': {
      id: 'heute-abend',
      messages: [
        { text: 'Und heute Abend? [Hast du noch was vor](was-vorhaben), oder wird es einfach Couch?' },
      ],
      responses: [
        { id: 'couch', text: 'Couch, ganz klar 😌', next: 'couch' },
        { id: 'arbeit', text: 'Ich muss noch was fertig machen für die Arbeit.', next: 'couch' },
        { id: 'sport', text: 'Sport, dann Couch. So der Plan.', next: 'couch' },
      ],
    },

    couch: {
      id: 'couch',
      messages: [
        { text: '[Ehrlich gesagt](ehrlich-gesagt) klingt das nach einem guten Freitag.' },
        { text: 'Ich hab die Woche kaum geschlafen, bin auch echt [platt](platt-sein).' },
      ],
      responses: [
        { id: 'eins', text: 'Dann trink halt nur eins 😄', next: 'tail' },
        { id: 'warum', text: 'Warum gehst du dann überhaupt raus?', next: 'warum' },
        { id: 'genauso', text: 'Geht mir genauso. Nächste Woche wird besser.', next: 'tail' },
      ],
    },

    warum: {
      id: 'warum',
      messages: [
        { text: 'Gute Frage 😅' },
        { text: 'Weil ich Jonas seit drei Wochen nicht gesehen hab. Und weil ich zu Hause eh nur Serien schau.' },
      ],
      responses: [
        { id: 'vernuenftig', text: 'Sehr vernünftig 😄', next: 'tail' },
        { id: 'auchwas', text: 'Serien sind doch auch was.', next: 'tail' },
      ],
    },

    'naechste-woche': {
      id: 'naechste-woche',
      messages: [
        { text: 'Klar, nächste Woche geht auch.' },
        { text: 'Ich schreib in die Gruppe, dann finden wir was. [Unter der Woche](unter-der-woche) ist es eh ruhiger.' },
      ],
      responses: [
        { id: 'danke', text: 'Super, danke dir!', next: 'heute-abend' },
        { id: 'dienstag', text: 'Am besten Dienstag oder Mittwoch.', next: 'heute-abend' },
        { id: 'montag', text: 'Nur nicht Montag 😅', next: 'heute-abend' },
      ],
    },

    spontan: {
      id: 'spontan',
      messages: [
        { text: 'Mach ich 👍' },
        { text: 'Aber [sag Bescheid](bescheid-sagen), ja? Sonst denk ich wieder, du hast keine [Lust](lust-haben) auf uns 😄' },
      ],
      responses: [
        { id: 'quatsch', text: 'Quatsch, klar hab ich Lust. Ich sag Bescheid.', next: 'heute-abend' },
        { id: 'morgenfrueh', text: 'Ich schreib dir morgen früh, versprochen.', next: 'heute-abend' },
        { id: 'zeit', text: 'Ich hab immer Lust, nur nie Zeit 😅', next: 'heute-abend' },
      ],
    },

    tail: {
      id: 'tail',
      messages: [
        { text: 'Alles gut, wir kriegen das hin.' },
        { text: 'Dann erhol dich mal. Bis bald!' },
      ],
      responses: [
        { id: 'spass', text: 'Danke, dir viel Spaß nachher! 👋', next: 'ende-nein' },
        { id: 'gruesse', text: 'Bis bald! Grüß die anderen von mir.', next: 'ende-nein' },
        { id: 'mittrinken', text: 'Ja, bis bald. Und trinkt einen für mich mit 😄', next: 'ende-nein' },
      ],
    },

    'ende-nein': {
      id: 'ende-nein',
      messages: [{ text: 'Mach ich 😄 Bis dann!' }],
      responses: [],
    },
  },
}
