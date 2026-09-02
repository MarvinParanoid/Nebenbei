import type { Scenario } from '../../types'

/**
 * Jonas hasn't run the dishwasher for three days and opens with "is there any
 * lasagne left?". The graph is the same for every objective — only what counts
 * as a good ending changes, which is what makes it worth replaying.
 *
 * Effects follow one convention, so the tone of an option is readable from its
 * numbers:
 *   cooperative   respect +6…10, anger −6…10
 *   apologetic    guilt +12…24, anger −6…12
 *   passive       anger +10…16, respect +6…8   (the words are polite, the content isn't)
 *   rude          anger +20…30, respect −8…20
 * Nothing here reacts to grammar or vocabulary. You are judged on the social
 * outcome, never on your German.
 */
export const wgSpuelmaschine: Scenario = {
  id: 'wg-spuelmaschine',
  title: 'Die Spülmaschine',
  context: 'Fragt nach Lasagne. Spült aber nie ab.',
  situation:
    'Dritter Tag, dass Jonas’ Geschirr in der Küche steht: Teller, ein Topf, zwei Pfannen. Du wolltest heute eigentlich kochen. Und dann schreibt er.',
  situationRu:
    'Третий день посуда Йонаса стоит на кухне: тарелки, кастрюля, две сковородки. Ты вообще-то собирался сегодня готовить. И тут он пишет.',
  contextLine: 'Küche · WG',
  duration: '3 min',
  level: 'B1',
  icon: 'plate',
  startTime: '19:42',
  character: { name: 'Jonas', status: 'Mitbewohner' },
  meters: { anger: 10, respect: 50, patience: 55, guilt: 0 },

  objectives: [
    {
      id: 'frieden',
      title: 'Das Problem lösen',
      hint: 'Ohne Streit. Ihr müsst danach noch zusammen wohnen.',
      ru: 'Договориться и не поссориться',
      cta: 'diesmal ohne Streit?',
      contrast: 'eskalieren',
    },
    {
      id: 'eskalieren',
      title: 'Jonas richtig sauer machen',
      hint: 'Wie schlimm kann es schon werden?',
      ru: 'Довести Йонаса до бешенства',
      cta: 'diesmal Jonas richtig sauer machen?',
      contrast: 'frieden',
    },
    {
      id: 'passiv',
      title: 'Passiv-aggressiv bleiben',
      hint: 'Kein böses Wort. Aber er soll es merken.',
      ru: 'Ни одной грубости — и чтобы он всё понял',
      cta: 'diesmal passiv-aggressiv?',
      contrast: 'schuld',
    },
    {
      id: 'schuld',
      title: 'Am Ende selbst entschuldigen',
      hint: 'Warum auch immer.',
      ru: 'Сделать так, чтобы извинялся ты',
      cta: 'diesmal selbst entschuldigen?',
      contrast: 'passiv',
    },
  ],

  outcomes: [
    {
      id: 'pizza',
      // Warm *and* one honest apology — neither the pure-peace nor the
      // pure-sorry run produces this mix, which is what makes it a find.
      requires: {
        respect: ['>=', 78],
        anger: ['<=', 12],
        guilt: [
          ['>=', 20],
          ['<=', 44],
        ],
      },
      achieved: [],
      secret: true,
      quoteLabel: 'Der Satz, der alles gedreht hat',
      name: 'Die Pizza',
      nameRu: 'Пицца',
      title: 'Jonas hat Pizza bestellt und die Küche geputzt.',
      titleRu: 'Йонас заказал пиццу и убрал кухню.',
      consequences: [
        { de: 'Die Küche ist sauber. Auch der Boden.', ru: 'Кухня чистая. И пол тоже.' },
        { de: 'Es gibt Pizza.', ru: 'Есть пицца.' },
        {
          de: 'Jonas erzählt allen, er wollte das eh mal machen.',
          ru: 'Йонас всем рассказывает, что всё равно собирался.',
        },
      ],
    },
    {
      id: 'rausgerannt',
      requires: { anger: ['>=', 78] },
      achieved: ['eskalieren'],
      quoteLabel: 'Hier ist es eskaliert',
      name: 'Die zugeschlagene Tür',
      nameRu: 'Хлопнувшая дверь',
      title: 'Jonas ist raus und hat die Tür zugemacht.',
      titleRu: 'Йонас ушёл и закрыл за собой дверь.',
      consequences: [
        { de: 'Die Spülmaschine ist immer noch voll.', ru: 'Посудомойка всё ещё полная.' },
        { de: 'Jonas ist bei Mira.', ru: 'Йонас у Миры.' },
        { de: 'Geredet wird morgen nicht.', ru: 'Завтра разговаривать никто не будет.' },
      ],
    },
    {
      id: 'eiszeit',
      requires: { anger: ['>=', 38], respect: ['>=', 45], guilt: ['<=', 25] },
      achieved: ['passiv'],
      quoteLabel: 'Der Satz, der gesessen hat',
      name: 'Der kalte Krieg',
      nameRu: 'Холодная война',
      title: 'Die Küche ist sauber. Geredet wird erst mal nicht mehr.',
      titleRu: 'Кухня чистая. Разговаривать пока никто не хочет.',
      consequences: [
        { de: 'Jonas hat die Maschine angemacht.', ru: 'Йонас включил посудомойку.' },
        { de: 'Gesagt hat er dazu nichts.', ru: 'Ничего он при этом не сказал.' },
        { de: 'Zwei Tage nur das Nötigste.', ru: 'Два дня — только по делу.' },
      ],
    },
    {
      id: 'entschuldigung',
      requires: { guilt: ['>=', 45], anger: ['<=', 40] },
      achieved: ['schuld'],
      quoteLabel: 'Ab hier war es plötzlich dein Problem',
      name: 'Du entschuldigst dich',
      nameRu: 'Извиняешься ты',
      title: 'Am Ende hast du dich entschuldigt. Für seine Teller.',
      titleRu: 'В итоге извинился ты. За его тарелки.',
      consequences: [
        { de: 'Jonas fand das Gespräch total ok.', ru: 'Йонас счёл разговор вполне нормальным.' },
        { de: 'Der Topf weicht ein. Bei dir.', ru: 'Кастрюля замачивается. У тебя.' },
        { de: 'Über den Putzplan habt ihr nicht geredet.', ru: 'Про график уборки вы не говорили.' },
      ],
    },
    {
      id: 'abgemacht',
      requires: { anger: ['<=', 30], respect: ['>=', 58] },
      achieved: ['frieden'],
      quoteLabel: 'Das hat Jonas überzeugt',
      name: 'Der Putzplan',
      nameRu: 'График уборки',
      title: 'Ihr habt einen Putzplan. Er hängt schon am Kühlschrank.',
      titleRu: 'У вас есть график уборки. Он уже висит на холодильнике.',
      consequences: [
        { de: 'Die Maschine läuft.', ru: 'Посудомойка работает.' },
        { de: 'Küche im Wechsel, Woche für Woche.', ru: 'Кухня по очереди, неделя через неделю.' },
        { de: 'Ihr seid immer noch Freunde.', ru: 'Вы всё ещё друзья.' },
      ],
    },
    {
      id: 'verlaufen',
      achieved: [],
      quoteLabel: 'Der Satz, der nichts geändert hat',
      name: 'Nichts passiert',
      nameRu: 'Ничего не случилось',
      title: 'Das Gespräch ist irgendwie im Sand verlaufen.',
      titleRu: 'Разговор как-то сошёл на нет.',
      consequences: [
        { de: 'In der Küche steht alles noch genau so.', ru: 'На кухне всё стоит точно так же.' },
        { de: 'Niemand hat etwas versprochen.', ru: 'Никто ничего не обещал.' },
        { de: 'Sauer ist auch keiner.', ru: 'И никто не злится.' },
      ],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey 👋', ru: 'Привет 👋' },
        {
          text: 'Ist noch was von der Lasagne da? 😄',
          ru: 'Осталось что-нибудь от лазаньи? 😄',
        },
      ],
      responses: [
        {
          id: 'frage',
          text: 'Ja, im Kühlschrank. Sag mal, machst du heute noch die Spülmaschine an?',
          ru: 'Да, в холодильнике. Слушай, ты сегодня включишь посудомойку?',
          effects: { respect: 6 },
          next: 'spuelmaschine',
        },
        {
          id: 'kalt',
          text: 'Keine Ahnung, ich komm in der Küche grad nicht an den Kühlschrank.',
          ru: 'Без понятия, я на кухне до холодильника сейчас не доберусь.',
          effects: { anger: 8, respect: 8, patience: -8 },
          next: 'spuelmaschine',
        },
        {
          id: 'vorwurf',
          text: 'Ernsthaft? Deine Teller stehen da seit Montag.',
          ru: 'Серьёзно? Твои тарелки стоят там с понедельника.',
          effects: { anger: 16, respect: -4, patience: -10 },
          next: 'vorwurf',
        },
        {
          id: 'sorry',
          text: 'Ich glaub, ich hab sie gestern aufgegessen. Sorry 😅',
          ru: 'Кажется, я её вчера доел. Извини 😅',
          effects: { guilt: 12, respect: 4 },
          next: 'lasagne',
        },
      ],
    },

    lasagne: {
      id: 'lasagne',
      messages: [
        { text: '[Kein Problem](kein-problem) 😄', ru: 'Без проблем 😄' },
        {
          text: 'Ich hol mir was unten, ich hab eh nichts gekocht.',
          ru: 'Схожу вниз, возьму что-нибудь. Я всё равно ничего не готовил.',
        },
      ],
      responses: [
        {
          id: 'frage',
          text: 'Sag mal — die Spülmaschine. Machst du die heute?',
          ru: 'Слушай, а посудомойка. Ты её сегодня включишь?',
          effects: { respect: 6 },
          next: 'spuelmaschine',
        },
        {
          id: 'kalt',
          text: 'Kochen wäre auch schwierig, so wie die Küche aussieht.',
          ru: 'Готовить и было бы сложно — с учётом того, как выглядит кухня.',
          effects: { anger: 8, respect: 8, patience: -8 },
          next: 'spuelmaschine',
        },
      ],
    },

    spuelmaschine: {
      id: 'spuelmaschine',
      messages: [
        { text: 'Ah, stimmt, die wollte ich machen.', ru: 'А, точно, я собирался её включить.' },
        {
          text: 'Du musst es nicht so sagen.',
          ru: 'Можно было и не таким тоном.',
          when: { anger: ['>=', 15] },
        },
        {
          text: 'Ich war die ganze Woche bis acht in der Uni, [ehrlich gesagt](ehrlich-gesagt) hab ich es vergessen.',
          ru: 'Я всю неделю был в универе до восьми, честно говоря, просто забыл.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Verstehe. Machst du sie heute Abend?',
          ru: 'Понимаю. Включишь сегодня вечером?',
          effects: { respect: 8, anger: -6 },
          next: 'plan',
        },
        {
          id: 'kalt',
          text: 'Ich war auch bis acht weg. Mein Geschirr steht aber nicht da.',
          ru: 'Меня тоже до восьми не было дома. Но моя посуда там не стоит.',
          effects: { anger: 8, respect: 8, patience: -10 },
          next: 'vorwurf',
        },
        {
          id: 'boese',
          text: 'Vielleicht solltest du einfach lernen, wie man eine Spülmaschine benutzt.',
          ru: 'Может, тебе стоит просто научиться пользоваться посудомойкой.',
          effects: { anger: 28, respect: -12, patience: -20 },
          next: 'gereizt',
        },
        {
          id: 'sorry',
          text: 'Sorry, ich bin nur genervt. Langer Tag.',
          ru: 'Извини, я просто на нервах. Долгий день.',
          effects: { guilt: 14, anger: -6, respect: 4 },
          next: 'plan',
        },
      ],
    },

    vorwurf: {
      id: 'vorwurf',
      messages: [
        { text: 'Ok, jetzt mal ehrlich.', ru: 'Ладно, давай честно.' },
        {
          text: 'Ich hab am Sonntag den ganzen Müll runtergebracht. Gesagt hat dazu auch keiner was.',
          ru: 'Я в воскресенье вынес весь мусор. Про это тоже никто ничего не сказал.',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Stimmt, danke dafür. Ich meine wirklich nur die Küche.',
          ru: 'Верно, спасибо за это. Я правда только про кухню.',
          effects: { respect: 10, anger: -8 },
          next: 'plan',
        },
        {
          id: 'kalt',
          text: 'Der Müll war auch fällig. Wie die Spülmaschine.',
          ru: 'Мусор тоже надо было вынести. Как и посудомойку включить.',
          effects: { anger: 8, respect: 6, patience: -10 },
          next: 'gereizt',
        },
        {
          id: 'boese',
          text: 'Einmal den Müll runterbringen macht dich noch nicht zum Helden.',
          ru: 'Один раз вынести мусор — это ещё не делает тебя героем.',
          effects: { anger: 26, respect: -10, patience: -15 },
          next: 'gereizt',
        },
        {
          id: 'sorry',
          text: 'Du hast recht, ich hätte früher was sagen sollen.',
          ru: 'Ты прав, мне надо было сказать раньше.',
          effects: { guilt: 16, anger: -6, respect: 6 },
          next: 'plan',
        },
      ],
    },

    gereizt: {
      id: 'gereizt',
      messages: [
        { text: 'Weißt du was?', ru: 'Знаешь что?' },
        {
          text: 'Ich hab echt [keine Lust](lust-haben) auf diese Diskussion. Es sind Teller.',
          ru: 'У меня правда нет никакого желания это обсуждать. Это тарелки.',
          when: { guilt: ['<', 12] },
        },
        {
          text: 'Ich hab echt [keine Lust](lust-haben) auf diese Diskussion. Und du hast dich doch schon entschuldigt.',
          ru: 'У меня правда нет желания это обсуждать. И ты ведь уже извинился.',
          when: { guilt: ['>=', 12] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Ich auch nicht. Lass uns einfach was ausmachen.',
          ru: 'У меня тоже. Давай просто договоримся.',
          effects: { anger: -12, respect: 8 },
          next: 'plan',
        },
        {
          // Passive aggression that works: he gives in rather than fights.
          id: 'kalt',
          text: 'Es sind Teller, ein Topf, zwei Pfannen und ein Brett.',
          ru: 'Это тарелки, кастрюля, две сковородки и доска.',
          effects: { anger: 8, respect: 8, patience: -12 },
          next: 'plan',
        },
        {
          id: 'boese',
          text: 'Für dich sind es Teller. Für mich eine Küche, die ich nicht benutzen kann.',
          ru: 'Для тебя это тарелки. А для меня — кухня, в которой я из-за этого не могу готовить.',
          effects: { anger: 20, respect: -6, patience: -15 },
          next: 'eskalation',
        },
        {
          id: 'sorry',
          text: 'Ok, ich hör auf. Sorry.',
          ru: 'Ладно, всё, прекращаю. Извини.',
          effects: { guilt: 18, anger: -8 },
          next: 'plan',
        },
      ],
    },

    eskalation: {
      id: 'eskalation',
      messages: [
        {
          kind: 'system',
          text: 'Jonas hat eine Nachricht gelöscht.',
          ru: 'Йонас удалил сообщение.',
        },
        { text: 'Mann.', ru: 'Блин.' },
        {
          text: 'Du bist echt [anstrengend](anstrengend), weißt du das?',
          ru: 'Ты правда невыносимый, ты в курсе?',
        },
      ],
      responses: [
        {
          id: 'boese',
          text: 'Und du bist echt faul. Passt ja zusammen.',
          ru: 'А ты правда ленивый. Отличная пара.',
          effects: { anger: 30, respect: -20, patience: -20 },
          next: 'knall',
        },
        {
          id: 'kalt',
          text: 'Ich bin anstrengend, weil ich abends kochen will. Interessant.',
          ru: 'Я невыносимый, потому что хочу вечером готовить. Интересно.',
          effects: { anger: 16, respect: 8, patience: -12 },
          next: 'knall',
        },
        {
          id: 'ok',
          text: 'Ok, das war zu weit. Von uns beiden.',
          ru: 'Ладно, это было слишком. С обеих сторон.',
          effects: { anger: -14, respect: 10, guilt: 8 },
          next: 'plan',
        },
        {
          id: 'sorry',
          text: 'Tut mir leid. Ich räum sie einfach selber ein.',
          ru: 'Извини. Я просто сам её загружу.',
          effects: { guilt: 24, anger: -12 },
          next: 'selber',
        },
      ],
    },

    knall: {
      id: 'knall',
      messages: [
        { kind: 'reaction', emoji: '👍' },
        { text: 'Super.', ru: 'Супер.' },
        {
          text: 'Ich bin dann weg. Viel Spaß mit deiner perfekten Küche.',
          ru: 'Тогда я ушёл. Приятного вечера с твоей идеальной кухней.',
        },
      ],
      responses: [
        {
          id: 'boese',
          text: 'Mach das.',
          ru: 'Давай.',
          effects: { anger: 10, respect: -6 },
          next: 'ende-knall',
        },
        {
          id: 'kalt',
          text: 'Ich räum das dann auf. Wie immer.',
          ru: 'Я тогда всё уберу. Как всегда.',
          effects: { anger: 8, respect: 4 },
          next: 'ende-knall',
        },
        {
          id: 'sorry',
          text: 'Jonas, warte. Das war blöd von mir.',
          ru: 'Йонас, стой. Это было глупо с моей стороны.',
          effects: { guilt: 20, anger: -14 },
          next: 'ende-knall',
        },
        {
          id: 'schweigen',
          text: 'Nicht antworten',
          ru: 'Не отвечать',
          action: { done: 'Du hast nicht geantwortet.', doneRu: 'Ты не ответил.' },
          effects: { anger: 6, respect: -4 },
          next: 'ende-knall',
        },
      ],
    },

    'ende-knall': {
      id: 'ende-knall',
      messages: [
        { text: 'Ich bin bei Mira.', ru: 'Я у Миры.' },
        { text: 'Bis später.', ru: 'До скорого.', when: { guilt: ['<', 15] } },
        {
          text: 'Wir reden morgen, ok?',
          ru: 'Поговорим завтра, ладно?',
          when: { guilt: ['>=', 15] },
        },
      ],
      responses: [],
    },

    plan: {
      id: 'plan',
      messages: [
        {
          text: 'Ok, machen wir es konkret.',
          ru: 'Ладно, давай конкретно.',
          when: { anger: ['<', 45] },
        },
        {
          text: 'Ok. Machen wir es konkret, dann hab ich Ruhe.',
          ru: 'Ладно. Давай конкретно, чтобы у меня был покой.',
          when: { anger: ['>=', 45] },
        },
        {
          text: 'Ich mach die Maschine heute an. Und was ist mit dem Rest — Bad, Müll, Boden?',
          ru: 'Посудомойку я включу сегодня. А что с остальным — ванная, мусор, пол?',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Ich nehm Bad und Boden, du Küche und Müll?',
          ru: 'Я беру ванную и пол, ты — кухню и мусор?',
          effects: { respect: 10, anger: -6 },
          next: 'aufteilung',
        },
        {
          id: 'kalt',
          text: 'Einen Plan hatten wir schon mal. Der hing zwei Wochen.',
          ru: 'График у нас уже был. Провисел две недели.',
          effects: { anger: 8, respect: 6, patience: -10 },
          next: 'aufteilung',
        },
        {
          id: 'boese',
          text: 'Pläne sind für Leute, die sich dran halten.',
          ru: 'Графики — для тех, кто их соблюдает.',
          effects: { anger: 22, respect: -8, patience: -15 },
          next: 'knall',
        },
        {
          id: 'sorry',
          text: 'Klingt gut. Und sorry für den Ton am Anfang.',
          ru: 'Звучит хорошо. И извини за тон в начале.',
          effects: { guilt: 16, respect: 8, anger: -8 },
          next: 'aufteilung',
        },
      ],
    },

    aufteilung: {
      id: 'aufteilung',
      messages: [
        {
          text: 'Passt. Ich mach einen [Putzplan](putzplan) und häng ihn an den Kühlschrank 🙂',
          ru: 'Идёт. Сделаю график уборки и повешу его на холодильник 🙂',
        },
        {
          text: 'Die Küche machen wir [abwechselnd](abwechselnd). Jede Woche jemand anderes. Und ich hol morgen [Spüli](spueli) mit.',
          ru: 'Кухню делаем по очереди. Каждую неделю кто-то один. И я завтра куплю средство для посуды.',
        },
        {
          text: 'Ist eigentlich cool, dass wir das einfach klären.',
          ru: 'Вообще круто, что мы это просто решаем.',
          when: { respect: ['>=', 75] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Perfekt. Ich fang diese Woche an.',
          ru: 'Отлично. Я начну на этой неделе.',
          effects: { respect: 10, anger: -8 },
          next: 'deal',
        },
        {
          id: 'kalt',
          text: 'Schreib es lieber groß. Damit man es findet.',
          ru: 'Напиши лучше крупно. Чтобы его было видно.',
          effects: { anger: 8, respect: 6, patience: -8 },
          next: 'deal',
        },
        {
          id: 'sorry',
          text: 'Danke, dass du so ruhig bleibst. Ich war unfair.',
          ru: 'Спасибо, что ты так спокоен. Я был несправедлив.',
          effects: { guilt: 20, respect: 8, anger: -10 },
          next: 'deal',
        },
      ],
    },

    selber: {
      id: 'selber',
      messages: [
        { text: 'Musst du nicht.', ru: 'Не надо.' },
        {
          text: 'Aber wenn du schon dabei bist: der Topf muss vorher [einweichen](einweichen) 😄',
          ru: 'Но если ты уже за это взялся: кастрюлю надо сначала замочить 😄',
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Alles klar. Nächste Woche dann du.',
          ru: 'Хорошо. На следующей неделе тогда ты.',
          effects: { respect: 8, anger: -4 },
          next: 'deal-selber',
        },
        {
          id: 'kalt',
          text: 'Danke für den Hinweis.',
          ru: 'Спасибо за подсказку.',
          effects: { anger: 8, respect: 6, patience: -10 },
          next: 'deal-selber',
        },
        {
          id: 'boese',
          text: 'Du erklärst mir jetzt, wie ich deinen Topf wasche?',
          ru: 'Ты сейчас будешь объяснять мне, как мыть твою кастрюлю?',
          effects: { anger: 24, respect: -10, patience: -15 },
          next: 'knall',
        },
        {
          id: 'sorry',
          text: 'Mach ich. Und sorry nochmal.',
          ru: 'Сделаю. И ещё раз извини.',
          effects: { guilt: 20, anger: -8 },
          next: 'deal-selber',
        },
      ],
    },

    'deal-selber': {
      id: 'deal-selber',
      messages: [
        { text: 'Ok. Danke.', ru: 'Ок. Спасибо.' },
        {
          text: 'Dann lass den Topf einweichen, den Rest mach ich morgen. [Versprochen](versprochen).',
          ru: 'Тогда оставь кастрюлю отмокать, остальное сделаю завтра. Обещаю.',
        },
        {
          text: 'Ist mir ehrlich fast peinlich.',
          ru: 'Мне, честно говоря, даже немного неловко.',
          when: { respect: ['>=', 78] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Passt. Aber wirklich morgen.',
          ru: 'Идёт. Но правда завтра.',
          effects: { respect: 8, anger: -6 },
          next: 'ende',
        },
        {
          id: 'kalt',
          text: 'Mal sehen.',
          ru: 'Посмотрим.',
          effects: { anger: 8, respect: 4 },
          next: 'ende',
        },
        {
          id: 'sorry',
          text: 'Kein Ding. War heute eh mein Tag zum Meckern.',
          ru: 'Не вопрос. У меня сегодня всё равно день ворчания.',
          effects: { guilt: 14, anger: -8 },
          next: 'ende',
        },
      ],
    },

    deal: {
      id: 'deal',
      messages: [
        { text: 'Gut.', ru: 'Хорошо.' },
        {
          text: 'Ich mach sie [gleich](gleich) an, [versprochen](versprochen).',
          ru: 'Включу её сейчас же, обещаю.',
        },
        {
          text: 'Und jetzt lass es gut sein, ja?',
          ru: 'А теперь давай оставим это, ладно?',
          when: { anger: ['>=', 45] },
        },
        {
          text: 'Danke, dass du normal gefragt hast. Klingt blöd, ist aber so.',
          ru: 'Спасибо, что нормально спросил. Звучит глупо, но это так.',
          when: { respect: ['>=', 85] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Perfekt. Dann ist alles gut.',
          ru: 'Отлично. Тогда всё хорошо.',
          effects: { respect: 10, anger: -8 },
          next: 'ende',
        },
        {
          id: 'sorry',
          text: 'Danke. Und entschuldige, wie ich angefangen hab.',
          ru: 'Спасибо. И извини, как я начал разговор.',
          effects: { guilt: 18, respect: 6, anger: -8 },
          next: 'ende',
        },
        {
          id: 'kalt',
          text: 'Mal sehen.',
          ru: 'Посмотрим.',
          effects: { anger: 8, respect: 4, patience: -8 },
          next: 'ende',
        },
        {
          id: 'boese',
          text: 'Ich glaub es, wenn ich es sehe.',
          ru: 'Поверю, когда увижу.',
          effects: { anger: 18, respect: -8, patience: -10 },
          next: 'ende',
        },
      ],
    },

    ende: {
      id: 'ende',
      messages: [{ text: 'Bis nachher 👍', ru: 'Увидимся позже 👍' }],
      responses: [],
    },
  },
}
