import type { Scenario } from '../../types'

/** A coworker asks you to cover a meeting, then suggests lunch. */
export const coworkerFavor: Scenario = {
  id: 'coworker-favor',
  title: 'Kannst du das übernehmen?',
  context: 'Tobi braucht jemanden für morgen.',
  contextLine: 'Dienstag · Kollege',
  duration: '3 min',
  level: 'B1',
  character: { name: 'Tobi', status: 'im Büro' },
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          text: '[Moin](moin)! [Alles gut](alles-gut) bei dir?',
          ru: 'Привет! У тебя всё нормально?',
        },
        { text: 'Hast du kurz zwei Minuten?', ru: 'У тебя есть две минуты?' },
      ],
      responses: [
        {
          id: 'klar',
          text: "Ja klar, was gibt's?",
          ru: 'Да, конечно, что случилось?',
          next: 'frage',
        },
        {
          id: 'stress',
          text: 'Bin gerade im Stress. In einer halben Stunde?',
          ru: 'Я сейчас в запаре. Через полчаса?',
          next: 'spaeter',
        },
        {
          id: 'schlimm',
          text: 'Kommt drauf an 😄 Ist es schlimm?',
          ru: 'Смотря как 😄 Всё плохо?',
          next: 'schlimm',
        },
      ],
    },

    frage: {
      id: 'frage',
      messages: [
        {
          text: 'Morgen um zehn ist der Termin mit Frau Kraus.',
          ru: 'Завтра в десять встреча с фрау Краус.',
        },
        {
          text: 'Ich hab parallel den Workshop und bin eh [im Stress](im-stress-sein). Kannst du den übernehmen?',
          ru: 'У меня параллельно воркшоп, и я всё равно в запаре. Можешь взять её на себя?',
        },
      ],
      responses: [
        { id: 'ja', text: 'Klar, mach ich.', ru: 'Конечно, сделаю.', next: 'zusage' },
        {
          id: 'nein',
          text: 'Morgen zehn ist bei mir schlecht, ehrlich gesagt.',
          ru: 'Завтра в десять мне неудобно, честно говоря.',
          next: 'absage',
        },
        {
          id: 'details',
          text: "Worum geht's da überhaupt?",
          ru: 'А о чём там вообще речь?',
          next: 'details',
        },
      ],
    },

    spaeter: {
      id: 'spaeter',
      messages: [
        {
          text: 'Passt, ich [melde mich](sich-melden) nachher nochmal.',
          ru: 'Хорошо, я напишу тебе позже ещё раз.',
        },
        {
          text: 'Ganz kurz nur: morgen zehn Uhr, Termin mit Frau Kraus. Kannst du?',
          ru: 'Совсем коротко: завтра в десять, встреча с фрау Краус. Сможешь?',
        },
      ],
      responses: [
        { id: 'ja', text: 'Ja, das geht.', ru: 'Да, это подойдёт.', next: 'zusage' },
        {
          id: 'nein',
          text: 'Morgen zehn leider nicht.',
          ru: 'Завтра в десять, к сожалению, нет.',
          next: 'absage',
        },
        {
          id: 'details',
          text: 'Schreib mir die Details, dann sag ich dir Bescheid.',
          ru: 'Напиши мне детали, тогда я дам знать.',
          next: 'details',
        },
      ],
    },

    schlimm: {
      id: 'schlimm',
      messages: [
        { text: 'Nein nein, gar nicht schlimm 😄', ru: 'Нет-нет, совсем не плохо 😄' },
        {
          text: 'Ich brauch nur jemanden für morgen zehn Uhr, Termin mit Frau Kraus.',
          ru: 'Мне просто нужен кто-то на завтра на десять, встреча с фрау Краус.',
        },
      ],
      responses: [
        { id: 'ja', text: 'Kann ich machen.', ru: 'Могу взять.', next: 'zusage' },
        {
          id: 'nein',
          text: 'Zehn ist bei mir schlecht.',
          ru: 'В десять мне неудобно.',
          next: 'absage',
        },
        { id: 'details', text: 'Und worum geht es?', ru: 'А о чём речь?', next: 'details' },
      ],
    },

    details: {
      id: 'details',
      messages: [
        { text: 'Nur das Update zum Angebot.', ru: 'Только апдейт по предложению.' },
        {
          text: 'Sie will wissen, ob wir bis Ende des Monats liefern können. Dauert höchstens zwanzig Minuten.',
          ru: 'Она хочет знать, сможем ли мы поставить до конца месяца. Займёт максимум двадцать минут.',
        },
      ],
      responses: [
        { id: 'ok', text: 'Ok, dann mach ich das.', ru: 'Ок, тогда я это сделаю.', next: 'zusage' },
        {
          id: 'preis',
          text: 'Und was sag ich, wenn sie nach dem Preis fragt?',
          ru: 'А что мне говорить, если она спросит про цену?',
          next: 'preis',
        },
        {
          id: 'zwanzig',
          text: 'Zwanzig Minuten sagt man immer 😄 Aber ok.',
          ru: 'Двадцать минут говорят всегда 😄 Но ладно.',
          next: 'zusage',
        },
      ],
    },

    preis: {
      id: 'preis',
      messages: [
        {
          text: 'Sag einfach, das klärt sie mit mir.',
          ru: 'Просто скажи, что это она выясняет со мной.',
        },
        {
          text: 'Ich schick dir vorher die Zahlen, dann bist du [im Bild](im-bild-sein).',
          ru: 'Я заранее пришлю тебе цифры, тогда будешь в курсе.',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Perfekt, dann bin ich dabei.',
          ru: 'Отлично, тогда я в деле.',
          next: 'zusage',
        },
        {
          id: 'heute',
          text: 'Schick sie mir bis heute Abend, ja?',
          ru: 'Пришли их до сегодняшнего вечера, хорошо?',
          next: 'zusage',
        },
      ],
    },

    absage: {
      id: 'absage',
      messages: [
        { text: 'Ach schade.', ru: 'Ах, жалко.' },
        { text: 'Und übermorgen? Sie ist flexibel.', ru: 'А послезавтра? Она гибкая.' },
      ],
      responses: [
        { id: 'uebermorgen', text: 'Übermorgen geht.', ru: 'Послезавтра можно.', next: 'zusage' },
        {
          id: 'woche',
          text: "Diese Woche wird's echt nichts bei mir.",
          ru: 'На этой неделе у меня реально ничего не выйдет.',
          next: 'verschieben',
        },
        {
          id: 'sandra',
          text: 'Frag mal Sandra, die kennt das Thema auch.',
          ru: 'Спроси Сандру, она тоже знает эту тему.',
          next: 'sandra',
        },
      ],
    },

    verschieben: {
      id: 'verschieben',
      messages: [
        {
          text: 'Ok, dann verschieb ich den Termin einfach.',
          ru: 'Ок, тогда я просто перенесу встречу.',
        },
        {
          text: 'Kein Stress, [das kriegen wir hin](das-kriegen-wir-hin).',
          ru: 'Без напряга, мы это уладим.',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Danke für dein Verständnis.',
          ru: 'Спасибо за понимание.',
          next: 'mittag',
        },
        {
          id: 'naechste',
          text: 'Nächste Woche übernehm ich dafür was, versprochen.',
          ru: 'На следующей неделе я взамен что-нибудь возьму, обещаю.',
          next: 'mittag',
        },
      ],
    },

    sandra: {
      id: 'sandra',
      messages: [
        { text: 'Gute Idee, die frag ich mal.', ru: 'Хорошая идея, спрошу её.' },
        { text: 'Danke trotzdem 🙂', ru: 'Спасибо всё равно 🙂' },
      ],
      responses: [
        { id: 'nix', text: 'Kein Ding.', ru: 'Не вопрос.', next: 'mittag' },
        {
          id: 'sagbescheid',
          text: "Sag mir, wenn's bei ihr auch nicht klappt.",
          ru: 'Скажи мне, если у неё тоже не получится.',
          next: 'mittag',
        },
      ],
    },

    zusage: {
      id: 'zusage',
      messages: [
        { text: 'Super, danke dir 🙏', ru: 'Супер, спасибо тебе 🙏' },
        {
          text: 'Ich schick dir gleich die Notizen von letzter Woche.',
          ru: 'Сейчас пришлю тебе заметки с прошлой недели.',
        },
      ],
      responses: [
        { id: 'ok', text: 'Alles klar.', ru: 'Всё понятно.', next: 'termin-details' },
        {
          id: 'notizen',
          text: 'Brauch ich noch was außer den Notizen?',
          ru: 'Мне нужно что-то ещё кроме заметок?',
          next: 'notizen',
        },
        {
          id: 'kaffee',
          text: 'Kein Ding. Du schuldest mir einen Kaffee 😄',
          ru: 'Не вопрос. С тебя кофе 😄',
          next: 'kaffee',
        },
      ],
    },

    notizen: {
      id: 'notizen',
      messages: [
        { text: 'Nein, die reichen.', ru: 'Нет, их достаточно.' },
        {
          text: 'Und wenn was ist, ruf einfach an. Ich bin im Workshop, aber ich geh raus.',
          ru: 'И если что — просто позвони. Я на воркшопе, но выйду.',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Alles gut, danke.',
          ru: 'Всё хорошо, спасибо.',
          next: 'termin-details',
        },
        {
          id: 'morgen',
          text: 'Ok, dann bis morgen.',
          ru: 'Ок, тогда до завтра.',
          next: 'termin-details',
        },
      ],
    },

    kaffee: {
      id: 'kaffee',
      messages: [
        { text: 'Zwei sogar 😄', ru: 'Даже два 😄' },
        { text: 'Ich hol dir gleich einen mit.', ru: 'Сейчас захвачу тебе один.' },
      ],
      responses: [
        { id: 'gerne', text: 'Sehr gerne.', ru: 'С удовольствием.', next: 'termin-details' },
        {
          id: 'automat',
          text: 'Danke! Aber nicht den aus dem Automaten 😅',
          ru: 'Спасибо! Только не из автомата 😅',
          next: 'termin-details',
        },
      ],
    },

    'termin-details': {
      id: 'termin-details',
      messages: [
        {
          text: 'Ach, eins noch: der Termin ist im kleinen Raum, nicht bei ihr im Büro.',
          ru: 'Ах да, ещё одно: встреча в маленькой переговорке, не у неё в кабинете.',
        },
        {
          text: 'Zehn Uhr, zwanzig Minuten, dann hast du Ruhe 😄',
          ru: 'Десять часов, двадцать минут — и ты свободен 😄',
        },
      ],
      responses: [
        {
          id: 'notiert',
          text: 'Notiert. Kleiner Raum, zehn Uhr.',
          ru: 'Записал. Маленькая переговорка, десять.',
          next: 'mittag',
        },
        {
          id: 'lang',
          text: 'Und wenn sie länger reden will?',
          ru: 'А если она захочет говорить дольше?',
          next: 'lang',
        },
        {
          id: 'unterlagen',
          text: 'Braucht sie was Ausgedrucktes?',
          ru: 'Ей нужно что-то распечатанное?',
          next: 'mittag',
        },
      ],
    },

    lang: {
      id: 'lang',
      messages: [
        {
          text: 'Dann sagst du einfach, du hast um elf den nächsten Termin 😄',
          ru: 'Тогда просто скажи, что у тебя в одиннадцать следующая встреча 😄',
        },
        {
          text: 'Und wenn du was nicht weißt: „Das schau ich nach und [melde mich](sich-melden)."',
          ru: 'А если чего-то не знаешь: «Я посмотрю и сообщу вам».',
        },
      ],
      responses: [
        {
          id: 'gut',
          text: 'Guter Satz, den merk ich mir.',
          ru: 'Хорошая фраза, запомню.',
          next: 'mittag',
        },
        {
          id: 'ok',
          text: 'Alles klar, dann passt das.',
          ru: 'Всё ясно, тогда порядок.',
          next: 'mittag',
        },
      ],
    },

    mittag: {
      id: 'mittag',
      messages: [
        {
          text: '[Sag mal](sag-mal), gehst du heute Mittag essen?',
          ru: 'Слушай, ты идёшь сегодня обедать?',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Ja, so gegen halb eins.',
          ru: 'Да, где-то в полпервого.',
          next: 'mittag-wohin',
        },
        {
          id: 'mit',
          text: 'Ich hab was mit, aber ich komm mit.',
          ru: 'У меня с собой, но я пойду с вами.',
          next: 'mittag-wohin',
        },
        {
          id: 'nein',
          text: 'Heute nicht, ich muss durcharbeiten.',
          ru: 'Сегодня нет, мне надо работать без перерыва.',
          next: 'durch',
        },
      ],
    },

    'mittag-wohin': {
      id: 'mittag-wohin',
      messages: [
        { text: 'Perfekt, dann sag ich Sandra Bescheid.', ru: 'Отлично, тогда я скажу Сандре.' },
        {
          text: 'Der Italiener, oder [was Schnelles](was-schnelles)?',
          ru: 'К итальянцу или что-нибудь быстрое?',
        },
      ],
      responses: [
        {
          id: 'italiener',
          text: 'Italiener klingt gut.',
          ru: 'Итальянец звучит хорошо.',
          next: 'ende',
        },
        {
          id: 'schnell',
          text: 'Was Schnelles, ich hab um zwei einen Call.',
          ru: 'Что-нибудь быстрое, у меня в два созвон.',
          next: 'ende',
        },
        {
          id: 'egal',
          text: 'Mir egal, entscheidet ihr 😄',
          ru: 'Мне всё равно, решайте вы 😄',
          next: 'ende',
        },
      ],
    },

    durch: {
      id: 'durch',
      messages: [
        {
          text: 'Ok, aber mach wenigstens kurz Pause, ja?',
          ru: 'Ок, но хотя бы сделай короткий перерыв, ладно?',
        },
        {
          text: 'Und heute pünktlich [Feierabend](feierabend). Du warst die ganze Woche zu lang da.',
          ru: 'И сегодня вовремя заканчивай. Ты всю неделю сидел слишком долго.',
        },
      ],
      responses: [
        { id: 'mama', text: 'Ja, Mama 😄', ru: 'Да, мама 😄', next: 'ende' },
        {
          id: 'versuch',
          text: "Ich versuch's. Danke dir.",
          ru: 'Попробую. Спасибо тебе.',
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [
        { text: 'Bis später! Und danke nochmal 🙏', ru: 'До скорого! И спасибо ещё раз 🙏' },
      ],
      responses: [],
    },
  },
}
