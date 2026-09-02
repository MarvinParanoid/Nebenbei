import type { Scenario } from '../../types'

/** A coworker asks you to cover a meeting, then suggests lunch. */
export const coworkerFavor: Scenario = {
  id: 'coworker-favor',
  title: 'Kannst du das übernehmen?',
  context: 'Tobi braucht jemanden für morgen.',
  contextLine: 'Dienstag · Kollege',
  duration: '3 min',
  level: 'B1',
  hue: 210,
  character: { name: 'Tobi', avatar: '💻', status: 'im Büro' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: '[Moin](moin)! [Alles gut](alles-gut) bei dir?' },
        { text: 'Hast du kurz zwei Minuten?' },
      ],
      responses: [
        { id: 'klar', text: "Ja klar, was gibt's?", next: 'frage' },
        { id: 'stress', text: 'Bin gerade im Stress. In einer halben Stunde?', next: 'spaeter' },
        { id: 'schlimm', text: 'Kommt drauf an 😄 Ist es schlimm?', next: 'schlimm' },
      ],
    },

    frage: {
      id: 'frage',
      messages: [
        { text: 'Morgen um zehn ist der Termin mit Frau Kraus.' },
        { text: 'Ich hab parallel den Workshop und bin eh [im Stress](im-stress-sein). Kannst du den übernehmen?' },
      ],
      responses: [
        { id: 'ja', text: 'Klar, mach ich.', next: 'zusage' },
        { id: 'nein', text: 'Morgen zehn ist bei mir schlecht, ehrlich gesagt.', next: 'absage' },
        { id: 'details', text: "Worum geht's da überhaupt?", next: 'details' },
      ],
    },

    spaeter: {
      id: 'spaeter',
      messages: [
        { text: 'Passt, ich [melde mich](sich-melden) nachher nochmal.' },
        { text: 'Ganz kurz nur: morgen zehn Uhr, Termin mit Frau Kraus. Kannst du?' },
      ],
      responses: [
        { id: 'ja', text: 'Ja, das geht.', next: 'zusage' },
        { id: 'nein', text: 'Morgen zehn leider nicht.', next: 'absage' },
        { id: 'details', text: 'Schreib mir die Details, dann sag ich dir Bescheid.', next: 'details' },
      ],
    },

    schlimm: {
      id: 'schlimm',
      messages: [
        { text: 'Nein nein, gar nicht schlimm 😄' },
        { text: 'Ich brauch nur jemanden für morgen zehn Uhr, Termin mit Frau Kraus.' },
      ],
      responses: [
        { id: 'ja', text: 'Kann ich machen.', next: 'zusage' },
        { id: 'nein', text: 'Zehn ist bei mir schlecht.', next: 'absage' },
        { id: 'details', text: 'Und worum geht es?', next: 'details' },
      ],
    },

    details: {
      id: 'details',
      messages: [
        { text: 'Nur das Update zum Angebot.' },
        { text: 'Sie will wissen, ob wir bis Ende des Monats liefern können. Dauert höchstens zwanzig Minuten.' },
      ],
      responses: [
        { id: 'ok', text: 'Ok, dann mach ich das.', next: 'zusage' },
        { id: 'preis', text: 'Und was sag ich, wenn sie nach dem Preis fragt?', next: 'preis' },
        { id: 'zwanzig', text: 'Zwanzig Minuten sagt man immer 😄 Aber ok.', next: 'zusage' },
      ],
    },

    preis: {
      id: 'preis',
      messages: [
        { text: 'Sag einfach, das klärt sie mit mir.' },
        { text: 'Ich schick dir vorher die Zahlen, dann bist du [im Bild](im-bild-sein).' },
      ],
      responses: [
        { id: 'gut', text: 'Perfekt, dann bin ich dabei.', next: 'zusage' },
        { id: 'heute', text: 'Schick sie mir bis heute Abend, ja?', next: 'zusage' },
      ],
    },

    absage: {
      id: 'absage',
      messages: [{ text: 'Ach schade.' }, { text: 'Und übermorgen? Sie ist flexibel.' }],
      responses: [
        { id: 'uebermorgen', text: 'Übermorgen geht.', next: 'zusage' },
        { id: 'woche', text: "Diese Woche wird's echt nichts bei mir.", next: 'verschieben' },
        { id: 'sandra', text: 'Frag mal Sandra, die kennt das Thema auch.', next: 'sandra' },
      ],
    },

    verschieben: {
      id: 'verschieben',
      messages: [
        { text: 'Ok, dann verschieb ich den Termin einfach.' },
        { text: 'Kein Stress, [das kriegen wir hin](das-kriegen-wir-hin).' },
      ],
      responses: [
        { id: 'danke', text: 'Danke für dein Verständnis.', next: 'mittag' },
        { id: 'naechste', text: 'Nächste Woche übernehm ich dafür was, versprochen.', next: 'mittag' },
      ],
    },

    sandra: {
      id: 'sandra',
      messages: [{ text: 'Gute Idee, die frag ich mal.' }, { text: 'Danke trotzdem 🙂' }],
      responses: [
        { id: 'nix', text: 'Kein Ding.', next: 'mittag' },
        { id: 'sagbescheid', text: "Sag mir, wenn's bei ihr auch nicht klappt.", next: 'mittag' },
      ],
    },

    zusage: {
      id: 'zusage',
      messages: [
        { text: 'Super, danke dir 🙏' },
        { text: 'Ich schick dir gleich die Notizen von letzter Woche.' },
      ],
      responses: [
        { id: 'ok', text: 'Alles klar.', next: 'termin-details' },
        { id: 'notizen', text: 'Brauch ich noch was außer den Notizen?', next: 'notizen' },
        { id: 'kaffee', text: 'Kein Ding. Du schuldest mir einen Kaffee 😄', next: 'kaffee' },
      ],
    },

    notizen: {
      id: 'notizen',
      messages: [
        { text: 'Nein, die reichen.' },
        { text: 'Und wenn was ist, ruf einfach an. Ich bin im Workshop, aber ich geh raus.' },
      ],
      responses: [
        { id: 'gut', text: 'Alles gut, danke.', next: 'termin-details' },
        { id: 'morgen', text: 'Ok, dann bis morgen.', next: 'termin-details' },
      ],
    },

    kaffee: {
      id: 'kaffee',
      messages: [{ text: 'Zwei sogar 😄' }, { text: 'Ich hol dir gleich einen mit.' }],
      responses: [
        { id: 'gerne', text: 'Sehr gerne.', next: 'termin-details' },
        { id: 'automat', text: 'Danke! Aber nicht den aus dem Automaten 😅', next: 'termin-details' },
      ],
    },

    'termin-details': {
      id: 'termin-details',
      messages: [
        { text: 'Ach, eins noch: der Termin ist im kleinen Raum, nicht bei ihr im Büro.' },
        { text: 'Zehn Uhr, zwanzig Minuten, dann hast du Ruhe 😄' },
      ],
      responses: [
        { id: 'notiert', text: 'Notiert. Kleiner Raum, zehn Uhr.', next: 'mittag' },
        { id: 'lang', text: 'Und wenn sie länger reden will?', next: 'lang' },
        { id: 'unterlagen', text: 'Braucht sie was Ausgedrucktes?', next: 'mittag' },
      ],
    },

    lang: {
      id: 'lang',
      messages: [
        { text: 'Dann sagst du einfach, du hast um elf den nächsten Termin 😄' },
        { text: 'Und wenn du was nicht weißt: „Das schau ich nach und [melde mich](sich-melden)."' },
      ],
      responses: [
        { id: 'gut', text: 'Guter Satz, den merk ich mir.', next: 'mittag' },
        { id: 'ok', text: 'Alles klar, dann passt das.', next: 'mittag' },
      ],
    },

    mittag: {
      id: 'mittag',
      messages: [{ text: '[Sag mal](sag-mal), gehst du heute Mittag essen?' }],
      responses: [
        { id: 'ja', text: 'Ja, so gegen halb eins.', next: 'mittag-wohin' },
        { id: 'mit', text: 'Ich hab was mit, aber ich komm mit.', next: 'mittag-wohin' },
        { id: 'nein', text: 'Heute nicht, ich muss durcharbeiten.', next: 'durch' },
      ],
    },

    'mittag-wohin': {
      id: 'mittag-wohin',
      messages: [
        { text: 'Perfekt, dann sag ich Sandra Bescheid.' },
        { text: 'Der Italiener, oder [was Schnelles](was-schnelles)?' },
      ],
      responses: [
        { id: 'italiener', text: 'Italiener klingt gut.', next: 'ende' },
        { id: 'schnell', text: 'Was Schnelles, ich hab um zwei einen Call.', next: 'ende' },
        { id: 'egal', text: 'Mir egal, entscheidet ihr 😄', next: 'ende' },
      ],
    },

    durch: {
      id: 'durch',
      messages: [
        { text: 'Ok, aber mach wenigstens kurz Pause, ja?' },
        { text: 'Und heute pünktlich [Feierabend](feierabend). Du warst die ganze Woche zu lang da.' },
      ],
      responses: [
        { id: 'mama', text: 'Ja, Mama 😄', next: 'ende' },
        { id: 'versuch', text: "Ich versuch's. Danke dir.", next: 'ende' },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Bis später! Und danke nochmal 🙏' }],
      responses: [],
    },
  },
}
