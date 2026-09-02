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
  title: 'Das ist nicht meine Bestellung',
  context: 'Ben bringt Chai und Thunfisch. Du hattest Flat White und Käse.',
  situation:
    'Zwanzig Minuten gewartet, und jetzt steht ein Chai Latte vor dir und ein Sandwich mit Thunfisch. Bestellt hattest du Flat White und Käse. Ben stellt beides ab und lächelt.',
  contextLine: 'Mittags · Café',
  duration: '2 min',
  level: 'B1',
  hue: 42,
  character: { name: 'Ben', avatar: '☕', status: 'Kellner' },
  meters: { anger: 5, respect: 50, patience: 50, guilt: 0 },

  objectives: [
    {
      id: 'richtig',
      emoji: '😇',
      title: 'Das Richtige bekommen',
      ru: 'Получить то, что ты заказывал',
    },
    {
      id: 'gratis',
      emoji: '💸',
      title: 'Nichts bezahlen',
      ru: 'Не заплатить ни цента',
    },
    {
      id: 'nerven',
      emoji: '😈',
      title: 'Ben soll dich nie wiedersehen wollen',
      ru: 'Чтобы Бен больше не хотел тебя видеть',
    },
    {
      id: 'luegen',
      emoji: '🕵️',
      title: 'Ihn überzeugen, dass du genau das bestellt hast',
      ru: 'Убедить его, что ты именно это и заказывал',
    },
  ],

  outcomes: [
    {
      id: 'alles-gratis',
      requiresFlags: ['gratis-essen', 'gratis-getraenk'],
      achieved: ['gratis'],
      title: 'Bezahlt hast du nichts.',
      titleRu: 'Ты не заплатил ничего.',
      text: 'Getränk aufs Haus, Sandwich aufs Haus. Ben hat dir sogar die Tür aufgehalten — sehr freundlich und sehr endgültig.',
      textRu: 'Напиток за счёт заведения, сэндвич тоже. Бен даже придержал тебе дверь — очень вежливо и очень окончательно.',
    },
    {
      id: 'rausgeworfen',
      requires: { anger: ['>=', 72] },
      achieved: ['nerven'],
      title: 'Ben hat den Chef geholt. Nicht wegen des Rabatts.',
      titleRu: 'Бен позвал начальника. И не из-за скидки.',
      text: 'Nach deinem „{quote}" war Schluss mit Service. Du kennst jetzt zwei Leute in diesem Café, die dich wiedererkennen.',
      textRu: 'После твоего «{quote}» сервис закончился. Теперь в этом кафе тебя узнают уже двое.',
    },
    {
      id: 'thunfisch',
      requiresFlags: ['thunfisch'],
      achieved: ['luegen'],
      title: 'Auf dem Zettel steht jetzt „Thunfisch".',
      titleRu: 'В блокноте теперь написано «Thunfisch».',
      text: 'Ben glaubt, er hat sich verhört. Du isst ein Sandwich, das du nicht wolltest, und fühlst dich merkwürdig stolz.',
      textRu: 'Бен думает, что ослышался. Ты ешь сэндвич, который тебе не нужен, и почему-то этим гордишься.',
    },
    {
      id: 'halb-gratis',
      requiresFlags: ['gratis-getraenk'],
      achieved: [],
      title: 'Das Getränk war frei. Das Sandwich nicht.',
      titleRu: 'Напиток оказался бесплатным. Сэндвич — нет.',
      text: 'Nicht schlecht für zwei Sätze. Verhandeln ist auch eine Sprache.',
      textRu: 'Неплохо за две фразы. Умение договариваться — тоже язык.',
    },
    {
      id: 'richtig',
      requires: { anger: ['<=', 45] },
      forbidsFlags: ['thunfisch'],
      achieved: ['richtig'],
      title: 'Flat White und Käse. Wie bestellt.',
      titleRu: 'Флэт уайт и сэндвич с сыром. Как и заказывал.',
      text: 'Hat vier Minuten gedauert und keinen Streit gekostet. Ben hat sich zweimal entschuldigt, du einmal bedankt.',
      textRu: 'Заняло четыре минуты и не стоило ни одной ссоры. Бен извинился дважды, ты поблагодарил один раз.',
    },
    {
      id: 'bezahlt',
      achieved: [],
      title: 'Du hast bezahlt und bist gegangen.',
      titleRu: 'Ты заплатил и ушёл.',
      text: 'Irgendwas an dem Gespräch ist [im Sand verlaufen](im-sand-verlaufen) — aber Hunger hast du keinen mehr.',
      textRu: 'Что-то в этом разговоре сошло на нет — зато голодным ты не остался.',
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
          text: 'Ich glaub, da wurde was vertauscht — ich hatte Flat White und Käse.',
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
          text: 'Das war Tisch vier. Ich bring Ihnen sofort das Richtige, fünf Minuten — ok?',
          ru: 'Это был четвёртый столик. Сейчас же принесу правильное, пять минут — хорошо?',
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
          next: 'serviert',
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
          text: 'Dann hab ich mich verhört. [Kann passieren](das-kann-passieren), ich schreib es um.',
          ru: 'Тогда я ослышался. Бывает, я исправлю.',
        },
      ],
      responses: [
        {
          id: 'genau',
          text: 'Genau. Kein Problem.',
          ru: 'Именно. Без проблем.',
          effects: { respect: 4 },
          next: 'serviert',
        },
        {
          id: 'ehrlich',
          text: 'Ehrlich? Sie haben sich nicht verhört. Ich hatte Käse.',
          ru: 'Честно? Вы не ослышались. Я брал с сыром.',
          effects: { guilt: 16, respect: 10, anger: -6 },
          next: 'serviert',
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
          text: 'Ich sag der Küche, dass es vorgeht. Und das Getränk [geht aufs Haus](aufs-haus).',
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
      ],
    },

    gereizt: {
      id: 'gereizt',
      messages: [
        { text: 'Ich hab den Fehler nicht gemacht.', ru: 'Ошибку сделал не я.' },
        {
          text: 'Beheben kann ich ihn trotzdem. Wollen Sie das Richtige — oder wollen Sie sich [beschweren](sich-beschweren)?',
          ru: 'Но исправить я её могу. Вы хотите получить правильный заказ — или хотите пожаловаться?',
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
          text: 'Ich hol ihn. Über Rabatte entscheidet er, ich nicht.',
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
          text: 'Den Chai nehm ich mit, den zahlen Sie natürlich nicht.',
          ru: 'Чай я забираю, за него вы, конечно, не платите.',
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

    serviert: {
      id: 'serviert',
      messages: [
        { text: 'So, jetzt ist alles da.', ru: 'Так, теперь всё на месте.' },
        { text: 'Passt es so?', ru: 'Так подходит?' },
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
        { text: 'Möchten Sie [gleich](gleich) zahlen oder später?', ru: 'Хотите заплатить сразу или позже?' },
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
