import type { Scenario } from '../../types'

/**
 * A close friend cancels dinner twenty minutes before it starts — for the
 * third time. The stake is not the evening, it is the pattern, and that is
 * exactly what makes every response defensible: letting it go is kind, naming
 * it is honest, and asking why is the only thing that finds out what is
 * actually going on.
 *
 * The booking card is the hook: it is the only thing in the thread that says
 * out loud that you already made plans.
 */
export const elifSagtAb: Scenario = {
  id: 'elif-sagt-ab',
  title: 'Zum dritten Mal',
  context: 'Sagt zwanzig Minuten vorher ab. Wieder.',
  situation:
    'Der Tisch ist für sieben. Du bist schon da. Elif schreibt, dass sie es doch nicht schafft — das dritte Mal in sechs Wochen. Sie ist nicht irgendwer, das ist das Problem.',
  situationRu:
    'Столик забронирован на семь. Ты уже там. Элиф пишет, что всё-таки не сможет — третий раз за шесть недель. И она тебе не посторонняя, в этом и проблема.',
  contextLine: 'WhatsApp',
  duration: '4 min',
  level: 'B1',
  icon: 'clock',
  startTime: '18:40',
  character: { name: 'Elif', status: 'zuletzt online: gerade' },
  meters: { anger: 18, respect: 60, patience: 45, guilt: 10 },

  objectives: [
    {
      id: 'ruhe',
      title: 'Es gut sein lassen',
      hint: 'Kein Vorwurf, kein Thema. Nur ein neuer Termin.',
      ru: 'Не делать из этого историю',
      cta: 'diesmal einfach gut sein lassen?',
      contrast: 'aussprechen',
    },
    {
      id: 'aussprechen',
      title: 'Sagen, dass es dir zu viel wird',
      hint: 'Ohne Streit. Aber so, dass es ankommt.',
      ru: 'Сказать, что тебя это задевает',
      cta: 'diesmal wirklich sagen, was ist?',
      contrast: 'ruhe',
    },
    {
      id: 'heute',
      title: 'Den Abend heute noch retten',
      hint: 'Egal wo. Nur nicht allein am Tisch.',
      ru: 'Спасти сегодняшний вечер',
      cta: 'diesmal den Abend noch retten?',
      contrast: 'wahrheit',
    },
    {
      id: 'wahrheit',
      title: 'Rausfinden, was wirklich los ist',
      hint: 'Dreimal Arbeit ist keine Antwort.',
      ru: 'Выяснить, что на самом деле происходит',
      cta: 'diesmal rausfinden, was los ist?',
      contrast: 'heute',
    },
  ],

  outcomes: [
    {
      id: 'geld',
      // The whole thing was never about the evenings. You only get here by
      // asking twice and staying warm while she answers.
      requiresFlags: ['geld-raus'],
      requires: { respect: ['>=', 78], anger: ['<=', 14] },
      achieved: ['wahrheit'],
      secret: true,
      quoteLabel: 'Da war es raus',
      name: 'Es war das Geld',
      nameRu: 'Дело было в деньгах',
      title: 'Elif hat dreimal abgesagt, weil ihr Konto leer ist.',
      titleRu: 'Элиф трижды отменяла, потому что у неё пустой счёт.',
      consequences: [
        { de: 'Nicht die Arbeit. Nie die Arbeit.', ru: 'Не работа. Никогда это не была работа.' },
        {
          de: 'Sie kommt, weil du es einfach bezahlst.',
          ru: 'Она приходит, потому что ты просто платишь.',
        },
        {
          de: 'Und sie sagt es dir das nächste Mal früher.',
          ru: 'И в следующий раз она скажет тебе раньше.',
        },
      ],
    },
    {
      id: 'bei-dir',
      requiresFlags: ['zu-dir'],
      achieved: ['heute', 'wahrheit'],
      quoteLabel: 'Danach war der Tisch egal',
      name: 'Zwei Bier auf dem Sofa',
      nameRu: 'Два пива на диване',
      title: 'Du hast den Tisch abgesagt und bist zu ihr gefahren.',
      titleRu: 'Ты отменил столик и поехал к ней.',
      consequences: [
        { de: 'Geredet wurde fast nichts.', ru: 'Говорили почти ни о чём.' },
        { de: 'Das war offenbar der Punkt.', ru: 'Видимо, в этом и был смысл.' },
        {
          de: 'Sie schreibt am nächsten Tag von selbst.',
          ru: 'На следующий день она пишет сама.',
        },
      ],
    },
    {
      id: 'kommt',
      requiresFlags: ['kommt'],
      achieved: ['heute'],
      quoteLabel: 'Damit ist sie aufgestanden',
      name: 'Sie kommt doch',
      nameRu: 'Она всё-таки приходит',
      title: 'Um 19:40 ist Elif da. Außer Atem, Jacke noch an.',
      titleRu: 'В 19:40 Элиф на месте. Запыхавшаяся, ещё в куртке.',
      consequences: [
        { de: 'Vierzig Minuten zu spät und trotzdem gekommen.', ru: 'На сорок минут позже — и всё-таки пришла.' },
        { de: 'Geredet habt ihr über alles außer über heute.', ru: 'Говорили обо всём, кроме сегодняшнего.' },
        { de: 'Das dritte Mal bleibt unausgesprochen.', ru: 'Третий раз остаётся непроговорённым.' },
      ],
    },
    {
      id: 'burnout',
      requiresFlags: ['grund'],
      forbidsFlags: ['termin', 'kommt', 'zu-dir'],
      achieved: ['wahrheit'],
      quoteLabel: 'Das war die Antwort',
      name: 'Sie hat keine Kraft',
      nameRu: 'У неё нет сил',
      title: 'Es geht nicht um dich. Es geht um alle gerade.',
      titleRu: 'Дело не в тебе. Дело сейчас во всех.',
      consequences: [
        { de: 'Du weißt jetzt, warum dreimal Arbeit war.', ru: 'Теперь ты знаешь, почему трижды была «работа».' },
        { de: 'Einen Termin gibt es nicht.', ru: 'Новой даты нет.' },
        { de: 'Dafür sagt sie das nächste Mal früher ab.', ru: 'Зато в следующий раз она откажется раньше.' },
      ],
    },
    {
      id: 'gesagt',
      requiresFlags: ['gesagt'],
      requires: { anger: ['<=', 45] },
      achieved: ['aussprechen'],
      quoteLabel: 'Das ist angekommen',
      name: 'Es ist gesagt',
      nameRu: 'Сказано',
      title: 'Du hast es gesagt, ohne dass es ein Streit wurde.',
      titleRu: 'Ты это сказал — и ссоры не вышло.',
      consequences: [
        { de: 'Zehn Minuten war es unangenehm.', ru: 'Десять минут было неприятно.' },
        { de: 'Danach war es besser als vorher.', ru: 'После стало лучше, чем было.' },
        { de: 'Sie sagt: sammle das nicht wieder.', ru: 'Она говорит: не копи это больше.' },
      ],
    },
    {
      id: 'knall',
      requires: { anger: ['>=', 58] },
      achieved: [],
      quoteLabel: 'Ab da war es kein Gespräch mehr',
      name: 'Der Ton kippt',
      nameRu: 'Тон меняется',
      title: 'Aus einer Absage ist ein Streit geworden.',
      titleRu: 'Из отмены вышла ссора.',
      consequences: [
        { de: 'Sie liest die letzte Nachricht und antwortet nicht.', ru: 'Она читает последнее сообщение и не отвечает.' },
        { de: 'Recht hattest du trotzdem.', ru: 'Прав ты при этом был.' },
        { de: 'Nur hilft das heute Abend nichts.', ru: 'Только сегодня вечером это не помогает.' },
      ],
    },
    {
      id: 'termin',
      requiresFlags: ['termin'],
      requires: { anger: ['<=', 40] },
      achieved: ['ruhe'],
      quoteLabel: 'Damit war es geregelt',
      name: 'Dienstag steht',
      nameRu: 'Вторник в силе',
      title: 'Kein Thema, kein Vorwurf. Ein neuer Termin.',
      titleRu: 'Ни темы, ни упрёков. Просто новая дата.',
      consequences: [
        { de: 'Dienstag, und sie lädt ein.', ru: 'Вторник, и платит она.' },
        { de: 'Das vierte Mal wäre dann wirklich eins zu viel.', ru: 'Четвёртый раз был бы уже точно лишним.' },
        { de: 'Heute isst du allein, aber ohne Ärger.', ru: 'Сегодня ты ешь один, но без злости.' },
      ],
    },
    {
      id: 'allein',
      achieved: [],
      quoteLabel: 'Danach kam nichts mehr',
      name: 'Tisch für eins',
      nameRu: 'Столик на одного',
      title: 'Du hast allein gegessen. Gesagt wurde nichts.',
      titleRu: 'Ты поел один. Ничего так и не сказано.',
      consequences: [
        { de: 'Das Essen war gut.', ru: 'Еда была хорошая.' },
        { de: 'Das nächste Mal steht nicht.', ru: 'Следующий раз не назначен.' },
        { de: 'Und das dritte Mal steht immer noch zwischen euch.', ru: 'А третий раз всё ещё висит между вами.' },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          kind: 'card',
          card: {
            label: 'Reservierung bestätigt',
            rows: [
              { left: 'Trattoria Nino', right: '19:00' },
              { left: '2 Personen' },
              { left: 'Kastanienallee 12' },
            ],
            total: { left: 'Heute', right: 'in 20 Min' },
          },
          ru: 'Подтверждение брони столика',
        },
        {
          text: 'Ich glaub, ich [schaff es](es-nicht-schaffen) heute doch nicht 😔',
          ru: 'Кажется, я сегодня всё-таки не смогу 😔',
        },
        {
          text: 'Sorry. Ich weiß, dass das das dritte Mal ist.',
          ru: 'Извини. Я знаю, что это третий раз.',
        },
      ],
      responses: [
        {
          id: 'alles-gut',
          text: 'Alles gut. Machen wir ein anderes Mal.',
          ru: 'Всё нормально. Сделаем в другой раз.',
          effects: { anger: -8, respect: 4, patience: 6, guilt: 14 },
          next: 'zu-leicht',
        },
        {
          id: 'was-ist-los',
          text: 'Was ist denn los bei dir?',
          ru: 'Что у тебя происходит?',
          effects: { respect: 8, patience: 4 },
          next: 'ausrede',
        },
        {
          id: 'dritte-mal',
          text: 'Das dritte Mal, ja. Ist mir auch aufgefallen.',
          ru: 'Да, третий. Я тоже заметил.',
          effects: { anger: 14, patience: -6, guilt: -4 },
          next: 'getroffen',
        },
        {
          id: 'komm-doch',
          text: 'Der Tisch steht ab sieben. Komm einfach so, wie du bist.',
          ru: 'Столик с семи. Приходи просто как есть.',
          effects: { respect: 6, anger: 4 },
          next: 'ueberreden',
        },
      ],
    },

    'zu-leicht': {
      id: 'zu-leicht',
      messages: [
        { kind: 'system', text: 'Elif tippt. Dann ist es wieder weg.', ru: 'Элиф печатает. Потом это исчезает.' },
        { text: 'Du bist ein Schatz 🙏', ru: 'Ты золото 🙏' },
        {
          text: 'Ich [meld mich](sich-melden) morgen, ja?',
          ru: 'Я напишу тебе завтра, хорошо?',
        },
        {
          text: 'Ehrlich, ich hab schon gedacht, du bist sauer.',
          ru: 'Честно, я уже думала, что ты злишься.',
          when: { guilt: ['>=', 20] },
        },
      ],
      responses: [
        {
          id: 'doch-sagen',
          text: 'Ehrlich? Ein bisschen sauer bin ich schon.',
          ru: 'Честно? Немного всё-таки злюсь.',
          flag: 'gesagt',
          effects: { anger: 10, respect: 6, guilt: -12 },
          next: 'aussprache',
        },
        {
          id: 'naechste',
          text: 'Passt. Und nächstes Mal lädst du ein 🙂',
          ru: 'Идёт. А в следующий раз платишь ты 🙂',
          effects: { respect: 8, anger: -6 },
          next: 'neuer-termin',
        },
        {
          id: 'handy',
          text: 'Bis morgen.',
          ru: 'До завтра.',
          action: {
            done: 'Du legst das Handy weg und bestellst dir was.',
            doneRu: 'Ты убираешь телефон и заказываешь себе поесть.',
          },
          effects: { patience: -8, guilt: 8, anger: 4 },
          next: 'allein-tisch',
        },
      ],
    },

    ausrede: {
      id: 'ausrede',
      messages: [
        {
          text: 'Arbeit. Ich bin so [im Stress](im-stress-sein), du glaubst es nicht.',
          ru: 'Работа. Я в таком запаре, ты не поверишь.',
        },
        {
          text: 'Und ich bin einfach [platt](platt-sein).',
          ru: 'И я просто без сил.',
        },
        {
          text: 'Mir [kommt](dazwischenkommen) gerade jeden Tag irgendwas dazwischen.',
          ru: 'У меня сейчас каждый день что-то вклинивается.',
          when: { respect: ['>=', 64] },
        },
      ],
      responses: [
        {
          id: 'nachfragen',
          text: 'Elif. Was ist wirklich los?',
          ru: 'Элиф. Что на самом деле происходит?',
          effects: { respect: 10, patience: 4 },
          next: 'wahrheit-tuer',
        },
        {
          id: 'verstehe',
          text: 'Klingt heftig. Dann ruh dich aus.',
          ru: 'Звучит тяжело. Тогда отдыхай.',
          effects: { guilt: 8, anger: -6, respect: 4 },
          next: 'neuer-termin',
        },
        {
          id: 'nicht-glauben',
          text: 'Arbeit war es letztes Mal auch.',
          ru: 'В прошлый раз тоже была работа.',
          effects: { anger: 12, respect: 4, patience: -8 },
          next: 'getroffen',
        },
      ],
    },

    'wahrheit-tuer': {
      id: 'wahrheit-tuer',
      messages: [
        { text: 'Wie meinst du das?', ru: 'Ты о чём?' },
        {
          text: 'Ich hab jetzt echt keine Lust auf ein Verhör 🙃',
          ru: 'Мне сейчас правда не до допроса 🙃',
          when: { patience: ['<=', 40] },
        },
        {
          text: 'Okay. Aber lach nicht.',
          ru: 'Ладно. Только не смейся.',
          when: { respect: ['>=', 76] },
        },
      ],
      responses: [
        {
          id: 'raum-geben',
          text: 'Ich lach nicht. Sag einfach.',
          ru: 'Я не смеюсь. Просто скажи.',
          effects: { respect: 10, patience: 6 },
          next: 'geld-raus',
        },
        {
          id: 'raten',
          text: 'Ist es was mit deiner Familie?',
          ru: 'Это что-то с семьёй?',
          effects: { respect: 4, patience: -4 },
          next: 'durch',
        },
        {
          id: 'zurueck',
          text: 'Vergiss es. Schlaf dich aus.',
          ru: 'Забудь. Выспись.',
          effects: { guilt: 10, patience: 4, anger: -4 },
          next: 'neuer-termin',
        },
      ],
    },

    'geld-raus': {
      id: 'geld-raus',
      flag: 'geld-raus',
      messages: [
        { text: 'Ich hab bis Freitag zwölf Euro.', ru: 'У меня до пятницы двенадцать евро.' },
        {
          text: 'Diesen Monat ist es bei mir richtig [knapp](knapp-sein). Ich wollte das nicht schreiben.',
          ru: 'В этом месяце у меня совсем в обрез. Я не хотела это писать.',
        },
        {
          text: 'Deswegen sag ich immer Arbeit. Das ist einfacher.',
          ru: 'Поэтому я всегда говорю «работа». Так проще.',
          when: { anger: ['<=', 20] },
        },
      ],
      responses: [
        {
          id: 'einladen',
          text: 'Dann lade ich dich ein. Komm einfach.',
          ru: 'Тогда я тебя приглашаю. Просто приходи.',
          effects: { respect: 14, anger: -10 },
          next: 'unterwegs',
        },
        {
          id: 'billiger',
          text: 'Dann kein Nino. Ich hol uns Döner und wir setzen uns in den Park.',
          ru: 'Тогда не «Нино». Возьму нам дёнер, сядем в парке.',
          effects: { respect: 12, anger: -8, guilt: 4 },
          next: 'unterwegs',
        },
        {
          id: 'haette',
          text: 'Das hättest du mir vor sechs Wochen sagen können.',
          ru: 'Ты могла сказать мне это шесть недель назад.',
          flag: 'gesagt',
          effects: { anger: 8, respect: 6, guilt: -6 },
          next: 'aussprache',
        },
      ],
    },

    durch: {
      id: 'durch',
      flag: 'grund',
      messages: [
        { text: 'Nein. Nichts Konkretes.', ru: 'Нет. Ничего конкретного.' },
        {
          text: 'Mir [wird](zu-viel-werden) im Moment einfach alles zu viel. Und dann mach ich zu.',
          ru: 'Мне сейчас просто всё становится невыносимо. И тогда я закрываюсь.',
        },
        {
          text: 'Bei dir zuerst, weil du am wenigsten böse wirst.',
          ru: 'С тобой в первую очередь — потому что ты меньше всех злишься.',
          when: { guilt: ['>=', 10] },
        },
      ],
      responses: [
        {
          id: 'da-sein',
          text: 'Ich sag den Tisch ab und komm mit zwei Bier vorbei. Reden musst du nicht.',
          ru: 'Я отменю столик и приеду с двумя пивами. Говорить не обязательно.',
          flag: 'zu-dir',
          effects: { respect: 14, anger: -10, guilt: 4 },
          next: 'abend-gerettet',
        },
        {
          id: 'sag-es',
          text: 'Verstehe. Ich hab nur gemerkt, dass mich das trifft.',
          ru: 'Понимаю. Просто я заметил, что меня это задевает.',
          flag: 'gesagt',
          effects: { anger: 4, respect: 8, guilt: -8 },
          next: 'aussprache',
        },
        {
          id: 'ruhe-lassen',
          text: 'Okay. Dann lass ich dich in Ruhe. Aber ich weiß es jetzt.',
          ru: 'Ладно. Тогда не буду доставать. Но теперь я знаю.',
          effects: { respect: 8, anger: -6, guilt: 6 },
          next: 'verstanden',
        },
      ],
    },

    getroffen: {
      id: 'getroffen',
      messages: [
        { kind: 'reaction', emoji: '😔' },
        { text: 'Das stimmt.', ru: 'Это правда.' },
        {
          text: 'Und es [tut mir leid](tut-mir-leid), ehrlich.',
          ru: 'И мне правда жаль.',
        },
        {
          text: 'Aber du schreibst das gerade wie eine Rechnung.',
          ru: 'Но ты сейчас пишешь это как счёт к оплате.',
          when: { anger: ['>=', 28] },
        },
        {
          text: 'Und jetzt? Soll ich mich hinsetzen und schämen?',
          ru: 'И что теперь? Мне сесть и стыдиться?',
          when: { patience: ['<=', 38] },
        },
      ],
      responses: [
        {
          id: 'ruhig',
          text: 'Ich will keine Rechnung. Ich will nur, dass du es weißt.',
          ru: 'Мне не нужен счёт. Я просто хочу, чтобы ты это знала.',
          flag: 'gesagt',
          effects: { anger: -8, respect: 12, patience: 6 },
          next: 'aussprache',
        },
        {
          id: 'haerter',
          text: 'Ich hab zweimal umgeplant. Für nichts.',
          ru: 'Я дважды всё переставлял. Впустую.',
          effects: { anger: 16, patience: -12, guilt: -6 },
          next: 'eskalation',
        },
        {
          id: 'frage',
          text: 'Sag mir einfach, warum.',
          ru: 'Просто скажи мне, почему.',
          effects: { respect: 8, patience: 2 },
          next: 'wahrheit-tuer',
        },
      ],
    },

    eskalation: {
      id: 'eskalation',
      messages: [
        { text: 'Okay. Dann sag ich jetzt auch was.', ru: 'Ладно. Тогда я тоже кое-что скажу.' },
        {
          text: 'Du fragst nie, wie es mir geht. Du fragst, ob ich komme.',
          ru: 'Ты никогда не спрашиваешь, как я. Ты спрашиваешь, приду ли я.',
        },
        {
          text: 'Ja, ich bin dir was schuldig. Aber nicht das hier.',
          ru: 'Да, я перед тобой виновата. Но не в этом.',
          when: { guilt: ['<=', 8] },
        },
      ],
      responses: [
        {
          id: 'treffer',
          text: 'Das sitzt. Und ist nicht ganz falsch.',
          ru: 'Это в точку. И не совсем неправда.',
          flag: 'gesagt',
          effects: { anger: -16, respect: 14, guilt: 12 },
          next: 'aussprache',
        },
        {
          id: 'drauf',
          text: 'Dann brauchen wir heute wirklich nicht essen.',
          ru: 'Тогда нам сегодня действительно не нужно ужинать.',
          effects: { anger: 20, patience: -14 },
          next: 'kalt',
        },
        {
          id: 'pause',
          text: 'Lass uns morgen reden. So wird das nichts.',
          ru: 'Давай поговорим завтра. Так ничего не выйдет.',
          effects: { anger: -4, patience: 4 },
          next: 'abbruch',
        },
      ],
    },

    aussprache: {
      id: 'aussprache',
      messages: [
        { text: 'Ich hab das jetzt dreimal gelesen.', ru: 'Я это уже трижды перечитала.' },
        {
          text: 'Danke, dass du es sagst und nicht sammelst.',
          ru: 'Спасибо, что говоришь, а не копишь.',
        },
        {
          text: 'Ich glaub, ich hätte es sonst nicht gemerkt.',
          ru: 'Кажется, иначе я бы и не заметила.',
          when: { respect: ['>=', 70] },
        },
      ],
      responses: [
        {
          id: 'heute-noch',
          text: 'Und heute? Der Tisch steht noch zwanzig Minuten.',
          ru: 'А сегодня? Столик держат ещё двадцать минут.',
          effects: { respect: 6, anger: -6 },
          next: 'spaet',
        },
        {
          id: 'termin',
          text: 'Dann suchen wir einen Tag, der wirklich passt.',
          ru: 'Тогда найдём день, который правда подходит.',
          effects: { respect: 6, anger: -8, patience: 4 },
          next: 'neuer-termin',
        },
        {
          id: 'schluss',
          text: 'Gut. Dann ist es gesagt und wir lassen es.',
          ru: 'Хорошо. Тогда сказано — и оставим это.',
          effects: { patience: 6, anger: -4 },
          next: 'neuer-termin',
        },
      ],
    },

    ueberreden: {
      id: 'ueberreden',
      messages: [
        { text: 'Ich hab nicht mal geduscht.', ru: 'Я даже в душ не сходила.' },
        {
          text: 'Und ich sitz im Jogginganzug auf dem Sofa 🙈',
          ru: 'И сижу в спортивках на диване 🙈',
        },
        {
          text: 'Wie lange hält der Tisch denn?',
          ru: 'А сколько столик держат?',
          when: { patience: ['>=', 44] },
        },
      ],
      responses: [
        {
          id: 'egal-wie',
          text: 'Komm so. Nino ist kein Ort für Frisuren.',
          ru: 'Приходи как есть. «Нино» — не место для причёсок.',
          effects: { respect: 10, anger: -4 },
          next: 'spaet',
        },
        {
          id: 'zwanzig',
          text: 'Zwanzig Minuten. Ich sitz hier und warte.',
          ru: 'Двадцать минут. Я тут сижу и жду.',
          effects: { respect: 4, patience: -4 },
          next: 'spaet',
        },
        {
          id: 'druck',
          text: 'Ich hab den Tisch für uns beide reserviert.',
          ru: 'Я забронировал столик на двоих.',
          effects: { anger: 12, patience: -8, guilt: -6 },
          next: 'getroffen',
        },
      ],
    },

    spaet: {
      id: 'spaet',
      messages: [
        { text: 'Jetzt noch? So, wie ich gerade aussehe?', ru: 'Прямо сейчас? В таком виде, как я сейчас?' },
        {
          text: 'Okay. Zwanzig Minuten, aber du bestellst mir schon mal was.',
          ru: 'Ладно. Двадцать минут, но закажи мне уже что-нибудь.',
          when: { anger: ['<=', 24] },
        },
        {
          text: 'Ich hab nur das Gefühl, ich komm gleich zum Verhör.',
          ru: 'Только у меня чувство, что я иду прямиком на допрос.',
          when: { anger: ['>=', 25] },
        },
      ],
      responses: [
        {
          id: 'pulli',
          text: 'So, wie du aussiehst, ist es perfekt. Ich bestell dir schon ein Wasser.',
          ru: 'В таком виде, как ты сейчас, — идеально. Я тебе уже закажу воды.',
          effects: { respect: 10, anger: -8 },
          next: 'unterwegs',
        },
        {
          id: 'kein-verhoer',
          text: 'Kein Verhör. Nur Essen, versprochen.',
          ru: 'Никакого допроса. Только еда, обещаю.',
          effects: { respect: 8, anger: -6, patience: 4 },
          next: 'unterwegs',
        },
        {
          id: 'egal',
          text: 'Wie du willst. Ich hab jetzt keine Kraft mehr zu überreden.',
          ru: 'Как хочешь. У меня уже нет сил уговаривать.',
          effects: { anger: 10, patience: -8, guilt: -4 },
          next: 'abbruch',
        },
      ],
    },

    unterwegs: {
      id: 'unterwegs',
      flag: 'kommt',
      messages: [
        { kind: 'system', text: 'Sieben Minuten nichts. Dann ein Foto von einem U-Bahn-Schild.', ru: 'Семь минут ничего. Потом фото указателя метро.' },
        { text: 'Bin in der U8. Vier Stationen.', ru: 'Я в U8. Четыре остановки.' },
        {
          text: 'Ich hab keine zehn Minuten gebraucht. Das war Rekord 😅',
          ru: 'Мне хватило меньше десяти минут. Это рекорд 😅',
          when: { respect: ['>=', 72] },
        },
      ],
      responses: [
        {
          id: 'warte',
          text: 'Ich warte draußen. Und ich hab dir schon was bestellt.',
          ru: 'Я жду снаружи. И уже кое-что тебе заказал.',
          effects: { respect: 6, anger: -4 },
          next: 'am-tisch',
        },
        {
          id: 'danke',
          text: 'Danke, dass du doch noch kommst.',
          ru: 'Спасибо, что всё-таки приезжаешь.',
          effects: { respect: 8, anger: -6, guilt: 4 },
          next: 'am-tisch',
        },
      ],
    },

    'neuer-termin': {
      id: 'neuer-termin',
      messages: [
        { text: 'Wann passt es dir denn?', ru: 'А когда тебе удобно?' },
        {
          text: '[Unter der Woche](unter-der-woche) ist bei mir gerade eng, aber Dienstag ginge.',
          ru: 'На неделе у меня сейчас плотно, но вторник бы вышел.',
        },
        {
          text: 'Und ich [sag dir](bescheid-sagen) diesmal früher Bescheid, versprochen.',
          ru: 'И я тебе на этот раз скажу раньше, обещаю.',
          when: { patience: ['>=', 46] },
        },
      ],
      responses: [
        {
          id: 'wetten',
          text: 'Dienstag. Und wenn du absagst, lädst du ein 🙂',
          ru: 'Вторник. А если отменишь — платишь ты 🙂',
          effects: { respect: 8, anger: -6, patience: 4 },
          next: 'dienstag',
        },
        {
          id: 'kalender',
          text: 'Dienstag. Ich schreib es in den Kalender, fett.',
          ru: 'Вторник. Записываю в календарь, жирным.',
          effects: { respect: 4, anger: -4 },
          next: 'dienstag',
        },
        {
          id: 'zweifel',
          text: 'Dienstag also. Schauen wir mal, ob der hält.',
          ru: 'Значит, вторник. Посмотрим, устоит ли он.',
          effects: { anger: 8, patience: -6, guilt: -8 },
          next: 'dienstag',
        },
      ],
    },

    dienstag: {
      id: 'dienstag',
      flag: 'termin',
      messages: [
        {
          text: 'Dienstag, 19 Uhr. [Abgemacht](abgemacht).',
          ru: 'Вторник, 19:00. Договорились.',
        },
        {
          text: 'Und ich lad dich ein, [versprochen](versprochen).',
          ru: 'И я тебя приглашаю, обещаю.',
          when: { anger: ['<=', 20] },
        },
        {
          text: 'Und ich hör schon, dass du es mir nicht ganz glaubst.',
          ru: 'И я слышу, что ты мне не совсем веришь.',
          when: { anger: ['>=', 21] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Steht. Bis Dienstag.',
          ru: 'Договорились. До вторника.',
          effects: { respect: 4, anger: -4 },
          next: 'geregelt',
        },
        {
          id: 'iss-was',
          text: 'Und iss heute was Warmes.',
          ru: 'И поешь сегодня что-нибудь горячее.',
          effects: { respect: 8, anger: -6, guilt: 4 },
          next: 'geregelt',
        },
      ],
    },

    'allein-tisch': {
      id: 'allein-tisch',
      messages: [
        {
          kind: 'system',
          text: 'Du legst das Handy weg. Die Pasta kommt. Um 20:10 vibriert es wieder.',
          ru: 'Ты убираешь телефон. Приносят пасту. В 20:10 телефон снова вибрирует.',
        },
        { text: 'Bist du sauer?', ru: 'Ты злишься?' },
        {
          text: 'Du hast so schnell Alles gut geschrieben, das machst du sonst nicht.',
          ru: 'Ты так быстро написал «всё нормально», ты обычно так не делаешь.',
          when: { guilt: ['>=', 16] },
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Ja. Ein bisschen schon.',
          ru: 'Да. Немного всё-таки.',
          flag: 'gesagt',
          effects: { anger: 8, respect: 10, guilt: -10 },
          next: 'aussprache',
        },
        {
          id: 'nein',
          text: 'Nein. Ich hab nur in Ruhe gegessen.',
          ru: 'Нет. Я просто спокойно поел.',
          effects: { guilt: 6, anger: -4, patience: 4 },
          next: 'nachhall',
        },
        {
          id: 'spaeter',
          text: 'Später. Jetzt ist Tiramisu dran.',
          ru: 'Потом. Сейчас на очереди тирамису.',
          effects: { anger: 6, patience: -6 },
          next: 'nachhall',
        },
      ],
    },

    nachhall: {
      id: 'nachhall',
      messages: [
        { text: 'Okay.', ru: 'Ладно.' },
        {
          text: 'Sagst du mir das dann auch, wenn es doch was ist?',
          ru: 'А если всё-таки что-то не так — ты мне скажешь?',
        },
        {
          text: 'Du bist immer so schnell mit deinem Alles gut.',
          ru: 'Ты всегда так быстро выдаёшь своё «всё нормально».',
          when: { guilt: ['>=', 24] },
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Sag ich dir. Versprochen.',
          ru: 'Скажу. Обещаю.',
          effects: { respect: 8, anger: -4, guilt: -4 },
          next: 'stille',
        },
        {
          id: 'knapp',
          text: 'Wenn es was ist, merkst du es.',
          ru: 'Если что-то будет не так, ты заметишь.',
          effects: { anger: 6, patience: -6 },
          next: 'stille',
        },
      ],
    },

    kalt: {
      id: 'kalt',
      messages: [
        { text: 'Fein.', ru: 'Прекрасно.' },
        {
          text: 'Dann ist es ja gut, dass ich [abgesagt](absagen) hab.',
          ru: 'Тогда и хорошо, что я отменила.',
        },
        {
          text: 'Schreib mir, wenn du wieder normal reden kannst.',
          ru: 'Напиши, когда снова сможешь разговаривать нормально.',
          when: { anger: ['>=', 50] },
        },
      ],
      responses: [
        {
          id: 'letztes',
          text: 'Dann guten Abend noch.',
          ru: 'Тогда хорошего вечера.',
          effects: { patience: -4 },
          next: 'stille',
        },
        {
          id: 'nachlegen',
          text: 'Ich rede normal. Du sagst nur dreimal ab.',
          ru: 'Я разговариваю нормально. Просто ты трижды отменяешь.',
          effects: { anger: 12, patience: -8 },
          next: 'stille',
        },
      ],
    },

    abbruch: {
      id: 'abbruch',
      messages: [
        { text: 'Ja. Morgen ist besser.', ru: 'Да. Завтра лучше.' },
        {
          text: 'Ich [lass dich](in-ruhe-lassen) heute in Ruhe.',
          ru: 'Я тебя сегодня не буду трогать.',
        },
        {
          text: 'Und ich weiß, dass das jetzt blöd endet.',
          ru: 'И я знаю, что это сейчас глупо заканчивается.',
          when: { anger: ['>=', 26] },
        },
      ],
      responses: [
        {
          id: 'morgen',
          text: 'Morgen dann. Schlaf gut.',
          ru: 'Тогда завтра. Спокойной ночи.',
          effects: { anger: -6, respect: 4 },
          next: 'stille',
        },
        {
          id: 'trocken',
          text: 'Ja. Morgen.',
          ru: 'Да. Завтра.',
          effects: { anger: 4, patience: -6 },
          next: 'stille',
        },
      ],
    },

    'am-tisch': {
      id: 'am-tisch',
      messages: [
        {
          kind: 'system',
          text: 'Um 19:40 ist Elif da. Außer Atem, Jacke noch an.',
          ru: 'В 19:40 Элиф на месте. Запыхавшаяся, ещё в куртке.',
        },
        { text: 'Sorry für den Auftritt 😄', ru: 'Извини за явление 😄' },
        {
          text: 'Und danke, dass du nicht sauer bist.',
          ru: 'И спасибо, что не злишься.',
          when: { anger: ['<=', 12] },
        },
      ],
      responses: [],
    },

    'abend-gerettet': {
      id: 'abend-gerettet',
      messages: [
        { text: 'Okay. Aber ich red nicht viel.', ru: 'Ладно. Но я много говорить не буду.' },
        {
          kind: 'system',
          text: 'Du sagst den Tisch ab. Der Kellner nimmt es dir nicht übel.',
          ru: 'Ты отменяешь столик. Официант не в обиде.',
        },
        {
          text: 'Zweites Klingeln links. Und bring nichts Teures mit.',
          ru: 'Второй звонок слева. И не приноси ничего дорогого.',
          when: { respect: ['>=', 70] },
        },
      ],
      responses: [],
    },

    verstanden: {
      id: 'verstanden',
      messages: [
        { text: 'Danke.', ru: 'Спасибо.' },
        {
          text: 'Ich sag dir das nächste Mal früher, dass ich nicht kann.',
          ru: 'В следующий раз я скажу раньше, что не смогу.',
        },
        {
          text: 'Und frag mich in zwei Wochen nochmal, ja?',
          ru: 'И спроси меня ещё раз через две недели, хорошо?',
          when: { respect: ['>=', 74] },
        },
      ],
      responses: [],
    },

    geregelt: {
      id: 'geregelt',
      messages: [
        { kind: 'reaction', emoji: '👍' },
        { text: 'Bis Dienstag. Und guten Appetit heute.', ru: 'До вторника. И приятного аппетита сегодня.' },
      ],
      responses: [],
    },

    stille: {
      id: 'stille',
      messages: [
        { kind: 'system', text: 'Elif liest die Nachricht. Danach bleibt es still.', ru: 'Элиф читает сообщение. Дальше тишина.' },
        {
          text: 'Bis morgen.',
          ru: 'До завтра.',
          when: { anger: ['<=', 34] },
        },
        {
          kind: 'reaction',
          emoji: '👍',
          when: { anger: ['>=', 35] },
        },
      ],
      responses: [],
    },
  },
}
