import type { Scenario } from '../../types'

/**
 * Jonas again — and this time he is asking for something.
 *
 * The point of this scenario is not the situation, it is that he remembers.
 * Nothing here reads how a previous conversation *ended* — only that it
 * happened: four lines and one reply are gated on the experiences
 * `spuelmaschine-gespraech`, `marco-hat-gefragt` and `kleinanzeigen-erlebt`.
 * Everything else works for someone who meets Jonas here first, which is why
 * the scenario itself has no gate and the validator plays the graph both ways.
 *
 * He is right about something, as always: he did ask instead of just doing it,
 * and your sister slept on that same sofa for four days in February.
 */
export const nurBisSonntag: Scenario = {
  id: 'nur-bis-sonntag',
  title: 'Nur bis Sonntag',
  context: 'Lea kommt übers Wochenende.',
  situation:
    'Jonas fragt, ob Lea übers Wochenende kommen kann. Er fragt wirklich, das muss man ihm lassen. Nach zwei Nachrichten stellt sich heraus, dass er mit „Wochenende“ den Sonntag drauf meint — zehn Tage, ein Bad, eine Küche.',
  situationRu:
    'Йонас спрашивает, может ли Леа приехать на выходные. Он действительно спрашивает — это надо отдать ему должное. Через два сообщения выясняется, что «выходные» у него тянутся до следующего воскресенья: десять дней, одна ванная, одна кухня.',
  contextLine: 'WG-Chat',
  duration: '4 min',
  level: 'B1',
  icon: 'door',
  startTime: '21:10',
  character: { name: 'Jonas', status: 'Mitbewohner' },
  experience: 'lea-war-da',
  meters: { anger: 8, respect: 58, patience: 50, guilt: 10 },

  objectives: [
    {
      id: 'ruhe',
      title: 'Es gut sein lassen',
      hint: 'Sie ist seine Freundin, nicht seine Untermieterin.',
      ru: 'Не делать из этого проблему',
      cta: 'diesmal einfach ja sagen?',
      contrast: 'grenze',
    },
    {
      id: 'grenze',
      title: 'Klare Grenzen setzen',
      hint: 'Sonntag heißt Sonntag. Nicht Sonntag drauf.',
      ru: 'Обозначить границы',
      cta: 'diesmal eine Grenze ziehen?',
      contrast: 'ruhe',
    },
    {
      id: 'geld',
      title: 'Geld für die Nebenkosten',
      hint: 'Zehn Tage duschen, kochen, heizen. Das steht auf deiner Abrechnung.',
      ru: 'Получить долю за коммуналку',
      cta: 'diesmal soll sie zahlen?',
      contrast: 'nerven',
    },
    {
      id: 'nerven',
      title: 'Jonas richtig auf die Nerven gehen',
      hint: 'Nicht streiten. Nur so lange nachfragen, bis er es selbst blöd findet.',
      ru: 'Довести Йонаса до ручки',
      cta: 'diesmal so lange nachfragen, bis er aufgibt?',
      contrast: 'geld',
    },
  ],

  outcomes: [
    {
      id: 'lea-putzt',
      // Said yes first *and then* asked for a date anyway — generous and clear
      // at once, which asking straight away does not produce. Just being
      // polite about it gets you `sonntag`; this gets you Lea with a sponge.
      requiresFlags: ['nachgefragt'],
      forbidsFlags: ['geld-geregelt'],
      requires: { respect: ['>=', 76], anger: ['<=', 10], guilt: ['>=', 18] },
      achieved: [],
      secret: true,
      quoteLabel: 'Damit war es entschieden',
      name: 'Lea putzt die Küche',
      nameRu: 'Леа убирает кухню',
      title: 'Lea bleibt zehn Tage — und macht die Küche jeden zweiten Tag.',
      titleRu: 'Леа остаётся на десять дней — и через день убирает кухню.',
      consequences: [
        { de: 'Sie kocht auch. Zweimal.', ru: 'Она ещё и готовит. Дважды.' },
        { de: 'Jonas ist plötzlich sehr aufmerksam.', ru: 'Йонас внезапно очень внимателен.' },
        {
          de: 'Nach zehn Tagen fehlt sie euch beiden ein bisschen.',
          ru: 'Через десять дней её немного не хватает вам обоим.',
        },
      ],
      reveals: ['lea-kennengelernt'],
    },
    {
      id: 'nebenkosten',
      requiresFlags: ['geld-geregelt'],
      achieved: ['geld'],
      quoteLabel: 'Das hat den Anteil gemacht',
      name: 'Vierzig Euro',
      nameRu: 'Сорок евро',
      title: 'Lea zahlt ihren Anteil an den Nebenkosten. Bar, am ersten Abend.',
      titleRu: 'Леа платит свою долю коммуналки. Наличными, в первый же вечер.',
      consequences: [
        { de: 'Vierzig Euro für zehn Tage.', ru: 'Сорок евро за десять дней.' },
        { de: 'Jonas fand die Rechnerei kurz komisch.', ru: 'Йонасу эти подсчёты недолго казались странными.' },
        { de: 'Danach war es einfach geregelt.', ru: 'А потом это просто стало решённым делом.' },
      ],
      reveals: ['lea-kennengelernt'],
    },
    {
      id: 'sonntag',
      requiresFlags: ['nachgefragt'],
      achieved: ['grenze'],
      quoteLabel: 'Damit stand das Datum',
      name: 'Sonntag heißt Sonntag',
      nameRu: 'Воскресенье значит воскресенье',
      title: 'Sie bleibt bis Sonntag. Bis zu dem Sonntag, den du gemeint hast.',
      titleRu: 'Она остаётся до воскресенья. До того воскресенья, которое имел в виду ты.',
      consequences: [
        { de: 'Vier Tage statt zehn.', ru: 'Четыре дня вместо десяти.' },
        { de: 'Jonas hat es zweimal wiederholt, um sicherzugehen.', ru: 'Йонас переспросил дважды, чтобы убедиться.' },
        { de: 'Und einmal gefragt, ob du sauer bist.', ru: 'И один раз спросил, не злишься ли ты.' },
      ],
      reveals: ['lea-kennengelernt'],
    },
    {
      id: 'jonas-weg',
      requires: { anger: ['>=', 52] },
      achieved: ['nerven'],
      quoteLabel: 'Ab da war es keine Frage mehr',
      name: 'Jonas schläft bei Lea',
      nameRu: 'Йонас спит у Леа',
      title: 'Er kommt gar nicht mehr. Zehn Tage ist die Wohnung nur deine.',
      titleRu: 'Он вообще не приходит. Десять дней квартира только твоя.',
      consequences: [
        { de: 'Ruhe, Bad frei, Küche leer.', ru: 'Тишина, ванная свободна, кухня пустая.' },
        { de: 'Seine Sachen stehen noch genau so da.', ru: 'Его вещи стоят точно так же.' },
        {
          de: 'Und irgendwann musst du wieder anfangen, ihm zu schreiben.',
          ru: 'И когда-нибудь тебе придётся снова начать ему писать.',
        },
      ],
    },
    {
      id: 'egal',
      requires: { anger: ['<=', 24] },
      forbidsFlags: ['nachgefragt', 'geld-geregelt'],
      achieved: ['ruhe'],
      quoteLabel: 'Danach war das Thema durch',
      name: 'Lea bleibt einfach',
      nameRu: 'Леа просто остаётся',
      title: 'Kein Datum, keine Rechnung. Sie bleibt, bis sie wieder fährt.',
      titleRu: 'Ни даты, ни счёта. Она остаётся, пока не уедет.',
      consequences: [
        { de: 'Zehn Tage. Es waren dann zwölf.', ru: 'Десять дней. Вышло двенадцать.' },
        { de: 'Zweimal war das Bad morgens besetzt.', ru: 'Дважды ванная утром была занята.' },
        { de: 'Gestritten hat deswegen niemand.', ru: 'И никто из-за этого не поссорился.' },
      ],
      reveals: ['lea-kennengelernt'],
    },
    {
      id: 'unklar',
      achieved: [],
      quoteLabel: 'Und dabei blieb es',
      name: 'Niemand hat es gesagt',
      nameRu: 'Никто так и не сказал',
      title: 'Wie lange sie bleibt, weiß am Ende keiner von euch.',
      titleRu: 'Сколько она остаётся, в итоге не знает никто из вас.',
      consequences: [
        { de: 'Ihr Koffer steht im Flur.', ru: 'Её чемодан стоит в коридоре.' },
        { de: 'Du fragst jeden Morgen nicht nach.', ru: 'Каждое утро ты не спрашиваешь.' },
        { de: 'Sie ist echt nett, das ist das Ärgerliche.', ru: 'Она правда милая — вот что обидно.' },
      ],
      reveals: ['lea-kennengelernt'],
    },
  ],

  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      messages: [
        { text: 'Hey, kleine Frage 🙈', ru: 'Эй, маленький вопрос 🙈' },
        {
          text: 'Lea kommt übers Wochenende. Ist das ok für dich?',
          ru: 'Леа приезжает на выходные. Тебе нормально?',
        },
        // He never explains the reference — either you were there or you were not.
        {
          text: 'Keine Sorge, diesmal geht es nicht um die Spülmaschine.',
          ru: 'Не переживай, на этот раз речь не о посудомойке.',
          after: ['spuelmaschine-gespraech'],
        },
        {
          text: 'Und du arbeitest samstags doch eh oft, oder?',
          ru: 'Ты же по субботам всё равно часто работаешь, да?',
          after: ['marco-hat-gefragt'],
        },
      ],
      responses: [
        {
          id: 'klar',
          text: 'Klar, kein Problem.',
          ru: 'Конечно, без проблем.',
          effects: { respect: 8, anger: -6, guilt: 8 },
          next: 'zugesagt',
        },
        {
          id: 'wie-lange',
          text: 'Kommt drauf an — wie lange denn?',
          ru: 'Смотря насколько — сколько она пробудет?',
          effects: { respect: 8, patience: 4 },
          next: 'dauer',
        },
        {
          id: 'wer-putzt',
          text: 'Und wer räumt hinterher die Küche?',
          ru: 'А кто потом убирает кухню?',
          effects: { anger: 6, respect: 6, patience: -6 },
          next: 'dauer',
        },
        {
          id: 'mitbewohnerin',
          text: 'Deine Freundin oder unsere dritte Mitbewohnerin?',
          ru: 'Твоя девушка или наша третья соседка?',
          effects: { anger: 10, respect: 8, patience: -8 },
          next: 'dauer',
        },
      ],
    },

    dauer: {
      id: 'dauer',
      messages: [
        { text: 'Bis Sonntag.', ru: 'До воскресенья.' },
        {
          text: 'Also... eher Sonntag drauf. Ihre Wohnung wird gestrichen.',
          ru: 'То есть… скорее до следующего воскресенья. У неё в квартире красят.',
        },
        {
          text: 'Sie ist eh den ganzen Tag in der Bib.',
          ru: 'Она всё равно целый день в библиотеке.',
          when: { anger: ['>=', 14] },
        },
      ],
      responses: [
        {
          id: 'nachfragen',
          text: 'Sonntag drauf sind zehn Tage, Jonas.',
          ru: 'До следующего воскресенья — это десять дней, Йонас.',
          flag: 'nachgefragt',
          effects: { respect: 10, patience: 6 },
          next: 'bedingungen',
        },
        {
          id: 'nebenkosten',
          text: 'Zehn Tage duschen und heizen. Dann zahlt sie mit.',
          ru: 'Десять дней душа и отопления. Тогда она платит свою часть.',
          effects: { respect: 8, anger: 6, patience: -4 },
          next: 'geld',
        },
        {
          id: 'putzplan',
          // Only exists if you two have had the dishwasher conversation — any
          // of its six endings, since what is quoted is a thing he says in it.
          text: 'Bis Sonntag — so wie damals „ich mach sie gleich an“?',
          ru: '«До воскресенья» — это как тогда «сейчас включу»?',
          after: ['spuelmaschine-gespraech'],
          callback: true,
          effects: { anger: 14, respect: 10, patience: -10 },
          next: 'getroffen',
        },
        {
          id: 'egal',
          text: 'Ok. Dann bleibt sie halt so lange.',
          ru: 'Ладно. Тогда пусть остаётся сколько нужно.',
          effects: { respect: 4, anger: -6, guilt: 10 },
          next: 'zugesagt',
        },
      ],
    },

    zugesagt: {
      id: 'zugesagt',
      messages: [
        { text: 'Du bist der Beste 🙌', ru: 'Ты лучше всех 🙌' },
        {
          text: 'Ich sag ihr, sie soll was zum Frühstück mitbringen.',
          ru: 'Скажу ей, чтобы привезла что-нибудь на завтрак.',
        },
        {
          text: 'Sie fragt jedes Mal, ob das für dich wirklich ok ist.',
          ru: 'Она каждый раз спрашивает, правда ли это для тебя нормально.',
          when: { guilt: ['>=', 16] },
        },
      ],
      responses: [
        {
          id: 'doch-fragen',
          text: 'Warte. Sag mir vorher, bis wann genau.',
          ru: 'Погоди. Скажи сначала, до какого числа точно.',
          flag: 'nachgefragt',
          effects: { respect: 10, patience: 4 },
          next: 'bedingungen',
        },
        {
          id: 'keller',
          text: 'Und ihr Koffer? Der Flur ist eh schon voll.',
          ru: 'А её чемодан? В коридоре и так уже тесно.',
          effects: { respect: 6, patience: -4 },
          next: 'keller',
        },
      ],
    },

    getroffen: {
      id: 'getroffen',
      messages: [
        { text: 'Ok. Das war fair.', ru: 'Ладно. Это было по делу.' },
        {
          text: 'Ich hab letzte Woche zweimal die Küche geputzt. Zweimal!',
          ru: 'Я на прошлой неделе дважды помыл кухню. Дважды!',
        },
        {
          text: 'Und ja, ich weiß, wie das jetzt klingt.',
          ru: 'И да, я знаю, как это сейчас звучит.',
          when: { respect: ['>=', 68] },
        },
      ],
      responses: [
        {
          id: 'weich',
          text: 'Ich weiß. Deswegen frag ich lieber jetzt als am Sonntag.',
          ru: 'Знаю. Поэтому лучше спрошу сейчас, а не в воскресенье.',
          effects: { anger: -10, respect: 10, patience: 6 },
          next: 'bedingungen',
        },
        {
          id: 'geld',
          text: 'Dann machen wir es einfach: zehn Tage, sie zahlt mit.',
          ru: 'Тогда сделаем просто: десять дней, она платит свою часть.',
          effects: { respect: 8, anger: 4 },
          next: 'geld',
        },
        {
          id: 'nachlegen',
          text: 'Zweimal in vier Wochen. Ich führ da keine Liste, aber du fängst gerade an.',
          ru: 'Дважды за четыре недели. Я списков не веду, но это ты начал считать.',
          effects: { anger: 18, respect: 6, patience: -12 },
          next: 'genervt',
        },
      ],
    },

    bedingungen: {
      id: 'bedingungen',
      messages: [
        { text: 'Stimmt. Zehn.', ru: 'Верно. Десять.' },
        {
          text: 'Sag einfach, was du brauchst, dann halten wir uns dran.',
          ru: 'Просто скажи, что тебе нужно, и мы будем этого держаться.',
        },
        {
          text: 'Du hattest im Februar auch deine Schwester hier. Vier Tage.',
          ru: 'У тебя в феврале тоже сестра жила. Четыре дня.',
          when: { anger: ['>=', 16] },
        },
      ],
      responses: [
        {
          id: 'sonntag-fix',
          text: 'Sonntag. Der erste Sonntag. Dann ist es für mich in Ordnung.',
          ru: 'Воскресенье. Первое воскресенье. Тогда меня всё устраивает.',
          effects: { respect: 10, anger: -6 },
          next: 'einigung',
        },
        {
          id: 'geld',
          text: 'Vier Tage waren es. Und meine Schwester hat Brötchen gekauft.',
          ru: 'Четыре дня это было. И моя сестра покупала булочки.',
          effects: { anger: 8, respect: 8, patience: -6 },
          next: 'geld',
        },
        {
          id: 'koffer',
          text: 'Ihr Zeug in dein Zimmer, nicht in den Flur.',
          ru: 'Её вещи — в твою комнату, не в коридор.',
          effects: { respect: 8, anger: 4 },
          next: 'keller',
        },
      ],
    },

    geld: {
      id: 'geld',
      messages: [
        { text: 'Wie viel schwebt dir denn vor?', ru: 'И сколько ты имеешь в виду?' },
        {
          text: 'Ich hab da echt keine Vorstellung, ehrlich.',
          ru: 'У меня правда нет никакого представления, честно.',
        },
        {
          text: 'Und mach es nicht auf den Cent, ja?',
          ru: 'И только не до копейки, ладно?',
          when: { anger: ['>=', 20] },
        },
      ],
      responses: [
        {
          id: 'vierzig',
          text: 'Vierzig für die zehn Tage. Dann ist es gut.',
          ru: 'Сорок за десять дней. И на этом всё.',
          flag: 'geld-geregelt',
          effects: { respect: 10, anger: -4 },
          next: 'einigung',
        },
        {
          id: 'anteil',
          text: 'Ihr Anteil an Wasser und Strom. Ich rechne es aus.',
          ru: 'Её доля за воду и электричество. Я посчитаю.',
          flag: 'geld-geregelt',
          effects: { respect: 8, anger: 6, patience: -4 },
          next: 'einigung',
        },
        {
          id: 'spitz',
          text: 'Zwei Euro pro Dusche. Ich häng eine Liste ans Bad 🙂',
          ru: 'Два евро за душ. Я повешу список у ванной 🙂',
          effects: { anger: 20, respect: 8, patience: -12 },
          next: 'genervt',
        },
      ],
    },

    keller: {
      id: 'keller',
      messages: [
        { text: 'Der Koffer passt in mein Zimmer.', ru: 'Чемодан влезет в мою комнату.' },
        {
          text: 'Und ihr Rad? Sie fährt hier alles mit dem Rad.',
          ru: 'А её велосипед? Она тут всюду на велосипеде.',
        },
        {
          text: 'Steht dein Rad eigentlich noch im Keller? Sonst passt ihres da rein.',
          ru: 'Твой велосипед вообще ещё в подвале? Иначе туда влезет её.',
          after: ['kleinanzeigen-erlebt'],
        },
      ],
      responses: [
        {
          id: 'keller-ok',
          text: 'Keller ist frei. Aber nicht abschließen, sonst kommt keiner an die Waschmaschine.',
          ru: 'Подвал свободен. Только не запирай, иначе никто не подойдёт к стиральной машине.',
          effects: { respect: 10, anger: -6 },
          next: 'einigung',
        },
        {
          id: 'flur',
          text: 'Nicht in den Flur. Sonst steht es Sonntag auf dem Balkon.',
          ru: 'Не в коридор. Иначе в воскресенье он окажется на балконе.',
          effects: { anger: 14, respect: 6, patience: -8 },
          next: 'genervt',
        },
        {
          id: 'egal',
          text: 'Stell es hin, wo du willst.',
          ru: 'Ставь куда хочешь.',
          effects: { anger: -4, guilt: 8, patience: 4 },
          next: 'offen',
        },
      ],
    },

    genervt: {
      id: 'genervt',
      messages: [
        { text: 'Ok, warte mal.', ru: 'Так, погоди.' },
        {
          text: 'Ich hab gefragt. Ich hätte sie auch einfach mitbringen können.',
          ru: 'Я спросил. Я мог бы просто привезти её без разговоров.',
        },
        {
          text: 'Und ich bring seit vier Wochen den Müll runter, ohne was zu sagen.',
          ru: 'И я четыре недели выношу мусор, ничего не говоря.',
          when: { anger: ['>=', 26] },
        },
      ],
      responses: [
        {
          id: 'zurueck',
          text: 'Stimmt. Du hast gefragt, das ist mehr als die meisten machen.',
          ru: 'Верно. Ты спросил — это больше, чем делают большинство.',
          effects: { anger: -14, respect: 12, guilt: 10 },
          next: 'einigung',
        },
        {
          id: 'weiter',
          text: 'Vier Wochen Müll sind keine zehn Tage Bad.',
          ru: 'Четыре недели мусора — это не десять дней ванной.',
          effects: { anger: 18, patience: -10 },
          next: 'jonas-weg',
        },
        {
          id: 'kalt',
          text: 'Dann schlaf die zehn Tage doch bei ihr.',
          ru: 'Тогда спи эти десять дней у неё.',
          effects: { anger: 24, respect: -6, patience: -12 },
          next: 'jonas-weg',
        },
      ],
    },

    einigung: {
      id: 'einigung',
      messages: [
        { text: 'Passt. So machen wir das.', ru: 'Идёт. Так и сделаем.' },
        {
          text: 'Ich schreib es ihr gleich, damit es klar ist.',
          ru: 'Сразу ей напишу, чтобы всё было ясно.',
        },
        {
          text: 'Und danke, dass du nicht einfach nein gesagt hast.',
          ru: 'И спасибо, что ты просто не сказал «нет».',
          when: { respect: ['>=', 70] },
        },
      ],
      responses: [
        {
          id: 'ok',
          text: 'Dann bis Freitag. Grüß sie von mir.',
          ru: 'Тогда до пятницы. Передай ей привет.',
          effects: { respect: 8, anger: -6 },
          next: 'abgemacht',
        },
        {
          id: 'trocken',
          text: 'Gut.',
          ru: 'Хорошо.',
          effects: { patience: -4, anger: 4 },
          next: 'abgemacht',
        },
      ],
    },

    abgemacht: {
      id: 'abgemacht',
      messages: [
        { kind: 'reaction', emoji: '🙏' },
        {
          text: 'Bis Freitag. Und sie bringt Kuchen mit, hat sie gesagt.',
          ru: 'До пятницы. И она привезёт торт, сказала.',
        },
        {
          text: 'Sie hat gefragt, ob du der mit der Spülmaschine bist 😄',
          ru: 'Она спросила, ты ли тот, который про посудомойку 😄',
          after: ['spuelmaschine-gespraech'],
        },
      ],
      responses: [],
    },

    offen: {
      id: 'offen',
      messages: [
        { text: 'Danke dir 🙏', ru: 'Спасибо тебе 🙏' },
        {
          kind: 'system',
          text: 'Am Freitag steht ein Koffer im Flur. Daneben ein Rad.',
          ru: 'В пятницу в коридоре стоит чемодан. Рядом велосипед.',
        },
        {
          text: 'Sie ist schon da, ich hoffe das ist ok so 🙈',
          ru: 'Она уже здесь, надеюсь, так нормально 🙈',
          when: { guilt: ['>=', 16] },
        },
      ],
      responses: [
        {
          id: 'jetzt-fragen',
          text: 'Sag mir doch einfach, bis wann sie bleibt.',
          ru: 'Просто скажи мне, до какого числа она остаётся.',
          flag: 'nachgefragt',
          effects: { respect: 8, patience: 4 },
          next: 'einigung',
        },
        {
          id: 'nichts-sagen',
          text: 'Nichts sagen',
          ru: 'Ничего не говорить',
          action: {
            done: 'Du gehst am Koffer vorbei und sagst nichts.',
            doneRu: 'Ты проходишь мимо чемодана и ничего не говоришь.',
          },
          effects: { anger: 6, guilt: 10, patience: -6 },
          next: 'flur',
        },
      ],
    },

    flur: {
      id: 'flur',
      messages: [
        {
          kind: 'system',
          text: 'Der Koffer steht bis Sonntag im Flur. Dann bis Montag. Dann fragt niemand mehr.',
          ru: 'Чемодан стоит в коридоре до воскресенья. Потом до понедельника. Потом уже никто не спрашивает.',
        },
        {
          text: 'Alles gut bei dir? Du bist so still 🙂',
          ru: 'У тебя всё нормально? Ты какой-то молчаливый 🙂',
          when: { guilt: ['>=', 24] },
        },
      ],
      responses: [],
    },

    'jonas-weg': {
      id: 'jonas-weg',
      messages: [
        { text: 'Alles klar. Dann bin ich die Zeit bei ihr.', ru: 'Ясно. Тогда я это время буду у неё.' },
        {
          kind: 'system',
          text: 'Am Freitag ist die Wohnung leer. Seine Tür bleibt zu.',
          ru: 'В пятницу квартира пустая. Его дверь закрыта.',
        },
        {
          text: 'Müll ist übrigens voll.',
          ru: 'Мусор, между прочим, полный.',
          when: { anger: ['>=', 60] },
        },
      ],
      responses: [],
    },
  },
}
