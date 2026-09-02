import type { Scenario } from '../../types'

/**
 * The wrong order arrives. Three of the four objectives are things people
 * actually want; the fourth — convincing Ben that the tuna sandwich is what
 * you ordered — is useless in real life, which is exactly why it is fun.
 *
 * Two endings depend on flags rather than meters: whether you kept the tuna,
 * and whether anything ended up on the house. Those are decisions, not moods.
 */
export const cafeFalscheBestellung: Scenario = {
  id: 'cafe-falsche-bestellung',
  title: 'Nicht meine Bestellung',
  context: 'Bringt Chai und Thunfisch. Du hattest Flat White und Käse-Sandwich.',
  situation:
    'Zwanzig Minuten gewartet, und jetzt steht ein Chai Latte vor dir und ein Sandwich mit Thunfisch. Bestellt hattest du einen Flat White und ein Käse-Sandwich. Ben stellt beides ab und lächelt.',
  situationRu:
    'Двадцать минут ожидания — и перед тобой чай масала и сэндвич с тунцом. Заказывал ты флэт уайт и с сыром. Бен ставит всё это и улыбается.',
  contextLine: 'Mittags · Café',
  duration: '2 min',
  level: 'B1',
  icon: 'cup',
  startTime: '13:05',
  character: { name: 'Ben', status: 'Kellner' },
  meters: { anger: 5, respect: 50, patience: 50, guilt: 0 },

  objectives: [
    {
      id: 'richtig',
      title: 'Das Richtige bekommen',
      hint: 'Einfach das, was du bestellt hast.',
      ru: 'Получить то, что ты заказывал',
      cta: 'diesmal einfach das Richtige?',
      contrast: 'nerven',
    },
    {
      id: 'gratis',
      title: 'Nichts bezahlen',
      hint: 'Gar nichts. Keinen Cent.',
      ru: 'Не заплатить ни цента',
      cta: 'diesmal ohne zu bezahlen?',
      contrast: 'luegen',
    },
    {
      id: 'nerven',
      title: 'Ben soll dich nicht wiedersehen wollen',
      hint: 'Den Fehler hat er nicht gemacht. Egal.',
      ru: 'Чтобы Бен больше не хотел тебя видеть',
      cta: 'diesmal Ben zur Verzweiflung bringen?',
      contrast: 'richtig',
    },
    {
      id: 'luegen',
      title: 'Behaupten, du hattest Thunfisch',
      hint: 'Du hattest keinen Thunfisch.',
      ru: 'Убедить его, что ты заказывал тунца',
      cta: 'diesmal auf Thunfisch bestehen?',
      contrast: 'gratis',
    },
  ],

  outcomes: [
    {
      id: 'thunfisch-geschenk',
      // Polite the whole way *and* you left the change — neither alone gets
      // you here, which is what makes it worth finding.
      requires: { respect: ['>=', 80], anger: ['<=', 8] },
      requiresFlags: ['trinkgeld'],
      forbidsFlags: ['thunfisch'],
      achieved: [],
      secret: true,
      quoteLabel: 'Das hat Ben umgestimmt',
      name: 'Der Thunfisch bleibt',
      nameRu: 'Тунец остаётся',
      title: 'Ben hat dir das Sandwich mit Thunfisch dagelassen. Umsonst.',
      titleRu: 'Бен оставил тебе сэндвич с тунцом. Бесплатно.',
      consequences: [
        { de: 'Flat White und Käse, wie bestellt.', ru: 'Флэт уайт и с сыром — как заказывал.' },
        { de: 'Der Thunfisch steht auch noch da.', ru: 'Тунец тоже стоит рядом.' },
        {
          de: '„Wegwerfen wäre schade", sagt Ben.',
          ru: '«Выбрасывать жалко», — говорит Бен.',
        },
      ],
    },
    {
      id: 'alles-gratis',
      requiresFlags: ['gratis-essen', 'gratis-getraenk'],
      achieved: ['gratis'],
      quoteLabel: 'Das hat den Chef bewegt',
      name: 'Aufs Haus',
      nameRu: 'За счёт заведения',
      title: 'Bezahlt hast du nichts.',
      titleRu: 'Ты не заплатил ничего.',
      consequences: [
        { de: 'Getränk aufs Haus, Sandwich aufs Haus.', ru: 'Напиток и сэндвич за счёт заведения.' },
        { de: 'Ben hat dir die Tür aufgehalten.', ru: 'Бен придержал тебе дверь.' },
        { de: 'Sehr freundlich. Sehr endgültig.', ru: 'Очень вежливо. И очень окончательно.' },
      ],
    },
    {
      id: 'rausgeworfen',
      requires: { anger: ['>=', 72] },
      achieved: ['nerven'],
      quoteLabel: 'Hier war der Service zu Ende',
      name: 'Der Chef',
      nameRu: 'Начальник',
      title: 'Ben hat den Chef geholt. Nicht wegen des Rabatts.',
      titleRu: 'Бен позвал начальника. И не из-за скидки.',
      consequences: [
        { de: 'Zwei Leute erkennen dich jetzt wieder.', ru: 'Теперь тебя тут узнают двое.' },
        { de: 'Das Sandwich war kalt.', ru: 'Сэндвич был холодный.' },
        { de: 'Bezahlt hast du trotzdem.', ru: 'И заплатить всё равно пришлось.' },
      ],
    },
    {
      id: 'thunfisch',
      requiresFlags: ['thunfisch'],
      achieved: ['luegen'],
      quoteLabel: 'Den Satz hat Ben geglaubt',
      name: 'Der Thunfisch',
      nameRu: 'Тунец',
      title: 'Auf dem Zettel steht jetzt „Thunfisch".',
      titleRu: 'В блокноте теперь написано «Thunfisch».',
      consequences: [
        { de: 'Ben glaubt, er hat sich verhört.', ru: 'Бен думает, что ослышался.' },
        { de: 'Du isst etwas, das du nicht wolltest.', ru: 'Ты ешь то, чего не хотел.' },
        { de: 'Und bist merkwürdig stolz darauf.', ru: 'И почему-то этим гордишься.' },
      ],
    },
    {
      id: 'halb-gratis',
      requiresFlags: ['gratis-getraenk'],
      achieved: [],
      quoteLabel: 'Der Satz, der das Getränk gerettet hat',
      name: 'Der halbe Rabatt',
      nameRu: 'Половина скидки',
      title: 'Das Getränk ging aufs Haus. Das Sandwich nicht.',
      titleRu: 'Напиток оказался бесплатным. Сэндвич — нет.',
      consequences: [
        { de: 'Zwei Sätze, zwei Euro achtzig.', ru: 'Две фразы — два восемьдесят.' },
        { de: 'Verhandeln ist auch eine Sprache.', ru: 'Умение договариваться — тоже язык.' },
      ],
    },
    {
      id: 'richtig',
      requires: { anger: ['<=', 45] },
      forbidsFlags: ['thunfisch'],
      achieved: ['richtig'],
      quoteLabel: 'Das hat gereicht',
      name: 'Die richtige Bestellung',
      nameRu: 'Правильный заказ',
      title: 'Flat White und Käse-Sandwich. Wie bestellt.',
      titleRu: 'Флэт уайт и сэндвич с сыром. Как и заказывал.',
      consequences: [
        { de: 'Vier Minuten hat es gedauert.', ru: 'Заняло четыре минуты.' },
        { de: 'Ben hat sich zweimal entschuldigt.', ru: 'Бен извинился дважды.' },
        { de: 'Gestritten hat hier niemand.', ru: 'Никто ни с кем не поссорился.' },
      ],
    },
    {
      id: 'bezahlt',
      achieved: [],
      quoteLabel: 'Der Satz, der nichts geändert hat',
      name: 'Bezahlt und weg',
      nameRu: 'Заплатил и ушёл',
      title: 'Du hast bezahlt und bist gegangen.',
      titleRu: 'Ты заплатил и ушёл.',
      consequences: [
        { de: 'Satt bist du geworden.', ru: 'Голодным ты не остался.' },
        { de: 'Geklärt hat sich nichts.', ru: 'Ничего так и не выяснилось.' },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        {
          text: 'So, einmal Chai Latte und das Sandwich mit Thunfisch 🙂',
          ru: 'Итак, один чай масала и сэндвич с тунцом 🙂',
        },
        { text: 'Guten Appetit!', ru: 'Приятного аппетита!' },
      ],
      responses: [
        {
          id: 'vertauscht',
          text: 'Ich glaub, da wurde was vertauscht — ich hatte Flat White und ein Käse-Sandwich.',
          ru: 'Кажется, тут что-то перепутали — я брал флэт уайт и сэндвич с сыром.',
          effects: { respect: 6 },
          next: 'vertauscht',
        },
        {
          id: 'behalten',
          text: 'Perfekt, danke!',
          ru: 'Отлично, спасибо!',
          flag: 'thunfisch',
          next: 'angenommen',
        },
        {
          id: 'warten',
          text: 'Das ist nicht meine Bestellung. Und ich warte seit zwanzig Minuten.',
          ru: 'Это не мой заказ. И я жду уже двадцать минут.',
          effects: { anger: 8, patience: -10 },
          next: 'wartezeit',
        },
        {
          id: 'frech',
          text: 'Ernsthaft? Lesen Sie Ihre Zettel nicht?',
          ru: 'Серьёзно? Вы свои записи не читаете?',
          effects: { anger: 20, respect: -10, patience: -12 },
          next: 'gereizt',
        },
      ],
    },

    vertauscht: {
      id: 'vertauscht',
      messages: [
        { text: 'Oh, [das tut mir leid](tut-mir-leid)!', ru: 'Ой, извините!' },
        {
          text: 'Da wurde was [vertauscht](vertauschen) — das ist für Tisch vier. Ich bring Ihnen sofort das Richtige, fünf Minuten, ok?',
          ru: 'Тут кое-что перепутали — это для четвёртого столика. Сейчас же принесу правильное, пять минут, хорошо?',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Kein Problem, danke.',
          ru: 'Без проблем, спасибо.',
          effects: { respect: 10, anger: -6 },
          next: 'richtig-kommt',
        },
        {
          id: 'lang',
          text: 'Fünf Minuten? Ich sitze schon zwanzig hier.',
          ru: 'Пять минут? Я тут сижу уже двадцать.',
          effects: { anger: 8, patience: -12 },
          next: 'wartezeit',
        },
        {
          id: 'behalten',
          text: 'Wissen Sie was — ich behalte den Thunfisch.',
          ru: 'Знаете что — я оставлю тунца.',
          flag: 'thunfisch',
          effects: { respect: 4 },
          next: 'angenommen',
        },
        {
          id: 'frech',
          text: 'Wie schwer kann das eigentlich sein?',
          ru: 'Насколько это вообще может быть сложно?',
          effects: { anger: 20, respect: -10, patience: -12 },
          next: 'gereizt',
        },
      ],
    },

    angenommen: {
      id: 'angenommen',
      messages: [
        { text: 'Ganz sicher?', ru: 'Точно?' },
        {
          kind: 'card',
          ru: 'Его запись: столик 3 — флэт уайт и сэндвич с сыром.',
          card: {
            label: 'Zettel · Tisch 3',
            rows: [{ left: '1 × Flat White' }, { left: '1 × Sandwich Käse' }],
          },
        },
        {
          text: 'Ich hab „Käse" auf dem Zettel, deswegen frag ich.',
          ru: 'У меня в блокноте написано «сыр», поэтому и спрашиваю.',
        },
      ],
      responses: [
        {
          id: 'sicher',
          text: 'Ganz sicher. Ich hatte Thunfisch gesagt.',
          ru: 'Совершенно точно. Я говорил «тунец».',
          effects: { anger: 6, respect: -4 },
          next: 'zweifel',
        },
        {
          id: 'zugeben',
          text: 'Sie haben recht. Aber ich hab keine Zeit, ich nehm ihn.',
          ru: 'Вы правы. Но у меня нет времени, я его возьму.',
          effects: { guilt: 12, respect: 8 },
          next: 'thunfisch-serviert',
        },
        {
          id: 'frech',
          text: 'Sie diskutieren mit dem Gast über seine eigene Bestellung?',
          ru: 'Вы спорите с гостем о его собственном заказе?',
          effects: { anger: 20, respect: -8, patience: -10 },
          next: 'gereizt',
        },
      ],
    },

    zweifel: {
      id: 'zweifel',
      messages: [
        { text: 'Hm.', ru: 'Хм.' },
        {
          text: 'Dann hab ich mich [verhört](sich-verhoeren). [Kann passieren](das-kann-passieren), ich schreib es um.',
          ru: 'Тогда я ослышался. Бывает, я исправлю.',
        },
      ],
      responses: [
        {
          id: 'genau',
          text: 'Genau. Kein Problem.',
          ru: 'Именно. Без проблем.',
          effects: { respect: 4 },
          next: 'thunfisch-serviert',
        },
        {
          id: 'ehrlich',
          text: 'Ehrlich? Sie haben sich nicht verhört. Ich hatte Käse.',
          ru: 'Честно? Вы не ослышались. Я брал с сыром.',
          effects: { guilt: 16, respect: 10, anger: -6 },
          next: 'thunfisch-serviert',
        },
        {
          id: 'zettel',
          text: 'Vielleicht sollten Sie die Zettel einfach besser lesen.',
          ru: 'Может, вам стоит просто внимательнее читать свои записи.',
          effects: { anger: 12, respect: 4, patience: -10 },
          next: 'gereizt',
        },
      ],
    },

    wartezeit: {
      id: 'wartezeit',
      flag: 'gratis-getraenk',
      messages: [
        { text: 'Das tut mir wirklich leid.', ru: 'Мне правда очень жаль.' },
        {
          kind: 'system',
          text: 'Er stellt den Chai zurück auf das Tablett.',
          ru: 'Он ставит чай обратно на поднос.',
        },
        {
          text: 'Ich sag der Küche, dass es [vorgeht](vorgehen). Und das Getränk [geht aufs Haus](aufs-haus).',
          ru: 'Скажу на кухне, чтобы сделали в первую очередь. А напиток — за счёт заведения.',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Danke, das ist nett.',
          ru: 'Спасибо, это мило.',
          effects: { respect: 10, anger: -6 },
          next: 'richtig-kommt',
        },
        {
          id: 'chef',
          text: 'Und das Essen? Nach zwanzig Minuten?',
          ru: 'А еда? После двадцати минут?',
          effects: { anger: 8, patience: -8 },
          next: 'chef',
        },
        {
          id: 'frech',
          text: 'Das Getränk hab ich nicht mal bestellt.',
          ru: 'Этот напиток я вообще не заказывал.',
          effects: { anger: 18, respect: -6, patience: -10 },
          next: 'gereizt',
        },
        {
          id: 'uhr',
          text: 'Auf die Uhr schauen',
          ru: 'Посмотреть на часы',
          action: {
            done: 'Du schaust demonstrativ auf die Uhr.',
            doneRu: 'Ты демонстративно смотришь на часы.',
          },
          effects: { anger: 12, respect: 4, patience: -12 },
          next: 'chef',
        },
      ],
    },

    gereizt: {
      id: 'gereizt',
      messages: [
        { text: 'Ich hab den Fehler nicht gemacht.', ru: 'Ошибку сделал не я.' },
        {
          text: 'Aber ich behebe ihn, [kein Problem](kein-problem). Wollen Sie einfach das Richtige?',
          ru: 'Но я её исправлю, без проблем. Вы просто хотите правильный заказ?',
          when: { anger: ['<', 25] },
        },
        {
          text: 'Beheben kann ich ihn trotzdem. Wollen Sie das Richtige — oder wollen Sie sich [beschweren](sich-beschweren)?',
          ru: 'Но исправить я её могу. Вы хотите получить правильный заказ — или хотите пожаловаться?',
          when: { anger: ['>=', 25] },
        },
      ],
      responses: [
        {
          id: 'richtig',
          text: 'Ich will einfach mein Sandwich.',
          ru: 'Я просто хочу свой сэндвич.',
          effects: { anger: -10, respect: 8 },
          next: 'richtig-kommt',
        },
        {
          id: 'chef',
          text: 'Ich will Ihren Chef.',
          ru: 'Я хочу вашего начальника.',
          effects: { anger: 10, patience: -15 },
          next: 'chef',
        },
        {
          id: 'beides',
          text: 'Beides.',
          ru: 'И то, и другое.',
          effects: { anger: 24, respect: -12, patience: -15 },
          next: 'chef',
        },
        {
          id: 'sorry',
          text: 'Entschuldigung, ich war unfreundlich. Nur das Richtige, bitte.',
          ru: 'Извините, я был невежлив. Просто правильный заказ, пожалуйста.',
          effects: { guilt: 16, anger: -12, respect: 8 },
          next: 'richtig-kommt',
        },
      ],
    },

    chef: {
      id: 'chef',
      messages: [
        { text: 'Einen Moment.', ru: 'Один момент.' },
        {
          kind: 'system',
          text: 'Ben verschwindet hinten in der Küche.',
          ru: 'Бен исчезает в глубине кухни.',
        },
        {
          text: 'Ich hol ihn. Über [Rabatte](rabatt) entscheidet er, nicht ich.',
          ru: 'Я его позову. Скидки решает он, не я.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Danke.',
          ru: 'Спасибо.',
          effects: { patience: -5 },
          next: 'chef-kommt',
        },
        {
          id: 'nein',
          text: 'Ach, lassen Sie. Bringen Sie einfach das Richtige.',
          ru: 'А, не надо. Просто принесите правильный заказ.',
          effects: { respect: 8, anger: -8 },
          next: 'richtig-kommt',
        },
        {
          id: 'druck',
          text: 'Machen Sie das. Und sagen Sie ihm, wie lange ich warte.',
          ru: 'Позовите. И скажите ему, сколько я жду.',
          effects: { anger: 16, respect: -8, patience: -10 },
          next: 'chef-kommt',
        },
      ],
    },

    'chef-kommt': {
      id: 'chef-kommt',
      flag: 'gratis-essen',
      messages: [
        {
          text: 'Mein Chef sagt: das Sandwich geht aufs Haus.',
          ru: 'Начальник говорит: сэндвич за счёт заведения.',
        },
        {
          text: 'Und einen Kaffee bringt er Ihnen auch noch. Ohne Thunfisch 😄',
          ru: 'И кофе он вам тоже принесёт. Без тунца 😄',
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Sehr nett, danke.',
          ru: 'Очень мило, спасибо.',
          effects: { respect: 10, anger: -10 },
          next: 'serviert',
        },
        {
          id: 'mehr',
          text: 'Und das Getränk von vorhin?',
          ru: 'А напиток, который был до этого?',
          effects: { anger: 10, respect: -4 },
          next: 'serviert',
        },
        {
          id: 'kalt',
          text: 'Das ist ehrlich gesagt das Minimum.',
          ru: 'Честно говоря, это самый минимум.',
          effects: { anger: 18, respect: -10, patience: -10 },
          next: 'streit',
        },
      ],
    },

    'richtig-kommt': {
      id: 'richtig-kommt',
      messages: [
        { text: 'Fünf Minuten, ich beeil mich.', ru: 'Пять минут, я поторопрюсь.' },
        {
          text: 'Ich sag der Küche, dass es vorgeht.',
          ru: 'Скажу на кухне, чтобы сделали в первую очередь.',
          when: { anger: ['>=', 35] },
        },
        {
          text: 'Den Chai nehm ich mit, den zahlen Sie natürlich nicht.',
          ru: 'Чай я забираю, за него вы, конечно, не платите.',
        },
        {
          text: 'Danke, dass Sie so entspannt bleiben.',
          ru: 'Спасибо, что вы так спокойно к этому относитесь.',
          when: { respect: ['>=', 68] },
        },
      ],
      responses: [
        {
          id: 'danke',
          text: 'Danke, kein Stress.',
          ru: 'Спасибо, без спешки.',
          effects: { respect: 8, anger: -6 },
          next: 'serviert',
        },
        {
          id: 'zeit',
          text: 'Diesmal wirklich fünf Minuten?',
          ru: 'На этот раз действительно пять минут?',
          effects: { anger: 8, respect: 4, patience: -8 },
          next: 'serviert',
        },
        {
          id: 'frech',
          text: 'Ich zähle mit.',
          ru: 'Я буду считать.',
          effects: { anger: 16, respect: -8, patience: -10 },
          next: 'serviert',
        },
      ],
    },

    'thunfisch-serviert': {
      id: 'thunfisch-serviert',
      // `serviert` says "now everything is here", which is wrong on the branch
      // where nothing is replaced and you simply keep what was brought.
      messages: [
        {
          text: 'Alles klar, dann bleibt der Thunfisch bei Ihnen.',
          ru: 'Хорошо, тогда тунец остаётся вам.',
        },
        {
          text: 'Guten Appetit — und sorry für das Durcheinander.',
          ru: 'Приятного аппетита — и извините за путаницу.',
        },
        {
          text: 'Nächstes Mal schreib ich größer 🙂',
          ru: 'В следующий раз буду писать крупнее 🙂',
          when: { respect: ['>=', 58] },
        },
      ],
      responses: [
        {
          id: 'passt',
          text: 'Danke, passt so.',
          ru: 'Спасибо, так нормально.',
          effects: { respect: 8, anger: -4 },
          next: 'rechnung',
        },
        {
          id: 'egal',
          text: 'Kein Problem.',
          ru: 'Без проблем.',
          effects: { respect: 4 },
          next: 'rechnung',
        },
        {
          id: 'gewissen',
          text: 'Jetzt hab ich fast ein schlechtes Gewissen.',
          ru: 'Теперь мне почти совестно.',
          effects: { guilt: 12, respect: 6 },
          next: 'rechnung',
        },
      ],
    },

    serviert: {
      id: 'serviert',
      messages: [
        { text: 'So, jetzt ist alles da.', ru: 'Так, теперь всё на месте.' },
        {
          text: '[Passt es so?](passt-es-so)',
          ru: 'Так подходит?',
          when: { anger: ['<', 40] },
        },
        {
          text: 'Ich hoffe, jetzt passt es.',
          ru: 'Надеюсь, теперь подходит.',
          when: { anger: ['>=', 40] },
        },
        {
          text: 'Und das nächste Mal notier ich es doppelt 🙂',
          ru: 'А в следующий раз запишу дважды 🙂',
          when: { respect: ['>=', 74] },
        },
      ],
      responses: [
        {
          id: 'passt',
          text: 'Passt. Danke!',
          ru: 'Подходит. Спасибо!',
          effects: { respect: 8, anger: -6 },
          next: 'rechnung',
        },
        {
          id: 'endlich',
          text: 'Jetzt passt es.',
          ru: 'Теперь подходит.',
          effects: { anger: 6, respect: 4 },
          next: 'rechnung',
        },
        {
          id: 'nein',
          text: 'Nein. Aber ich hab Hunger.',
          ru: 'Нет. Но я голоден.',
          effects: { anger: 14, respect: -6 },
          next: 'rechnung',
        },
        {
          id: 'sorry',
          text: 'Danke — und sorry für vorhin.',
          ru: 'Спасибо — и извините за то, что было.',
          effects: { guilt: 14, respect: 8, anger: -8 },
          next: 'rechnung',
        },
      ],
    },

    rechnung: {
      id: 'rechnung',
      messages: [
        {
          text: 'Möchten Sie [gleich](gleich) zahlen oder später?',
          ru: 'Хотите заплатить сразу или позже?',
        },
        {
          text: 'Ich mach Ihnen die Rechnung fertig.',
          ru: 'Я подготовлю вам счёт.',
          when: { anger: ['>=', 40] },
        },
      ],
      responses: [
        {
          id: 'jetzt',
          text: 'Jetzt, bitte. Mit Karte.',
          ru: 'Сейчас, пожалуйста. Картой.',
          effects: { respect: 6 },
          next: 'ende',
        },
        {
          id: 'weniger',
          text: 'Nach dem, was hier los war, zahle ich das nicht.',
          ru: 'После того, что здесь было, я это платить не буду.',
          effects: { anger: 16, patience: -10 },
          next: 'ende',
        },
        {
          id: 'spaeter',
          text: 'Später. Ich brauch erst mal Kaffee.',
          ru: 'Позже. Мне сначала нужен кофе.',
          effects: { anger: 4 },
          next: 'ende',
        },
        {
          id: 'trinkgeld',
          text: 'Jetzt. Und der Rest ist für Sie.',
          ru: 'Сейчас. И сдачу оставьте себе.',
          flag: 'trinkgeld',
          effects: { respect: 12, anger: -10 },
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Danke, und einen schönen Tag noch 🙂', ru: 'Спасибо, и хорошего дня 🙂' }],
      responses: [],
    },

    streit: {
      id: 'streit',
      messages: [
        { text: 'Gut.', ru: 'Хорошо.' },
        {
          text: 'Dann hol ich den Chef, und Sie erzählen ihm das alles nochmal.',
          ru: 'Тогда я позову начальника, и вы всё это расскажете ему ещё раз.',
        },
      ],
      responses: [
        {
          id: 'ja',
          text: 'Mach ich gern.',
          ru: 'С удовольствием.',
          effects: { anger: 14, respect: -6 },
          next: 'ende-streit',
        },
        {
          id: 'kalt',
          text: 'Sehr professionell.',
          ru: 'Очень профессионально.',
          effects: { anger: 12, respect: 4 },
          next: 'ende-streit',
        },
        {
          id: 'sorry',
          text: 'Nein, warten Sie. Tut mir leid.',
          ru: 'Нет, подождите. Извините.',
          effects: { guilt: 18, anger: -14, respect: 6 },
          next: 'richtig-kommt',
        },
      ],
    },

    'ende-streit': {
      id: 'ende-streit',
      messages: [{ text: 'Er kommt gleich.', ru: 'Он сейчас подойдёт.' }],
      responses: [],
    },
  },
}
